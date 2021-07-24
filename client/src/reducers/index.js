import {
    GAMES_LOAD,
    GENRES_LOAD,
    PLATFORMS_LOAD,
    GAMES_SEARCH,
    GENRES_FILTER,
    ORIGIN_FILTER,
    CLEAN_FILTERS,
    ALPH_SORT,
    RATING_SORT,
    DETAILS
} from "../actions";

const store = {
    videoGames: [],
    filteredGames: [],
    genres: [],
    platforms: [],
    details: {},
    forRender: 0
};

function rootReducer(state = store, action) {

    if(action.type === GAMES_SEARCH) {
        return {
            ...state,
            filteredGames: state.filteredGames.filter( filtered => filtered.name.toLowerCase().includes(action.payload.toLowerCase()) )
        }
    }

    if (action.type === GAMES_LOAD) {
        return {
            ...state,
            videoGames: action.payload,
            filteredGames: action.payload
        }
    }

    if (action.type === GENRES_LOAD) {
        return {
            ...state,
            genres: action.payload.map( genre => {
                const { id, name } = genre
                return {
                    id,
                    name
                }
            })
        }
    }

    if (action.type === PLATFORMS_LOAD) {
        return {
            ...state,
            platforms: action.payload.map( platform => {
                const { id, name } = platform
                return {
                    id,
                    name
                }
            })
        }
    }

    if(action.type === GENRES_FILTER) {
        return {
            ...state,
            filteredGames: state.filteredGames.filter( filtered => {
                for( let i=0 ; i<filtered.genres.length ; i++ ) {
                    for( let j=0 ; j<action.payload.length ; j++ ) {
                        if( filtered.genres[i].id === action.payload[j] ) return true;
                    }
                }
                return false;
            })
        }
    }
    
    if(action.type === ORIGIN_FILTER) {
        return {
            ...state,
            filteredGames: state.filteredGames.filter( filtered =>  {
                return (action.payload.includes('local') && typeof filtered.id === 'string') 
                || (action.payload.includes('api') && typeof filtered.id === 'number') 
            }) 
        }
    }
    if(action.type === CLEAN_FILTERS) {
        return {
            ...state,
            filteredGames: [...state.videoGames]
        }
    }
    
    if(action.type === ALPH_SORT) {
        
        if(action.payload === 'asc') {
            
            return {
                ...state,
                forRender: state.forRender+1,
                filteredGames: state.filteredGames.sort((a,b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                }),
            }
        }
        if(action.payload === 'desc') {
            return {
                ...state,
                forRender: state.forRender-1,
                filteredGames: state.filteredGames.sort((a,b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                }),
            }
        }
    }

    if(action.type === RATING_SORT) {
        
        if(action.payload === 'higher') {
            
            return {
                ...state,
                forRender: state.forRender+1,
                filteredGames: state.filteredGames.sort((a,b) => {
                    if( a.rating > b.rating ) return -1
                    if(a.rating < b.rating) return 1
                    return 0
                }),
            }
        }
        if(action.payload === 'lower') {
            return {
                ...state,
                forRender: state.forRender-1,
                filteredGames: state.filteredGames.sort((a,b) => {
                    if( a.rating < b.rating ) return -1
                    if(a.rating > b.rating) return 1
                    return 0
                }),
            }
        }
    }

    if( action.type === DETAILS) {
        return {
            ...state,
            details: action.payload
        }
    }

    return state;
}

export default rootReducer;