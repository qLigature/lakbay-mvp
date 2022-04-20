import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

function RoomDetails() {

  const { user } = useContext(UserContext);
  const history = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);

  const { roomId } = useParams();

  useEffect(() => {
    console.log(roomId);

    fetch(`http://localhost:9000/rooms/${roomId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setName(data.name);
        setAddress(data.shortAddress);
        setPrice(data.price);
      });
  }, [roomId]);

  const addToCart = async () => {

    try {
      const response = await fetch('http://localhost:9000/bookings/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          roomId: roomId
        })
      });
      if (!response.ok) {
        throw new Error(response.status);
      }

      Swal.fire({
        title: "Room booked!",
        icon: "success",
        text: "You have successfully added this room to your booking!"
      });

      history("/bookings");
    } catch (error) {

      Swal.fire({
        title: "Booking is Full",
        icon: "error",
        text: "Please clear your booking first"
      });

    }
  };

  let checkoutBtn;

  if (user.id !== null && user.isAdmin === true) {
    checkoutBtn = <Link className="btn btn-danger" to="/login">Log in as User to Book</Link>;
  } else if (user.id !== null) {
    checkoutBtn = <Button variant="primary" onClick={addToCart}>Book this Room</Button>;
  } else {
    checkoutBtn = <Link className="btn btn-danger" to="/login">Log In to Book</Link>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center">Room Details</h1>
      <Row className="py-5 mb-5">
        <Col lg={{ span: 7, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>

              <Card.Subtitle>Address</Card.Subtitle>
              <Card.Text>{address}</Card.Text>

              <Card.Subtitle>Price</Card.Subtitle>
              <Card.Text>PHP {price}</Card.Text>

              {checkoutBtn}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

export default RoomDetails;