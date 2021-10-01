import firebase from "firebase";

export const fetchMovies = async (name) => {
    if (name) {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
        return await response.json();
    } else {
        const response = await fetch('https://api.tvmaze.com/shows');
        return await response.json();
    }
}

export const fetchUsers = async (setUsers, name) => {

    const eventref = firebase.database().ref();
    const snapshot = await eventref.once('value');
    const value = snapshot.val();

    let users = []
    let specialUsers = []

    for (const key in value) {
        users.push({'id': key, ...value[key]});
        if (name && value[key].name.startsWith(name)) {
            specialUsers.push({'id': key, ...value[key]});
        }
    }
    if (name) {
        setUsers(specialUsers);
    } else {
        setUsers(users);
    }
    return snapshot;
}
