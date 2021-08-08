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
            <h4 className='h4Titles'>Valoración</h4>
            <form className='ratingForm'>
                <fieldset className='ratingRadios' >
                    <label className='rRadio'>
                        <input type="radio" name="rating" value="higher" onClick={whoSelected}/>
                        <span class='radioSpan'>Mayor</span>
                    </label>
                    <label className='rRadio'>
                        <input type="radio" name="rating" value="lower" onClick={whoSelected}/>
                        <span class='radioSpan'>Menor</span>
                    </label>
                </fieldset>
            </form>
        </div>
    )
}

export default connect( null, { ratingSort } )( RatingSort );