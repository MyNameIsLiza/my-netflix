export const fetchMovies = async (name) => {
    if(name){
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
        return await response.json();
    }else{
        const response = await fetch('https://api.tvmaze.com/shows');
        return await response.json();
    }
}

export const fetchUsers = async () => {
    if(name){
        const response = await fetch(`https://api.tvmaze.com/search/people?q=${name}`);
        return await response.json();
    }else{
        const response = await fetch('https://api.tvmaze.com/people');
        return await response.json();
    }
}
