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

export const fetchUsers = async (name) => {
    /*if (name) {
        const response = await fetch(`https://api.tvmaze.com/search/people?q=${name}`);
        return await response.json();
    } else {
        const response = await fetch('https://api.tvmaze.com/people');
        return await response.json();
    }*/
    if (name) {
        const result = (await getUsers()).specialUsers;
        return result;
    } else {
        const result = (await getUsers()).users;
        return result;
    }
}

async function getUsers(name) {
    let all = [];
    let users = [];
    let specialUsers = [];
    await (()=>{firebase.database().ref().on('value', (elem) => {
        all = elem.val();
        console.log('TTTTTTTT');
    })})();
    console.log('ALL', all);
    for (const key in all) {
        console.log('key', key);
        users.push({'id': key, ...all[key]});
        if (name && all[key].name === name) {
            specialUsers.push({'id': key, ...all[key]});
        }
    }
    return {users, specialUsers}
}
