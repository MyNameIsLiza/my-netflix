import firebase from 'firebase';

export const fetchMovies = async (name) => {
  if (name) {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${name}`,
    );
    return response.json();
  }
  const response = await fetch('https://api.tvmaze.com/shows');
  return response.json();
};

export const fetchUsers = async (setUsers, name) => {
  const eventRef = firebase.database().ref();
  const snapshot = await eventRef.once('value');
  const value = snapshot.val();

  const users = [];
  const specialUsers = [];
  Object.keys(value).forEach((key) => {
    users.push({ id: key, ...value[key] });
    if (name && value[key].name && value[key].name.startsWith(name)) {
      specialUsers.push({ id: key, ...value[key] });
    }
  });
  if (name) {
    setUsers(specialUsers);
  } else {
    setUsers(users);
  }
  return snapshot;
};
