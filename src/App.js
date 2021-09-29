import React, {useState} from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import Avatar from '@mui/material/Avatar';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Login from "./Login";
import Movies from "./Movies";
import PersonalAccount from "./PersonalAccount";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

function getToken() {
    const userToken = sessionStorage.getItem('token');
     //JSON.parse(tokenString);
    return userToken;
}

function getUser() {
    const userString = sessionStorage.getItem('user');
    return JSON.parse(userString);
}

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const token = getToken();

    /*if(!token) {
        return <Login setToken={setToken} setUser={setUser}/>
    }*/

    return (
        <div className="App"><Router>
            <div className="App-header">
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                   <Tab icon={<HomeIcon className="navIcon"/>} label="HOME" to="/" component={Link}/>
                    {!token?<Tab icon={<LoginIcon className="navIcon"/>} label="LOGIN" to="/login" component={Link}/>:
                        <Tab icon={<Avatar alt="Remy Sharp" src={getUser().photoURL}/>} label="ACCOUNT" to="/personal_account" component={Link}/>

                    }
                    <Tab icon={<PersonPinIcon className="navIcon"/>} label="USERS" to="/users" component={Link}/>
                    <Tab icon={<MovieIcon className="navIcon"/>} label="MOVIES" to="/movies" component={Link}/>
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Home}/>
                {!token?<Route path="/login" component={Login}/>:<Route path="/personal_account" component={PersonalAccount}/>}

                <Route path="/users" component={Users}/>
                <Route path="/movies" component={Movies}/>
            </Switch>
        </Router>
        </div>
    )
}

export default App;
