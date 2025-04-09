import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NavbarUserN.css';
import logo from '../assets/aa.png';

const NavbarUserN = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setExpanded(false);
    navigate('/login');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar-custom">
      <Navbar.Brand href="/login">
        <img src={logo} alt="Logo" className="logo-image" />
      </Navbar.Brand>
     
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
         
          <Nav.Link onClick={() => { setExpanded(false); navigate('/register'); }}>S'inscrire</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div className="login-btn-container">
        <Button className="login-btn" onClick={handleLogin}>
          Connecter
        </Button>
      </div>
    </Navbar>
  );
};

export default NavbarUserN;
