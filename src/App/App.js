import React, {useCallback, useEffect, useState} from 'react';
import firebase from 'firebase';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import Avatar from '@mui/material/Avatar';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../Home";
import Users from "../Users/Users";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import PersonalAccount from "../PersonalAccount/PersonalAccount";

import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

function getToken() {
    return sessionStorage.getItem('token');
}

function getUser() {
    const userString = sessionStorage.getItem('user');
    return JSON.parse(userString);
}

function getInitialValue() {
    switch (location.pathname) {
        case '/':
            return 0;
        case '/login':
            return 1;
        case '/personal_account':
            return 1;
        case '/users':
            return 2;
        case '/movies':
            return 3;
    }
}

function App() {
    const [value, setValue] = React.useState(getInitialValue());

    const handleChange = useCallback((value, newValue) => {
        setValue(newValue);

    }, []);
    useEffect(() => {


    }, [firebase]);
    let token = getToken();

    return (
        <div className="App"><Router>
            <div className="App-header">
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                    <Tab icon={<HomeIcon className="navIcon"/>} label="HOME" to="/" component={Link}/>
                    {!token ?
                        <Tab icon={<LoginIcon className="navIcon"/>} label="LOGIN" to="/login" component={Link}/> :
                        <Tab icon={<Avatar alt="Remy Sharp" src={getUser().photoURL}/>} label="ACCOUNT"
                             to="/personal_account" component={Link}/>
                    }
                    <Tab icon={<PersonPinIcon className="navIcon"/>} label="USERS" to="/users" component={Link}/>
                    <Tab icon={<MovieIcon className="navIcon"/>} label="MOVIES" to="/movies" component={Link}/>
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Home}/>
                {!token ? <Route path="/login" component={Login}/> :
                    <Route path="/personal_account" component={PersonalAccount}/>}
                <Route path="/users" component={Users}/>
                <Route path="/movies" component={Movies}/>
            </Switch>
        </Router>
        </div>
    )
}

export default App;
