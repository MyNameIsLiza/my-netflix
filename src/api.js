export const fetchMovies = async (start, end, name) => {
    if(name){
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
        const result = await response.json();
        return result.slice(start, end);
    }else{
        const response = await fetch('https://api.tvmaze.com/shows');
        const result = await response.json()
        return result.slice(start, end);
    }
}

export const fetchUsers = async (start, end, name) => {
    if(name){
        const response = await fetch(`https://api.tvmaze.com/search/people?q=${name}`);
        const result = await response.json();
        return result.slice(start, end);
    }else{
        const response = await fetch('https://api.tvmaze.com/people');
        const result = await response.json()
        return result.slice(start, end);
    }
}
