import './Users.css';
import React, {useState, useEffect, useCallback} from 'react';
import {getUser, signInWithGoogle} from "../authentication";
import PersonIcon from '@mui/icons-material/Person';
import {fetchUsers} from "../api";
import firebase from "firebase";

function addFriend(id) {
    let newId;
    firebase.database().ref(`${getUser().uid}/friends/newId`).on('value', (elem) => {
        if (elem.val()) {
            newId = elem.val();
        } else {
            newId = 0;
        }
    });
    let f;
    firebase.database().ref(`${getUser().uid}/friends`).on('value', (elem) => {
        f = {...elem.val()};
    });
    f[newId] = id;
    f['newId'] = ++newId;
    firebase.database().ref(`${getUser().uid}/friends`).set(f);
}

function removeFriend(id) {
    let index = null;
    let friends;
    firebase.database().ref(`${getUser().uid}/friends`)
        .on('value', (elem) => {
                if (elem.val()) {
                    friends = elem.val();
                    delete friends['newId'];
                }
            }
        )
    for (let key of friends) {
        if (+friends[key] === +id) {
            index = key;
        }
    }
    if (index) {
        firebase.database().ref(`${getUser().uid}/friends/${index}`).remove();
    }
}




function Users() {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(async () => {
        if (getUser()) {
            firebase.database().ref(`${getUser().uid}/friends`)
                .on('value', (elem) => {
                    if (elem.val()) {
                        let f = elem.val();
                        delete f['newId'];
                        setFriends(f);
                    }
                });
        }
        await fetchUsers(setUsers);

    }, []);

    const searchByName = useCallback(
        async ({target}) => {
            console.log(target.value)
            if (target.value) {
                await fetchUsers(setUsers, target.value);
            } else {
                await fetchUsers(setUsers);
            }
        });

    return (
        <div className="Users">
            <ul className="UsersUl">
                {users.slice(0, 24).map((item) => {
                    let isFriend;
                    for (let key in friends) {
                        if (friends[key] === item.id) {
                            isFriend = true;
                        }
                    }
                    if (isFriend) {
                        return (<User className="friend" key={item.id} {...item}/>);
                    } else {
                        return (<User key={item.id} {...item}/>);
                    }
                })}
            </ul>
            <div className="search">
                <label htmlFor="nameInput">Search by name</label>
                <input type="text" id="nameInput" onChange={searchByName}/>
            </div>
        </div>
    );
}


function User(props) {
    const friendClick = useCallback(({target}) => {
        const svg = target.closest('svg');
        if (svg.classList.contains('friend')) {
            svg.classList.remove('friend');
            removeFriend(target.closest('li').dataset.id);
        } else {
            addFriend(target.closest('li').dataset.id);
            svg.classList.add('friend');
        }
    }, []);
    return (
        <li className="User" data-id={props.id}>
            <div className="userHeader">
                <h3>{props.name}</h3>
                {
                    getUser() ? <PersonIcon className={props.className} onClick={friendClick}/> : ''
                }
            </div>
            {props.img ? <img src={props.img} alt="user photo"/> :
                <img
                    src="https://st3.depositphotos.com/9998432/19048/v/600/depositphotos_190484900-stock-illustration-default-placeholder-businessman-half-length.jpg"
                    alt="no photo"/>}
        </li>
    );
}

export default Users;
