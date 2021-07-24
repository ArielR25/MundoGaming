import './home.css';
import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cleanFilters } from '../../actions';
import Search from '../search/search';
import GenreFilter from '../genre_Filter/genre_Filter';
import OriginFilter from '../origin_Filter/origin_Filter';
import AlphSort from '../alphSort/alphSort';
import RatingSort from '../ratingSort/ratingSort';
import View from '../view/view';
import Details from '../details/details';
import Form from '../form/form';

export function Home (props) {

    function cleanFiltersFunction() {
        props.cleanFilters();
    }

    return (
    <div className='home'>

        {/* zona de contenido, aqui se ven los video juegos */}
        <div className='mainView'>
                <h1 className='mainTitle' >GAMING</h1>
                <Route exact path='/home' component={View}/>
                <Route path='/home/details' component={Details}/>
                <Route path='/home/form' component={Form}/>
        </div>

        {/* menú de control de la página, aqui se realizan las busquedas, filtrados y ordenamientos */}
        <div className='pageControl'>
                <div className='search'>
                    <h3 className='rightTitles'>Buscar</h3>
                    <Route path='/home' component={Search}/>
                </div>
                <div className='filters'>
                    <h3 className='rightTitles'>Filtros</h3>
                    <div className='onlyFilters'>
                        <Route path='/home' component={GenreFilter}/>
                        <Route path='/home' component={OriginFilter}/>
                    </div>
                    <button className='homeButton' onClick={cleanFiltersFunction}>Limpiar filtros</button>
                </div>
                <div className='sort'>
                    <h3 className='rightTitles'>Ordenar</h3>
                    <div className='onlyRadios'>
                        <Route path='/home' component={AlphSort}/>
                        <Route path='/home' component={RatingSort}/>
                    </div>
                </div>
                <div className='create'>
                    <h3 className='rightTitles'>Crear</h3>
                    <Link to='/home/form'>
                        <button className='homeButton'>Crear</button>
                    </Link>
                </div>
                <div className='copyright'>
                </div>
                
        </div>
    </div>
    )
}
export default connect( null, { cleanFilters })(Home);