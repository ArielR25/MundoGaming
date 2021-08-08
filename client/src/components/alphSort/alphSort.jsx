import './alphSort.css';
import React from 'react';
import { connect } from 'react-redux';
import { alphSort } from '../../actions';

export function AlphSort(props) {
    
    function whoSelected() {
        let alphSelected = document.querySelector('input[name="alph"]:checked').value
        props.alphSort(alphSelected)
    }
    
    return (
        <div className='alphSort'>
            <h4 className='h4Titles'>Alfabeticamente</h4>
            <form>
                <fieldset className='alphRadios' >
                    <label className='aRadio'>
                        <input type="radio" name="alph" value="asc" onClick={whoSelected} />
                        <span className='radioSpan'>A - Z</span>
                    </label>
                    <label className='aRadio'>
                        <input type="radio" name="alph" value="desc" onClick={whoSelected} />
                        <span className='radioSpan'>Z - A</span>
                    </label>
                </fieldset>
            </form>
        </div>
    )
}

export default connect( null, { alphSort } )(AlphSort);