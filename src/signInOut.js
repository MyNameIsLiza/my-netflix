import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);
const authProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    firebase
        .auth()
        .signInWithPopup(authProvider)
        .then(function(result) {
            console.log(result.credential.accessToken);
            sessionStorage.setItem('token', result.credential.accessToken);
            sessionStorage.setItem('user', JSON.stringify(result.user));
        })
        .catch(error => {
            console.error({
                ...error
            });
        });
};

export const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        })
        .catch(error => {
            console.error({
                ...error
            });
        });
};
