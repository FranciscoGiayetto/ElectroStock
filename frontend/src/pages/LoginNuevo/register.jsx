import { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login.css';
import Logo from './logo';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [secretTokenField, setSecretTokenField] = useState('');
    const secretToken = "genari";
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
        setSecretTokenField("")
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (secretTokenField === secretToken){
        const { error } = await register(username, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    }
    else{
        alert("Token Secreto Incorrecto");
       
    }
    };

    return (
        <section>
            
            <Container>
        <Row>
          
          <Col xs={12} className="text-xs-center">
            <div className='top-left-image'><Logo/></div>
          
          </Col>
          <Col className="centered-form">
            <div className="login-container">
              <p className="login-heading"><b>Ingresá tus datos para<br/>registrarte</b></p>
              <div className="login-form">
              <Form onSubmit={handleSubmit}>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
        <Form.Label className='color'>Username</Form.Label>
        <Form.Control
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text" placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='color'>Contraseña*</Form.Label>
        <Form.Control 
         type="password"
         id="password"
         name="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='color'>Repetir Contraseña*</Form.Label>
        <Form.Control 
         type="password"
         id="password"
         name="password"
         value={password2}
         onChange={(e) => setPassword2(e.target.value)}
        placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='color'>Token Secreto*</Form.Label>
        <Form.Control 
         type="password"
         id="password"
         name="password"
         value={secretTokenField}
         onChange={(e) => setSecretTokenField(e.target.value)}
        placeholder="" style={{ backgroundColor: '#EBEBEB', border: '1px solid #2E5266'}} className="rounded-3 shadow form-control-lg" />
      </Form.Group>
      <div>
         
          <div className='text-center'>
              <Button className='text-center rounded-5 ' size='lg' style={{ backgroundColor: '#58A4B0', border: '1px solid #58A4B0'}} variant="primary" type="submit">
                Crear Cuenta
          </Button>
        </div>
      </div>
    </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
        </section>






    );
}

export default Register;