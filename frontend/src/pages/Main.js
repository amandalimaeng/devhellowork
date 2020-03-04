
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./Main.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import Modal from "react-bootstrap/Modal";
import logo from '../assets/logo.png';


import "bootstrap/dist/css/bootstrap.min.css";

import api from "../services/api";


import mensagem from "../assets/message.png";
import like from "../assets/like.svg";
import itsamatch from "../assets/itsamatch.png";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: { user: match.params.id }
    });

    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  
  const [isOpen, setIsOpen] = React.useState(false);


  const showModal = () => {
    
    setIsOpen(true);
   
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="main-container">
      <Modal show={isOpen}>
        <Modal.Header>Envie uma mensagem para o desenvolvedor</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Digite o seu e-mail</Form.Label>
              <Form.Control type="email" placeholder="nome@empresa.com.br" />
              <Form.Text className="text-muted">
                Não se preocupe, não compartilharemos o seu e-mail com ninguém.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Digite a sua mensagem</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Fala aqui com o seu futuro DEV!"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hideModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>


      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong> <span>{user.user}</span>
                <p>{user.tecnologias}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={showModal}>
                  <img src={mensagem} alt="Enviar Mensagem" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Carregando Devs :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />

          <img className="avatar" src={matchDev.avatar} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
}

