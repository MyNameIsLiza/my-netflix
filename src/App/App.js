import React, { useCallback, useState } from 'react';
import firebase from 'firebase';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import Avatar from '@mui/material/Avatar';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import Home from '../Home';
import Users from '../Users/Users';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import { getToken, getUser } from '../authentication';

import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const initialValue = {
  '/': 0,
  '/login': 1,
  '/personal_account': 1,
  '/users': 2,
  '/movies': 3,
};

function App() {
  const [value, setValue] = React.useState(
    initialValue[window.location.pathname],
  );
  const [reRender, setReRender] = useState(false);

  const handleReRender = () => {
    setReRender(!reRender);
  };

  const handleChange = useCallback((value, newValue) => {
    setValue(newValue);
  }, []);

  const token = getToken();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon tabs example"
          >
            <Tab
              icon={<HomeIcon className="navIcon" />}
              label="HOME"
              to="/"
              component={Link}
            />
            {!token ? (
              <Tab
                icon={<LoginIcon className="navIcon" />}
                label="LOGIN"
                to="/login"
                component={Link}
              />
            ) : (
              <Tab
                icon={<Avatar alt="Remy Sharp" src={getUser().photoURL} />}
                label="ACCOUNT"
                to="/personal_account"
                component={Link}
              />
            )}
            <Tab
              icon={<PersonPinIcon className="navIcon" />}
              label="USERS"
              to="/users"
              component={Link}
            />
            <Tab
              icon={<MovieIcon className="navIcon" />}
              label="MOVIES"
              to="/movies"
              component={Link}
            />
          </Tabs>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          {!token ? (
            <Route path="/login">
              <Login onReRender={handleReRender} />
            </Route>
          ) : (
            <Route path="/personal_account">
              <PersonalAccount onReRender={handleReRender} />
            </Route>
          )}
          <Route path="/users" component={Users} />
          <Route path="/movies" component={Movies} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
