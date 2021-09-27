import React, {useState} from 'react';
import './App.css';
import Login from './Login';
import Users from './Users';
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
const authProvider = new firebase.auth.GoogleAuthProvider();

function App() {
    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(authProvider)
            .then(function(result) {
                console.log(result.credential.accessToken);
                setUser(result.user);
            })
            .catch(error => {
                console.error({
                    ...error
                });
            });
    };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                console.error({
                    ...error
                });
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
                {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
                {user ? (
                    <button onClick={signOut}>Sign out</button>
                ) : (
                    <button onClick={signInWithGoogle}>Sign in with Google</button>
                )}
            </header>
        </div>
    );
}

export default App;
