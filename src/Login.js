//import './Login.css';
import React, {useState} from 'react';
import {signOut, signInWithGoogle} from './signInOut';


export default function Login() {
    const [user, setUser] = useState(setUser);

    return (
        <div className="Login">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
            {user ? (
                <button onClick={signOut}>Sign out</button>
            ) : (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            )}
        </div>
    );
}

/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
};*/
