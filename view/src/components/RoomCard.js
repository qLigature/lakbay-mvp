import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RoomCard({ roomProps }) {

  console.log(roomProps);
  // expected result is coursesData[0]
  console.log(typeof roomProps);
  // result: object

  const { name, shortAddress, price, _id } = roomProps;

  return (
    <Card>
      <Card.Body className="align-items-stretch">
        <Card.Title className="h1 pb-3">{name}</Card.Title>
        <Card.Subtitle>Address:</Card.Subtitle>
        <Card.Text>{shortAddress}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PHP {price}</Card.Text>
        <Button variant="primary" as={Link} to={`/rooms/${_id}`}>See Details</Button>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;