import './form.css';
import checkbox from '../../img/checkbox.png';
import React, { useState } from 'react';
import CheckList from '../checkList/checkList';
import VideoCard from '../videoCard/videoCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadGames } from '../../actions'

function formCheck( id, form) {
    let check = document.getElementById(id)
    let formList = document.getElementById(form)
    if(check.checked) formList.style.display = 'flex';
    else formList.style.display = 'none';
}

const URL_FORM = 'http://localhost:3001/videogame';

export function Form(props) {

    const [ createdGame, setCreatedGame ] = useState([{genres:[]}])

    function clearchecks() {
        props.genres.map( genre => {
            const { id } = genre;
            let genres = document.getElementById('gf'+id);
                genres.checked = false;
            return true;
        })
        props.platforms.map( plat => {
            const { id } = plat;
            let genres = document.getElementById('pf'+id);
                genres.checked = false;
            return true;
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {};
        const genre = [];
        const genres = [];
        const plat = [];
        const platforms = [];

        for(let i=0 ; i < e.target.length ; i++) {
            data[e.target[i].id] = e.target[i].value
            
            if( e.target[i].id.includes('gf') && e.target[i].checked ) {
                genre.push(e.target[i].id.slice(2));
                genres.push( {id: e.target[i].id.slice(2), name: e.target[i].name} )
            }
            if( e.target[i].id.includes('pf') && e.target[i].checked ) {
                plat.push(e.target[i].id.slice(2));
                platforms.push( {id: e.target[i].id.slice(2), name: e.target[i].name} )
            }
        }
        //genre y plat son para mandar en data al back
        //el back necesita un array de strings con el nombre indicado
        data.genre = genre;
        data.plat = plat;

        //aqui evio data al back
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
                try{
                    //if(res.id.includes('-')){
                        const { id, image, name, rating } = res
                        document.getElementById('failedCreate').style.display = 'none'
                        document.getElementById('createdDiv').style.display = 'inline-block'
                        setCreatedGame([{
                            id,
                            image,
                            name,
                            rating,
                            genres: genres,
                            plat: plat
                        }])
                    //}
                }catch {
                    document.getElementById('failedCreate').style.display = 'block'
                    document.getElementById('createdDiv').style.display = 'none'
                }
            })

        //genres y plats son para mandar data al store, para que renderizen cuando se crean
        //el front necesita un array de objetos de la forma [{id,name}]
        data.genres = genres;
        data.platforms = platforms;
        
        //aqui recargo el store para tener disponible el nuevo juego
        props.loadGames(data)

        //aqui limpio los campos generos y plataformas tildados de la lista
        clearchecks()
    }

    return (
        <div className='divForm'>
            <Link to='/home'>
                <button className='Buton4'>Home</button>
            </Link>
            <div className='divFormZone'>
                <form className='form' onSubmit={handleSubmit} >
                    <label className='labelForm' htmlFor="name">
                        <span className='nombre'>Nombre</span>
                        <input className='formInputs' type="text" id='name' name='name'/>
                    </label>
                    <label className='labelForm' htmlFor="description">
                        <span className='nombre'>Descripcion</span>
                        <textarea className='formTextArea' id='description' name='description'></textarea>
                    </label>
                    <label className='labelForm' htmlFor="released">
                        <span className='nombre'>Fecha de Creación</span>
                        <input className='formInputs' type="text" id='released'name='released'/>
                    </label>
                    <label className='labelForm' htmlFor="rating">
                        <span className='nombre'>Puntuación</span>
                        <input className='formInputs' type="text" id='rating' name='rating'/>
                    </label>
                    <label className='labelForm' htmlFor="image">
                        <span className='nombre'>Imagen URL:</span>
                        <input className='formInputs' type="text" id='image' name='image'/>
                    </label>
                    <div className='checks'>
                        <div className='formFilter'>
                            <label htmlFor='genresFormBox' className='labelFormButton'>
                                <input 
                                    type="checkbox" 
                                    id="genresFormBox" 
                                    value="first_checkbox" 
                                    className='formInput'
                                    onChange={() => formCheck('genresFormBox', 'genresFormList')}
                                />
                                <img className='formCheckImg' src={checkbox} alt='icono de busqueda de filtro de generos' />
                                <span className='textFormButton'>Generos</span>
                            </label>
                            <CheckList items={props.genres} className='formList' id='genresFormList' type='gf'/>
                        </div>
                        <div className='formFilter'>
                            <label htmlFor='platformsFormBox' className='labelFormButton'>
                                <input 
                                    type="checkbox" 
                                    id="platformsFormBox" 
                                    value="first_checkbox" 
                                    className='formInput'
                                    onChange={() => formCheck('platformsFormBox', 'platformsFormList')}
                                />
                                <img className='formCheckImg' src={checkbox} alt='icono de busqueda de filtro de generos' />
                                <span className='textFormButton'>Plataformas</span>
                            </label>
                            <CheckList items={props.platforms} className='formList' id='platformsFormList' type='pf'/>
                        </div>
                    </div>
                    <input className='createFormButton' type="submit" value='Crear' />
                </form>
                <div id='createdDiv' className='createdDiv'>
                    <VideoCard pagedGames={createdGame}/>
                </div>
                <p id='failedCreate' className='failedCreate'>Creación de video juego fallida</p>
            </div>
        </div>
    )}

function mapStateToProps(state) {
    return {
        genres: state.genres,
        platforms: state.platforms
    }
}

export default connect( mapStateToProps, { loadGames } )(Form);