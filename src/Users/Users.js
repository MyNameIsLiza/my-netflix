import './Users.css';
import React, {useState, useEffect} from 'react';

function Users() {

    const [users, setUsers] = useState([]);
    let api = 'https://api.tvmaze.com/people';
    const fetchUsers = async (start, end) => {
        const response = await fetch(api);
        const result = await response.json();
        setUsers(result.slice(start, end).map((user) =>
            <User key={user.id} {...user}/>
        ));
    }

    useEffect(() => {
        fetchUsers(0, 24);
    }, [api]);

    return (
        <ul className="Users">{users}</ul>
    );
}


function User(props) {
    return (
        <li className="User"><h3>{props.name}</h3>
            {props.image?.medium ? <img src={props.image?.medium} alt="user photo"/> :
                <img
                    src="https://st3.depositphotos.com/9998432/19048/v/600/depositphotos_190484900-stock-illustration-default-placeholder-businessman-half-length.jpg"
                    alt="no photo"/>}
        </li>
    );
}

export default Users;
