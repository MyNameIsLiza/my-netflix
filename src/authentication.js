import firebase from 'firebase/app';
import 'firebase/auth';

const authProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    firebase
        .auth()
        .signInWithPopup(authProvider)
        .then(function (result) {
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
}

export function getUser() {
    const userString = sessionStorage.getItem('user');
    return JSON.parse(userString);
}
