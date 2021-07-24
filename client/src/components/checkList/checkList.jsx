import './checkList.css';
import React from 'react';

export function CheckList({ items, id, type }){

    return (
        <fieldset className='checkList' id={id}>
            {items.map( item => {
                const { id, name } = item;
                return (
                    
                        <label htmlFor={type+id} key={type+id} className='checkListLabel'>
                            <input id={type+id} type="checkbox" name={name} />
                            <span className='checkListSpan'>{name}</span>
                        </label>
                    
                    
                )
            })}
        </fieldset>
    )
}

export default CheckList;