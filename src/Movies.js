import './Movies.css';
import React, {useState, useEffect} from 'react';

function Movies() {
    const [movies, setMovies] = useState(null);
    let api = 'https://api.tvmaze.com/shows';
    const fetchMovies = async (start, end) => {
        const response = await fetch(api);
        const result = await response.json();
        setMovies(result.slice(start, end).map((movie) =>
            <Movie key={movie.id} {...movie}/>
        ));
    }

    useEffect(() => {
        fetchMovies(0, 24);
    }, [api]);
    return (
        <ul className="Movies">{movies}</ul>
    );
}

function Movie(props) {
    return (
        <li className="Movie"><h3>{props.name}</h3>
            {props.image?.medium ? <img src={props.image?.medium} alt="movie photo"/> :
                <img
                    src="https://st3.depositphotos.com/9998432/19048/v/600/depositphotos_190484900-stock-illustration-default-placeholder-businessman-half-length.jpg"
                    alt="no photo"/>}
        </li>
    );
}

export default Movies;
