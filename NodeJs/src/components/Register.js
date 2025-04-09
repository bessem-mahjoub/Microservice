import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [Matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3000/register', {
        firstName,
        lastName,
        phoneNumber,
        email,
        Matricule,
        password,
      });

      if (result.data.success) {
        navigate('/login');
      } else {
        alert('An error occurred during registration');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

 

  return (
    <div className='background'>
      <div className='registerPage'>
        <div className='registerContent'>
          <div className='registerText'>
            <h1>Inscrivez-vous pour nous rejoindre</h1>
          </div>
          <div className='registerFormContainer'>
            <form className='styledForm' onSubmit={handleSubmit}>
              <input
                className='styledInput'
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className='styledInput'
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className='styledInput'
                type="tel"
                placeholder="Numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <input
                className='styledInput'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className='styledInput'
                type="text"
                placeholder="Matricule(pour les administrateurs)"
                value={Matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />
              <input
                className='styledInput'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='styledButton' type="submit">S'inscrire</button>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
