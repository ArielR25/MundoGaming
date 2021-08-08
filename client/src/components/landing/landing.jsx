import React, { useEffect } from 'react';
import './landing.css'
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { loadGames, loadGenres, loadPlatforms } from '../../actions';

/* async function sound() {
  let audio = new Audio('C:/Users/Ariel/Documents/informatica/Henry/cursado/PI/PI-Videogames/client/src/audio/insertCoin.wav')
  console.log("aidudooooooo")
  console.log(audio)
  audio.play()
} */

export function Landing() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadGames());
    dispatch(loadGenres());
    dispatch(loadPlatforms());
  })
  
  return (
    <div className='mainDiv'>
        <Link to='/home' >
            <button id='boton' className='button'  /* onClick={sound} */ >Insert Coin</button>
        </Link>
    </div>
  )
};

export default Landing;