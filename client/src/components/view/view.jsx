import './view.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import VideoCard from '../videoCard/videoCard';

const CANT_GAMES = 8;

export function View ({ filteredGames, forRender }) {

    const [ totalGamesCount, setTotalGamesCount ] = useState( filteredGames.length )
    const [ pagedGames, setPagedGames ] = useState( [...filteredGames].splice( 0, CANT_GAMES ) )
    const [ currentPage, setCurrentPage ] = useState(0)
    
    useEffect(() => {
        setTotalGamesCount( filteredGames.length )
        setPagedGames( [...filteredGames].splice( 0, CANT_GAMES ) )
        
    },[ filteredGames, forRender ])
    
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * CANT_GAMES;

        if( firstIndex < 0 ) return;

        setPagedGames( [...filteredGames].splice( firstIndex, CANT_GAMES ) );
        setCurrentPage(prevPage)
    }
    const nextHandler = () => {

        const nextPage = currentPage + 1;
        const firstIndex = nextPage * CANT_GAMES;

        if( firstIndex >= totalGamesCount ) return;

        setPagedGames( [...filteredGames].splice( firstIndex, CANT_GAMES ) );
        setCurrentPage( nextPage );
    }

    if(!filteredGames.length) {
        return (    
            <p>Cargando...</p>
        )
    }
    return (
        <div className='view'>
            <div className='pagination'>
                <button className = 'Button2' onClick={prevHandler}> Anterior </button>
                <button className = 'Button2' onClick={nextHandler}> Siguiente </button>
            </div>
            <div id='cardsZone' className='cardsZone'>
                <VideoCard pagedGames={ pagedGames } />                
            </div>
        </div>
    )
    
}
function mapStateToProps(state) {
    return {
        filteredGames: state.filteredGames,
        forRender: state.forRender
    }
}

export default connect( mapStateToProps, null )(View);