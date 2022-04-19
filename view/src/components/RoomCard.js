/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/RoomCard.css';

export default function RoomCard({ roomProps }) {
  const { src, title, description, price, id } = roomProps;

  return (
    <Row className="my-3">
      <Col xs={12} md={6}>
        <div className="roomCard d-flex flex-column">
          <img src={src} alt="" />
          <div className="roomCard_Text p-5">
            <h2>{title}</h2>
            <h5>{description}</h5>
            <h3>PHP {price}</h3>
            <Button variant="danger" as={Link} to={`/rooms/${id}`}>
              See Details
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
