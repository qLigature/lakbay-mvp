import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import roomsData from '../data/roomsData';

export default function RoomView() {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const { roomId } = useParams();

  const book = (roomId) => {
    roomsData
      .findById(roomId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 10, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>{src}</Card.Title>

              <Card.Subtitle>{title}</Card.Subtitle>

              <Card.Subtitle>Description</Card.Subtitle>
              <Card.Text>{description}</Card.Text>

              <Card.Subtitle>Price</Card.Subtitle>
              <Card.Text>Php {price}</Card.Text>

              <Card.Subtitle>Available Time</Card.Subtitle>
              <Card.Text>12:00 NN to 10:00 AM</Card.Text>

              <Button variant="danger" onClick={() => book}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
