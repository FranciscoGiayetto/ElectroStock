import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StatsCard from '../../components/statscard/StatsCard'; // Replace with the path to your StatsCard component
import './Informe.css'; // Replace with the path to your CSS file

function Informe() {
  return (
    <div style={{ paddingTop: '80px', position: 'relative' }}>
      {/* Add some padding-top to create space for the header */}
      <Container>
        <Row className="cards-row">
          <Col xs={12} sm={6} md={3}>
            <StatsCard />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <StatsCard />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <StatsCard />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <StatsCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Informe;
