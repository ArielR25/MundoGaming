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

export function VideoCard ({ pagedGames, details }) {

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
                            <button className='Button' onClick={() => details(id)}>Detalles</button>
                        </Link>
                    </div>
                </li>
            )
        })
    )
}

export default connect ( null, { details } )(VideoCard);