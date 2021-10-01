import './PersonalAccount.css';
import React, {useState, useEffect, useCallback} from 'react';
import {signOut, getUser, signInWithGoogle} from '../authentication';
import Button from '@mui/material/Button';

function PersonalAccount({onReRender} = () => {
}) {
    const handleSignOut = () => {
        signOut(onReRender);
    };

    return (
        <div className="PersonalAccount">
            <h2>{getUser().displayName}</h2>
            <img src={getUser().photoURL} alt="user icon"/>
            <Button className="signOutButton" variant="outlined" onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}


export default PersonalAccount;
