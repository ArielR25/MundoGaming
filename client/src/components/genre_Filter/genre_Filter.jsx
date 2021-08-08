import './genre_Filter.css';
import React from 'react';
import checkbox from '../../img/checkbox.png';
import { connect } from 'react-redux';
import CheckList from '../checkList/checkList';
import { genresFilter } from '../../actions';

function genreCheck() {
    let check = document.getElementById('genreBox')
    let genreList = document.getElementById('genreList')
    if(check.checked) genreList.style.display = 'flex';
    else genreList.style.display = 'none';
}

export function Genre_Filter (props) {

    function genreCheckLooks() {
        let genreList = props.genres.map( genre => {
            const { id } = genre;
            let genres = document.getElementById('g'+id);
            if(genres.checked) {
                genres.checked = false;
                return id
            };
            return undefined;
        })
        genreList = genreList.filter( g => g !== undefined )
        props.genresFilter(genreList)
    }

    return (
        <div className='genreFilter'>
            <label htmlFor='genreBox' className='genreLabel'>
                <input 
                    type="checkbox" 
                    id="genreBox" 
                    value="first_checkbox" 
                    className='genreInput'
                    onChange={() => genreCheck()}
                />
                <img className='genreCheckImg' src={checkbox} alt='icono de busqueda de filtro de generos' />
                <span className='radioSpan'>Generos</span>
            </label>
            <CheckList items={props.genres} id='genreList' type='g'/>
            <button id='genreButton' className='Button3' onClick={genreCheckLooks}>Filtrar</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        genres: state.genres
    }
}

export default connect( mapStateToProps, { genresFilter } )(Genre_Filter);