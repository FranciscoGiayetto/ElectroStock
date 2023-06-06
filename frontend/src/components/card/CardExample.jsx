import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardExample.css';
export default function CardExample(props) {
  const { id, name, title, image, text } = props;
  return (
    <Card className="mx-auto mb-3" style={{ width: '18rem' }}>
      <div className="image-container">
      <Card.Img 
        variant="top"
        src={"/imagen.jpeg"}
        className="imagencss"
        style={{ margin: '10px auto', maxHeight: '200px', width: '90%', display: 'block' }}
      />
        <Button variant="primary" className="my-button">+</Button>
      </div>
      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        
      </Card.Body>
    </Card>
  );
}

 