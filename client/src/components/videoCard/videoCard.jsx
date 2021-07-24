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
                    <p>{name}</p>
                    <p>Valoración: {rating}</p>
                    <p>Generos:</p>
                    <p>{genresToString(genres)}</p>
                    <Link to='/home/details'>
                        <button onClick={() => details(id)}>Detalles</button>
                    </Link>
                </li>
            )
        })
    )
}

export default connect ( null, { details } )(VideoCard);