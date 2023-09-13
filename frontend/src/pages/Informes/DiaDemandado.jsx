import React from 'react';
import Card from 'react-bootstrap/Card';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

const DiaDemandado = ({ title, subtitle }) => {
  return (
    <Card style={{ borderRadius: '15px' }}>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            <PollOutlinedIcon fontSize="large" />
          </div>
          <div>
            <h5>{title}</h5>
            <p className="mb-0">{subtitle}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DiaDemandado;
