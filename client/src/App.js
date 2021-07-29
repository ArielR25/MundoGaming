import './App.css';
import React from 'react';
import { Route } from 'react-router';
import Landing from './components/landing/landing';
import Home from './components/home/home';

function App() {
  return (
    <div className="App">
      
      {/* landing page, presentacion del sitio */}
      <Route exact path='/' component={Landing}/>

      {/* todo el contenido de la página */}
      <Route path='/home' component ={Home}/>
      
    </div>
  );
}

export default App;
