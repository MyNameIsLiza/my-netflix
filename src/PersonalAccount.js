import './PersonalAccount.css';
import React, {useState, useEffect} from 'react';
import {signOut, signInWithGoogle} from './signInOut';
import Button from '@mui/material/Button';

function PersonalAccount() {

    function getUser() {
        const userString = sessionStorage.getItem('user');
        return JSON.parse(userString);
    }

    return (
        <div className="PersonalAccount">
            <h2>{getUser().displayName}</h2>
            <img src={getUser().photoURL}/>
            <Button className="signOutButton" variant="outlined" onClick={signOut}>Sign Out</Button>
        </div>
    );
}


export default PersonalAccount;
