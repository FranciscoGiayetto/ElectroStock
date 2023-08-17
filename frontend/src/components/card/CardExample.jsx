import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardExample.css';
import { Link } from 'react-router-dom';
export default function CardExample(props) {
  const { id, name, title, image, text } = props;
  return (
    <Card className="mx-auto mb-3" style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        
      </Card.Body> 
      <Link to={`/detalleProducto/${id}`}>
      
        <div className="image-container">
          <Card.Img 
            variant="top"
            src={image}
            className="imagencss"
            style={{  maxHeight: '70px auto', width: '50%', display: 'block' }}
          />
          <Button variant="primary" className="my-button">+</Button>
        </div>
      </Link>    
       
    </Card>
  );
}
 