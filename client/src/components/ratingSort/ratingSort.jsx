import './ratingSort.css';
import React from 'react';
import { connect } from 'react-redux';
import { ratingSort } from '../../actions';

export function RatingSort(props) {

    function whoSelected() {
        let ratingSelected = document.querySelector('input[name="rating"]:checked').value
        props.ratingSort(ratingSelected)
    }

    return (
        <div className='ratingSort'>
            <h4 className='ratingTitle'>Valoración</h4>
            <div className='ratinghOptions'>
                <form>
                    <fieldset className='ratingRadios' >
                        <label className='rRadio'>
                            <input type="radio" name="rating" value="higher" onClick={whoSelected}/>
                            <span>Mayor</span>
                        </label>
                        <label className='rRadio'>
                            <input type="radio" name="rating" value="lower" onClick={whoSelected}/>
                            <span>Menor</span>
                        </label>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default connect( null, { ratingSort } )( RatingSort );