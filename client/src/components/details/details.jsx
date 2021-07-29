import './details.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function getFormatedData(data=[]) {
        const formatedData = data.map( d => {
            return d.name
        })
        return formatedData.join(', ')
    }

    function getDescription(description=[]) {
        if(description.slice(0,3) === '<p>') {
            const reg1 = /<[^>]*>?/g
            const formatedDescription = description.replace(reg1,'')
            return ` ${formatedDescription}`;
        }
        return description
    }

export function Details ({ details }) {
    
    let { description, genres, image, name, platforms, rating, released, generos, plataformas } = details;
    
    genres = genres || generos;
    platforms = platforms || plataformas;
    released = released ? released.slice(0,10) : null;

    useEffect( () => {
    },[ details ])

    if(!details.image) return <p>Cargando...</p>
    
    return (
        <div>
            <Link to='/home'>
                <button className='Buton4'>Home</button>
            </Link>
            <div className='generalDetails'>
                <div className='details'>
                    <img className='detailsImg' src={image} alt={`logo del juego: ${name}`} />
                    <h2 className='detailsName'>{name}</h2>
                    <p><span className='leftContent'>Valoración: </span><span className='rightContent'>{rating}</span></p>
                    <p><span className='leftContent'>Fecha de creación: </span><span className='rightContent'>{released}</span></p>
                    <p><span className='leftContent'>Generos: </span><span className='rightContent'>{getFormatedData(genres)}</span></p>
                    <p><span className='leftContent'>Plataformas: </span><span className='rightContent'>{getFormatedData(platforms)}</span></p>
                </div>
                <div className='detailsDescription'>
                    <span className='detailsDescriptionTitle'>Descripción:</span>
                    <p className='detailsDescriptionContent'>{getDescription(description)}</p>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        details: state.details
    }
}

export default connect( mapStateToProps, null )(Details);