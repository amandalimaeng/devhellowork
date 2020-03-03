import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.png';




export default function Login({ history }) {
  const [username, setUsername] = useState('');
  const [tecnologias, setTecnologias] = useState('');

  async function handleListar(e) {
    e.preventDefault();
    history.push("/devs");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
      tecnologias,
    });
    

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="hello hork"/>
       
       
     
        <input 
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      





         <input 
          placeholder="Digite as tecnologias que você domina"
          value={tecnologias}
          onChange={e => setTecnologias(e.target.value)}
        />
        <button type="submit">Enviar</button>
        <button type="submit" onClick={handleListar}>Procurar desenvolvedores</button>
      </form>

      
    </div>
  );
}