import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

function AdminCard() {
  return (
    <Card>
      
      <Card.Body>
        <Card.Title>Bienvenido a ScrumStock</Card.Title>
        <Card.Text>
          Es Profesor o Administrador del Sistema? Acceda aqui:
        </Card.Text>
        <Button href='https://stock-villada-admin-production.up.railway.app/admin/' variant="primary">Ir al Panel de Administrador</Button>
      </Card.Body>
    </Card>
  );
}

export default AdminCard;