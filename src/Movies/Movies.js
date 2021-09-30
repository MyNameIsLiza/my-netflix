import './Movies.css';
import React, {useState, useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {fetchMovies} from '../api';

function Movies() {
    const [movies, setMovies] = useState([]);


    useEffect(async () => {
        setMovies(await fetchMovies(0, 24));
    }, [fetchMovies, setMovies]);

    async function searchByName({target}) {
        if(target.value){
            const result = await fetchMovies(0, 24, target.value);
            setMovies(result.map((item)=>item.show));
        }else{
            const result = await fetchMovies(0, 24);
            setMovies(result);
        }
    }

    return (
        <div className="Movies">
            <ul className="MoviesUl">{movies.map((item) => (<Movie key={item.id} {...item}/>))}</ul>
            <div className="search">
                <label htmlFor="nameInput">Search by name</label>
                <input type="text" id="nameInput" onChange={searchByName}/>
            </div>
        </div>

    );
}

function Movie(props) {
    function favoriteClick({target}) {
        const svg = target.closest('svg');
        if (svg.classList.contains('favorite')) {
            svg.classList.remove('favorite');
        } else {
            svg.classList.add('favorite');
        }
    }

    return (
        <li className="Movie" data-id={props.id}>
            <div className="movieHeader">
                <h3>{props.name}</h3>
                <FavoriteIcon onClick={favoriteClick}/>
            </div>
            {props.image?.medium ? <img src={props.image?.medium} alt="movie photo"/> :
                <img
                    src="https://i.pinimg.com/474x/be/c1/de/bec1dee0a4484297fc3322e229c6f123.jpg"
                    alt="no photo" className="no-img"/>}
        </li>
    );
}

export default Movies;
