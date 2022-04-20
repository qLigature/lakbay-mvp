import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';
import UserContext from './../UserContext';

function Rooms() {

  const { user } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);

  // let CourseCards = courses.map( (course) => {
  // 	return <Course key={course.id} course={course}/>
  // })

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:9000/rooms');
      const data = await response.json();
      console.log(data);
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data from database
  useEffect(() => {


    fetchRooms();

  }, []);

  return (
    <Container className="p-4">
      {(user.isAdmin === true) ?
        <AdminView roomData={rooms} fetchData={fetchRooms} />

        :
        <UserView roomData={rooms} />
      }
    </Container>
  );
}

export default Rooms;