import './Users.css';
import React, {useState, useEffect} from 'react';

function Users() {
    const [users, setUsers] = useState(0);
    useEffect(() => {
        fetch('https://api.tvmaze.com/people')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data[0]);
                setUsers(data.map((user) =>
                    <User key={user.id} {...user}/>
                ));
            })
    });

    return (
        <ul className="Users">{users}</ul>
    );
}

function User(U) {
    return (
        <li className="User">{U.name}
            {U.image?.medium ? <img src={U.image?.medium} alt="user photo"/> :
                <img
                    src="https://st3.depositphotos.com/9998432/19048/v/600/depositphotos_190484900-stock-illustration-default-placeholder-businessman-half-length.jpg"
                    alt="no photo"/>}
        </li>
    );
}
export default Users;
