import './videoCard.css';
import React from 'react';
import { connect } from 'react-redux';
import { details } from '../../actions';
import { Link } from 'react-router-dom';

function genresToString(genres) {
    let genString = genres.map( gen => {
        return gen.name
    }).join(', ');
    return genString;
}

function hidesSideBar(){
    let pageControl = document.getElementById('pageControl');
    let mainView = document.getElementById('mainView');

    pageControl.style.right = '-1000px';
    mainView.style.width = '100%';
}

export function VideoCard ({ pagedGames, details }) {

    function todos(id){
        details(id);
        hidesSideBar();
    }

    return (
        pagedGames.map( game => {
            const { id, image, name, genres, rating } = game
            return (
                <li key={id} className='card'>
                    <img className='cardImg' src={image} alt={name}/>
                    <div className='contentCard'>
                        <p className='p'>{name}</p>
                        <p className='p'>Valoración: {Number(rating)}</p>
                        <p className='p'>Generos: {genresToString(genres)}</p>
                    </div>
                    <div className='buttonDiv'>
                        <Link to='/home/details'>
                            <button className='Button' onClick={ () => todos(id) }>Detalles</button>
                        </Link>
                    </div>
                </li>
            )
        })
    )
}

export default connect ( null, { details } )(VideoCard);