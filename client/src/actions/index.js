export const GAMES_LOAD = 'GAMES_LOAD';
export const GENRES_LOAD = 'GENRES_LOAD';
export const PLATFORMS_LOAD = 'PLATFORMS_LOAD';
export const GAMES_SEARCH = 'GAMES_SEARCH';
export const GENRES_FILTER = 'GENRES_FILTER';
export const ORIGIN_FILTER = 'ORIGIN_FILTER';
export const CLEAN_FILTERS = 'CLEAN_FILTERS';
export const ALPH_SORT = 'ALPH_SORT';
export const RATING_SORT = 'RATING_SORT';
export const DETAILS = 'DETAILS';

export const loadGames = () => (dispatch) => {
    try{
        fetch('http://localhost:3001/videogames?cant=100')
        .then( resp => resp.json() )
        .then( data => {
            dispatch({
                type: GAMES_LOAD,
                payload: data
            })
        })
    }catch(e){
        console.log(e)
    }
}

export const loadGenres = () => (dispatch) => {
    try{
        fetch('http://localhost:3001/genres')
        .then( resp => resp.json() )
        .then( data => {
            dispatch({
                type: GENRES_LOAD,
                payload: data
            })
        })
    }catch(e){
        console.log(e)
    }
}

export const loadPlatforms = () => (dispatch) => {
    try{
        fetch('http://localhost:3001/plataformas')
        .then( resp => resp.json() )
        .then( data => {
            dispatch({
                type: PLATFORMS_LOAD,
                payload: data
            })
        })
    }catch(e){
        console.log(e)
    }
}

export const gamesSearch = (data) => {
    return {
        type: GAMES_SEARCH,
        payload: data
    }
}

export const genresFilter = (data) => {
    return ({
        type: GENRES_FILTER,
        payload: data
    })
}

export const originFilter = (data) => {
    return ({
        type: ORIGIN_FILTER,
        payload: data
    })
}

export const cleanFilters = () => {
    return {
        type: CLEAN_FILTERS
    }
}

export const alphSort = (data) => { 
    return {
        type: ALPH_SORT,
        payload: data
    }
}

export const ratingSort = (data) => { 
    return {
        type: RATING_SORT,
        payload: data
    }
}

export const details = (data) => {
    return (dispatch) => {
    try{
        fetch(`http://localhost:3001/videogame/${data}`)
        .then(response => response.json())
        .then(res => {
            dispatch({
                type: DETAILS,
                payload: res
            })
        })
    }catch(e){
        console.log(e)
    }
}}