import './Movies.css';
import React, {useState, useEffect} from 'react';

function Movies() {
    const [movies, setMovies] = useState(null);
    const [api, setApi] = useState('https://api.tvmaze.com/shows');
    const fetchMovies = async (start, end) => {
        const response = await fetch(api);
        const result = await response.json();
        setMovies(result.slice(start, end).map((movie) => {
                if (movie.show) {
                    movie = movie.show;
                }
                return <Movie key={movie.id} {...movie}/>
            }
        ));
        console.log(result);
    }

    useEffect(() => {
        fetchMovies(0, 24);
    }, [api]);

    function searchByName() {
        const input = document.getElementById('nameInput');
        let name = input.value;
        console.log('input', input);
        console.log(`https://api.tvmaze.com/search/shows?q=${name}`);
        setApi(`https://api.tvmaze.com/search/shows?q=${name}`);
    }

    return (
        <div className="Movies">
            <ul className="MoviesUl">{movies}</ul>
            <div className="search">
                <label htmlFor="nameInput">Search by name</label>
                <input type="text" id="nameInput" onChange={searchByName}/>
            </div>
        </div>

    );
}

function Movie(props) {
    return (
        <li className="Movie"><h3>{props.name}</h3>
            {props.image?.medium ? <img src={props.image?.medium} alt="movie photo"/> :
                <img
                    src="https://i.pinimg.com/474x/be/c1/de/bec1dee0a4484297fc3322e229c6f123.jpg"
                    alt="no photo" className="no-img"/>}
        </li>
    );
}

export default Movies;
