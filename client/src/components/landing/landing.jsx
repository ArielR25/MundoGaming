import React, { useEffect } from 'react';
import './landing.css'
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { loadGames, loadGenres, loadPlatforms } from '../../actions';


/* function sound() {
  console.log("aidudooooooo")
    let audio = new Audio('insertCoin')
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
            <button className='button' /* onClick={sound} */>Insert Coin</button>
        </Link>
    </div>
  )
};

export default Landing;