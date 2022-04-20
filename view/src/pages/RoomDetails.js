import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


function RoomDetails() {

  const { user } = useContext(UserContext);

  // allows us to gain access to methods that will allow us to redirect the user to a different page after enrolling a course
  const history = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);

  // useParams hook allows us to retrieve the courseId passed via the URL
  const { roomId } = useParams();

  // const enroll = (courseId) => {
  //   fetch('http://localhost:4000/users/enroll', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     },
  //     body: JSON.stringify({
  //       courseId: courseId
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);

  //       if (data === true) {

  //         Swal.fire({
  //           title: "Enrolled Successfully!",
  //           icon: "success",
  //           text: "You have successfully enrolled in this course"
  //         });

  //         history("/courses");
  //         // v5: history.push("/endpoint")

  //       } else {

  //         Swal.fire({
  //           title: "Something went wrong",
  //           icon: "error",
  //           text: "Please contact admin"
  //         });
  //       }
  //     });
  // };

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

  return (
    <Container className="mt-5">
      <h1 className="text-center">Product Details</h1>
      <Row className="py-5 mb-5">
        <Col lg={{ span: 7, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>

              <Card.Subtitle>Address</Card.Subtitle>
              <Card.Text>{address}</Card.Text>

              <Card.Subtitle>Price</Card.Subtitle>
              <Card.Text>PHP {price}</Card.Text>

              {user.id !== null ?
                <Button variant="primary">Add to Cart</Button>
                :

                <Link className="btn btn-danger" to="/login">Log In to Book</Link>
              }

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

export default RoomDetails;