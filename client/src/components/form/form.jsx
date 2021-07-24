import './form.css';
import checkbox from '../../img/checkbox.png';
import React, { useState } from 'react';
import CheckList from '../checkList/checkList';
import VideoCard from '../videoCard/videoCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function formCheck( id, form) {
    let check = document.getElementById(id)
    let formList = document.getElementById(form)
    if(check.checked) formList.style.display = 'flex';
    else formList.style.display = 'none';
}

const URL_FORM = 'http://localhost:3001/videogame';

export function Form(props) {

    const [ createdGame, setCreatedGame ] = useState([{genres:[]}])

    function clearchecks(e) {
        props.genres.map( genre => {
            const { id } = genre;
            let genres = document.getElementById('gf'+id);
                genres.checked = false;
        })
        props.platforms.map( plat => {
            const { id } = plat;
            let genres = document.getElementById('pf'+id);
                genres.checked = false;
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {};
        const genre = [];
        const genres = [];
        const plat = [];

        for(let i=0 ; i < e.target.length ; i++) {
            data[e.target[i].id] = e.target[i].value
            
            if( e.target[i].id.includes('gf') && e.target[i].checked ) {
                genre.push(Number(e.target[i].id.slice(2)));
                genres.push( {name: e.target[i].name} )
            }
            if( e.target[i].id.includes('pf') && e.target[i].checked ) {
                plat.push(Number(e.target[i].id.slice(2)));
            }
        }
        data.genre = genre;
        data.plat = plat;

        const info = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        fetch( URL_FORM, info )
            .then(res => res.json())
            .then(res =>  { console.log(res)
                
                if(res.id.includes('-')){
                    const { id, image, name } = res
                    document.getElementById('failedCreate').style.display = 'none'
                    document.getElementById('createdDiv').style.display = 'block'
                    setCreatedGame([{
                        id,
                        image,
                        name,
                        genres: genres
                    }])
                }else {
                    document.getElementById('failedCreate').style.display = 'block'
                    document.getElementById('createdDiv').style.display = 'none'
                }
            })
        clearchecks()
    }

    return (
        <div className='divForm'>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <form className='form' onSubmit={handleSubmit} >
                <label htmlFor="name">
                    <span>Nombre</span>
                    <input type="text" id='name' name='name'/>
                </label>
                <label htmlFor="description">
                    <span>Descripcion</span>
                    <textarea id='description' name='description'></textarea>
                </label>
                <label htmlFor="released">
                    <span>Fecha de Creación</span>
                    <input type="text" id='released'name='released'/>
                </label>
                <label htmlFor="rating">
                    <span>Puntuación</span>
                    <input type="text" id='rating' name='rating'/>
                </label>
                <label htmlFor="image">
                    <span>Imagen URL:</span>
                    <input type="text" id='image' name='image'/>
                </label>
                <div className='checks'>
                    <div className='formFilter'>
                        <label htmlFor='genresFormBox' className='formLabel'>
                            <input 
                                type="checkbox" 
                                id="genresFormBox" 
                                value="first_checkbox" 
                                className='formInput'
                                onChange={() => formCheck('genresFormBox', 'genresFormList')}
                            />
                            <img className='formCheckImg' src={checkbox} alt='icono de busqueda de filtro de generos' />
                            Generos
                        </label>
                        <CheckList items={props.genres} id='genresFormList' type='gf'/>
                    </div>
                    <div className='formFilter'>
                        <label htmlFor='platformsFormBox' className='formLabel'>
                            <input 
                                type="checkbox" 
                                id="platformsFormBox" 
                                value="first_checkbox" 
                                className='formInput'
                                onChange={() => formCheck('platformsFormBox', 'platformsFormList')}
                            />
                            <img className='formCheckImg' src={checkbox} alt='icono de busqueda de filtro de generos' />
                            Plataformas
                        </label>
                        <CheckList items={props.platforms} id='platformsFormList' type='pf'/>
                    </div>
                </div>
                <input type="submit" value='Crear' />
            </form>
            <div id='createdDiv' className='createdDiv'>
                <VideoCard pagedGames={createdGame}/>
            </div>
            <p id='failedCreate' className='failedCreate'>Creación de video juego fallida</p>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        genres: state.genres,
        platforms: state.platforms
    }
}

export default connect( mapStateToProps, null )(Form);