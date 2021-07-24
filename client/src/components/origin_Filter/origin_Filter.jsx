import './origin_Filter.css';
import React from 'react';
import checkbox from '../../img/checkbox.png';
import CheckList from '../checkList/checkList';
import { connect } from 'react-redux';
import { originFilter } from '../../actions';

function originCheck () {
    let check = document.getElementById('originBox')
    let originList = document.getElementById('originList')
    if(check.checked) originList.style.display = 'flex';
    else originList.style.display = 'none';
}

const origin = [{ id:1, name:'Local' },{ id:2, name:'API' }]

export function Origin_Filter (props) {

    function originCheckLooks() {
        
        const onlyLocal = [];
        let local = document.getElementById('o1');
        let api = document.getElementById('o2');
        if(local.checked) {
            onlyLocal.push('local')
            local.checked = false;
        };
        if(api.checked) {
            onlyLocal.push('api')
            api.checked = false;
        };
        props.originFilter(onlyLocal)
    } 
    
    return (
        <div className='originFilter'>
            <label htmlFor='originBox' className='originLabel'>
                <input 
                type="checkbox" 
                id="originBox" 
                value="first_checkbox" 
                className='originInput'
                onChange={() => originCheck()}
                />
                <img className='originCheckImg' src={checkbox} alt='icono de busqueda de filtro de origen' />
                Origen
            </label>
            <CheckList items={origin} id='originList' type='o'/>
            <button id='originButton' className='originButton' onClick={originCheckLooks}>Filtrar</button>
        </div>
    )
}

export default connect(null, { originFilter })(Origin_Filter);
