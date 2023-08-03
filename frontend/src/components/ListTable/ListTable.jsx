import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ListTable.css'

export default function ListGroupExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <ListGroup className='listTable' variant="flush">
        <ListGroup.Item>Mail: franco.moralesdemaria@gmail.com</ListGroup.Item>
        <ListGroup.Item>Usuario Franco Morales</ListGroup.Item>
        <ListGroup.Item>Contraseña *************</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}