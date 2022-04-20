import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// import Course from '../pages/Courses';
import RoomCard from '../components/RoomCard';

function UserView({ roomData }) {
  // console.log(courseData) receives as an array
  const [rooms, setRooms] = useState([]);



  let roomsArr;

  useEffect(() => {
    const roomsArr = roomData.map((room) => {
      if (room.isAvailable === true) {
        return (
          <Col xs={12} md={4} key={room.id}>
            <RoomCard key={room._id} roomProps={room} />
          </Col>
        );
      } else {
        return null;
      }

    });

    setRooms(roomsArr);

  }, [roomData]);



  return (
    <Container>
      <h1>Rooms</h1>
      <Row className="mt-3 mb-3">
        {rooms}
      </Row>
    </Container>
  );
}

export default UserView;
