import React, {useState} from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Users from "./Users";
import Login from "./Login";

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App"><Router>
            <div className="App-header">
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                    <Tab icon={<HomeIcon/>} label="HOME" to="/" component={Link}/>
                    <Tab icon={<LoginIcon/>} label="LOGIN" to="/login" component={Link}/>
                    <Tab icon={<PersonPinIcon/>} label="USERS" to="/users" component={Link}/>
                </Tabs>
            </div>
            <Switch>
                <Route exact path="/" component={Users}/>
                <Route path="/login" component={Login}/>
                <Route path="/users" component={Users}/>
            </Switch>
        </Router>
        </div>
    )
}

export default App;
