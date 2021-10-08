import firebase from 'firebase/app'
import 'firebase/auth'

const authProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = (onReRender = () => {}) => {
  firebase
    .auth()
    .signInWithPopup(authProvider)
    .then((result) => {
      sessionStorage.setItem('token', result.credential.accessToken)
      sessionStorage.setItem('user', JSON.stringify(result.user))
      firebase
        .database()
        .ref(`${getUser().uid}`)
        .on('value', (elem) => {
          if (!elem.val() || !elem.val().img || !elem.val().name) {
            const o = {
              ...elem.val(),
              name: getUser().displayName,
              img: getUser().photoURL,
            }
            firebase.database().ref(`${getUser().uid}`).set(o)
          }
        })
      onReRender()
      window.location.pathname = '/personal_account'
    })
    .catch((error) => {
      console.error({
        ...error,
      })
    })
}

export const signOut = (onReRender = () => {}) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      onReRender()
      window.location.pathname = '/login'
    })
    .catch((error) => {
      console.error({
        ...error,
      })
    })
}

export function setUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export function getToken() {
  return sessionStorage.getItem('token')
}

export function getUser() {
  const userString = sessionStorage.getItem('user')
  return JSON.parse(userString)
}
