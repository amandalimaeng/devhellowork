import React from 'react';
import './App.css';



import Routes from './routes';

function App() {

 

  return (
    <div className="app">
      <nav>
  <ul>
    <li>
      <a href="/">Cadastrar-se</a>
    </li>
    <li>
      <a href="/devs">Listar Devs</a>
    </li>
    <li>
      <a href="#">Contato</a>
    </li>
  
  </ul>
</nav>

      
      <Routes />
    </div>
  );
}

export default App;
