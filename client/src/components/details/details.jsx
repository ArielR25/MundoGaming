import './details.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
    
    const { description, genres, image, name, platforms, rating, released } = details;

    useEffect( () => {
    },[ details ])

    if(!details.image) return <p>Cargando...</p>
    
    return (
        <div className='details'>
            <img src={image} alt={`logo del juego: ${name}`} />
            <h2>{name}</h2>
            <p><span>Valoración: </span>{rating}</p>
            <p><span>Fecha de creación: </span>{released}</p>
            <p><span>Generos: </span>{getFormatedData(genres)}</p>
            <p><span>Plataformas: </span>{getFormatedData(platforms)}</p>
            <p><span>Descripción:</span>{getDescription(description)}</p>
        </div>
    )
}

function mapStateToProps(state){
    return {
        details: state.details
    }
}

export default connect( mapStateToProps, null )(Details);