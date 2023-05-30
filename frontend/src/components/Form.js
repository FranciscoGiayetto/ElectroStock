import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/styles/Login.css'


export function Logo() {
  return (
    <div style={{ display: "block", width: 300, padding: 20 }}>
      <img src={require('../assets/img-prod/logo.png')} className='img-fluid logo' alt='...' />
    </div>
  );
}


export function Login() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='color'>Email address*</Form.Label>
        <Form.Control type="email" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='color'>Password*</Form.Label>
        <Form.Control type="password" placeholder="" />
      </Form.Group>
      <div>
          <div className='text-center'>
              <a href="#" className="link-dark text-decoration-none">Olvidaste tu contraseña?</a>
            </div>
          <div className='text-center'>
              <Button className='text-center' variant="primary" type="submit">
                Ingresar
          </Button>
        </div>
      </div>
    </Form>
  );
}

