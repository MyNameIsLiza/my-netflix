import './PersonalAccount.css';
import React, {useState, useEffect, useCallback} from 'react';
import {signOut, signInWithGoogle} from '../signInOut';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function PersonalAccount() {
let history = useHistory();
    function getUser() {
        const userString = sessionStorage.getItem('user');
        return JSON.parse(userString);
    }

    const handleSignOut = useCallback(async()=>{
        await signOut();
    }, [signOut])

    return (
        <div className="PersonalAccount">
            <h2>{getUser().displayName}</h2>
            <img src={getUser().photoURL} alt="user icon"/>
            <Button className="signOutButton" variant="outlined" onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}


export default PersonalAccount;
