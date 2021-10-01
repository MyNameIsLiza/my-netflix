import './Movies.css';
import React, {useState, useEffect, useCallback} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {fetchMovies} from '../api';
import firebase from "firebase";
import {getUser} from '../authentication'

function addFavourite(id) {
    let newId;
    firebase.database().ref(`${getUser().uid}/favorites/newId`).on('value', (elem) => {
        if (elem.val()) {
            newId = elem.val();
        } else {
            console.log('O');
            newId = 0;
        }
    });
    let f;
    firebase.database().ref(`${getUser().uid}/favorites`).on('value', (elem) => {
        f = {...elem.val()};
    });
    f[newId] = id;
    f['newId'] = ++newId;
    firebase.database().ref(`${getUser().uid}/favorites`).set(f);


    console.log('newId', newId);
    /*firebase.database().ref(`${getUser().uid}/favorites/${props.id}`).push(true);*/
}

function removeFavourite(id) {
    let index = null;
    let favorites;
    firebase.database().ref(`${getUser().uid}/favorites`)
        .on('value', (elem) => {
                if (elem.val()) {
                    favorites = elem.val();
                    delete favorites['newId'];
                }
            }
        )
    for (let key in favorites) {
        if (+favorites[key] === +id) {
            index = key;
        }
    }
    if (index) {
        firebase.database().ref(`${getUser().uid}/favorites/${index}`).remove();
    }
}

function Movies() {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(async () => {
        if (getUser()) {
            firebase.database().ref(`${getUser().uid}/favorites`)
                .on('value', (elem) => {
                    if (elem.val()) {
                        let f = elem.val();
                        delete f['newId'];
                        setFavorites(f);
                    }
                });
        }

        setMovies(await fetchMovies(0, 24));
    }, [fetchMovies, setMovies, getUser]);

    const searchByName = useCallback(
        async ({target}) => {
            if (target.value) {
                const result = await fetchMovies(0, 24, target.value);
                setMovies(result.map((item) => item.show));
            } else {
                const result = await fetchMovies(0, 24);
                setMovies(result);
            }
        }, []);

    return (
        <div className="Movies">
            <ul className="MoviesUl">{movies.map((item) => {
                let isFavorite;
                for (let key in favorites) {
                    if (+favorites[key] === item.id) {
                        isFavorite = true;
                    }
                }
                if (isFavorite) {
                    return (<Movie className="favorite" key={item.id} {...item}/>);
                } else {
                    return (<Movie key={item.id} {...item}/>);
                }
            })}
            </ul>
            <div className="search">
                <label htmlFor="nameInput">Search by name</label>
                <input type="text" id="nameInput" onChange={searchByName}/>
            </div>
        </div>

    );

}

function Movie(props) {
    const favoriteClick = useCallback(({target}) => {
        const svg = target.closest('svg');
        if (svg.classList.contains('favorite')) {
            svg.classList.remove('favorite');
            removeFavourite(target.closest('li').dataset.id);
        } else {
            addFavourite(target.closest('li').dataset.id);
            svg.classList.add('favorite');
        }
    }, []);

    return (
        <li className="Movie" data-id={props.id}>
            <div className="movieHeader">
                <h3>{props.name}</h3>
                {getUser() ? <FavoriteIcon className={props.className} onClick={favoriteClick}/> : ''}
            </div>
            {props.image?.medium ? <img src={props.image?.medium} alt="movie photo"/> :
                <img
                    src="https://i.pinimg.com/474x/be/c1/de/bec1dee0a4484297fc3322e229c6f123.jpg"
                    alt="no photo" className="no-img"/>}
        </li>
    );
}

export default Movies;
