import './Movies.css';
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import firebase from 'firebase';
import { fetchMovies } from '../api';
import { getUser } from '../authentication';
import PropTypes from "prop-types";

function addFavourite(id) {
  let newId;
  firebase
    .database()
    .ref(`${getUser().uid}/favorites/newId`)
    .on('value', (elem) => {
      if (elem.val()) {
        newId = elem.val();
      } else {
        newId = 0;
      }
    });
  let f;
  firebase
    .database()
    .ref(`${getUser().uid}/favorites`)
    .on('value', (elem) => {
      f = { ...elem.val() };
    });
  f[newId] = id;
  f.newId = newId + 1;
  firebase.database().ref(`${getUser().uid}/favorites`).set(f);
}

function removeFavourite(id) {
  let index = null;
  let favorites;
  firebase
    .database()
    .ref(`${getUser().uid}/favorites`)
    .on('value', (elem) => {
      if (elem.val()) {
        favorites = elem.val();
        delete favorites.newId;
      }
    });
  Object.keys(favorites).forEach((key) => {
    if (+favorites[key] === +id) {
      index = key;
    }
  });
  if (index) {
    firebase.database().ref(`${getUser().uid}/favorites/${index}`).remove();
  }
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(async () => {
    if (getUser()) {
      firebase
        .database()
        .ref(`${getUser().uid}/favorites`)
        .on('value', (elem) => {
          if (elem.val()) {
            const f = elem.val();
            delete f.newId;
            setFavorites(f);
          }
        });
    }
    setMovies(await fetchMovies());
  }, [setMovies]);

  const searchByName = useCallback(async ({ target }) => {
    if (target.value) {
      const result = await fetchMovies(target.value);
      setMovies(result.map((item) => item.show));
    } else {
      const result = await fetchMovies();
      setMovies(result);
    }
  }, []);

  const filterByGenre = useCallback(async ({ target }) => {
    if (target.value) {
      const all = await fetchMovies();
      const result = all.filter(
        (item) => item.genres.filter((genre) => genre.startsWith(target.value))
          .length !== 0,
      );
      setMovies(result);
    } else {
      const result = await fetchMovies();
      setMovies(result);
    }
  }, []);

  return (
    <div className="Movies">
      <ul className="MoviesUl">
        {movies.length !== 0 ? (
          movies.slice(0, 24).map((item) => {
            let isFavorite;
            Object.keys(favorites).forEach((key) => {
              if (+favorites[key] === item.id) {
                isFavorite = true;
              }
            });
            if (isFavorite) {
              return <Movie className="favorite" key={item.id} {...item} />;
            }
            return <Movie key={item.id} {...item} />;
          })
        ) : (
          <h2>Nothing yet</h2>
        )}
      </ul>
      <aside>
        <div className="aside-content">
          <div className="search">
            <h3>Search</h3>
            <label htmlFor="nameInput">By name</label>
            <input type="text" id="nameInput" onChange={searchByName} />
          </div>
          <div className="filter">
            <h3>Filter</h3>
            <label htmlFor="nameInput">By Genre</label>
            <input type="text" id="genreInput" onChange={filterByGenre} />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Movie(props) {
  const favoriteClick = useCallback(({ target }) => {
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
        {getUser() ? (
          <FavoriteIcon className={props.className} onClick={favoriteClick} />
        ) : (
          ''
        )}
      </div>
      {props.image?.medium ? (
        <img src={props?.image.medium} alt="movie" />
      ) : (
        <img
          src="https://i.pinimg.com/474x/be/c1/de/bec1dee0a4484297fc3322e229c6f123.jpg"
          alt="missing"
          className="no-img"
        />
      )}
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
};

export default Movies;
