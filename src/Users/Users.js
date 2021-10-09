import './Users.css';
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import firebase from 'firebase';
import { getUser } from '../authentication';
import { fetchUsers } from '../api';

function addFriend(id) {
  let newId;
  firebase
    .database()
    .ref(`${getUser().uid}/friends/newId`)
    .on('value', (elem) => {
      if (elem.val()) {
        newId = elem.val();
      } else {
        newId = 0;
      }
    });
  let f;
  firebase
    .database()
    .ref(`${getUser().uid}/friends`)
    .on('value', (elem) => {
      f = { ...elem.val() };
    });
  f[newId] = id;
  f.newId = newId + 1;
  firebase.database().ref(`${getUser().uid}/friends`).set(f);
}

function removeFriend(id) {
  let index = null;
  let friends;
  firebase
    .database()
    .ref(`${getUser().uid}/friends`)
    .on('value', (elem) => {
      if (elem.val()) {
        friends = elem.val();
        delete friends.newId;
      }
    });
  for (const key of friends) {
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
      firebase
        .database()
        .ref(`${getUser().uid}/friends`)
        .on('value', (elem) => {
          if (elem.val()) {
            const f = elem.val();
            delete f.newId;
            setFriends(f);
          }
        });
    }
    await fetchUsers(setUsers);
  }, []);

  const searchByName = useCallback(async ({ target }) => {
    if (target.value) {
      await fetchUsers(setUsers, target.value);
    } else {
      await fetchUsers(setUsers);
    }
  },[]);

  return (
    <div className="Users">
      <ul className="UsersUl">
        {users.slice(0, 24).map((item) => {
          let isFriend;
          Object.keys(friends).forEach((key) => {
            if (friends[key] === item.id) {
              isFriend = true;
            }
          });
          if (isFriend) {
            return <User className="friend" key={item.id} {...item} />;
          }
          return <User key={item.id} {...item} />;
        })}
      </ul>
      <div className="search">
        <label htmlFor="nameInput">Search by name</label>
        <input type="text" id="nameInput" onChange={searchByName} />
      </div>
    </div>
  );
}

function User(props) {
  const friendClick = useCallback(({ target }) => {
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
        {getUser() ? (
          <PersonIcon className={props.className} onClick={friendClick} />
        ) : (
          ''
        )}
      </div>
      {props.img ? (
        <img src={props.img} alt="user" />
      ) : (
        <img
          src="https://st3.depositphotos.com/9998432/19048/v/600/depositphotos_190484900-stock-illustration-default-placeholder-businessman-half-length.jpg"
          alt="missing"
        />
      )}
    </li>
  );
}

User.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  className: PropTypes.string,
};

export default Users;
