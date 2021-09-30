export const fetchMovies = async (start, end, name) => {
    if(name){
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`);
        return await response.json();
    }else{
        const response = await fetch('https://api.tvmaze.com/shows');
        return await response.json();
    }
}
