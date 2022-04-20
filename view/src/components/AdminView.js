import React, { Fragment, useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function AdminView(props) {

  const { roomData, fetchData } = props;

  const [roomId, setroomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [shortAddress, setAddress] = useState("");
  const [price, setPrice] = useState(0);

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);

  const openEdit = (roomId) => {
    fetch(`http://localhost:9000/admin/rooms/${roomId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {

        setroomId(data._id);
        setName(data.name);
        setAddress(data.shortAddress);
        setPrice(data.price);
      });

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setAddress("");
    setPrice(0);
  };

  const addRoom = (e) => {

    e.preventDefault();
    fetch(`http://localhost:9000/admin/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        shortAddress: shortAddress,
        price: price
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {

        fetchData();

        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Room successfully added."
        });

        setName("");
        setAddress("");
        setPrice(0);

        closeAdd();

      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Something went wrong. Please try again."
        });
      });
  };

  const editRoom = (e, roomId) => {

    e.preventDefault();
    fetch(`http://localhost:9000/admin/rooms/${roomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        shortAddress: shortAddress,
        price: price
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data);
        fetchData();

        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Room details successfully updated."
        });

        closeEdit();
      })
      .catch(error => {
        console.log(error);
        fetchData();
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Please try again."
        });
      });
  };



  // Map through the courses received from the parent component (course page)
  // Re-renders the table whenever the "coursesData" is updated by adding, editing and deleting a course

  const archiveToggle = (roomId, isAvailable) => {

    console.log(!isAvailable);

    fetch(`http://localhost:9000/admin/rooms/${roomId}/toggle`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data) {
          console.log(data);

          fetchData();

          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Room is now unavailable"
          });

        } else {

          fetchData();

          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again."
          });

        }
      });
  };

  const unarchiveToggle = (roomId, isAvailable) => {

    console.log(!isAvailable);

    fetch(`http://localhost:9000/admin/rooms/${roomId}/toggle`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data) {
          console.log(data);

          fetchData();

          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Room is now available"
          });

        } else {

          fetchData();

          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again."
          });

        }
      });
  };

  useEffect(() => {

    const roomsArr = roomData.map(room => {

      return (

        <tr key={room._id}>
          <td>{room.name}</td>
          <td>{room.shortAddress}</td>
          <td>PHP {room.price}</td>
          <td>
            {/* 
							- If the course's "isAvailable" field is "true" displays "available"
							- Else if the course's "isAvailable" field is "false" displays "unavailable"
						*/}
            {room.isAvailable
              ? <span>Available</span>
              : <span>Unavailable</span>
            }
          </td>
          <td>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openEdit(room._id)}
            >
              Update
            </Button>
            {/* 
							- Display a red "Disable" button if course is "active"
							- Else display a green "Enable" button if course is "inactive"
						*/}
            {room.isAvailable
              ?
              <Button
                variant="danger"
                size="sm"
                className="ms-3"
                onClick={() => archiveToggle(room._id, room.isAvailable)}
              >
                Disable
              </Button>
              :
              <Button
                variant="success"
                size="sm"
                className="ms-3"
                onClick={() => unarchiveToggle(room._id, room.isAvailable)}
              >
                Enable
              </Button>
            }
          </td>
        </tr>

      );

    });

    // Set the "courses" state with the table rows returned by the map function
    // Renders table row elements inside the table via this "AdminView" return statement below
    setRooms(roomsArr);

  }, [roomData, fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>

      <div className="text-center my-4">
        <h2>Room Dashboard</h2>
        <div className="d-flex mt-3 justify-content-center">
          <Button variant="primary" onClick={openAdd}>Add New Room Listing</Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th>Name</th>
            <th>Short Address</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms}
        </tbody>
      </Table>

      {/*ADD MODAL*/}
      <Modal show={showAdd} onHide={closeAdd}>
        <Form onSubmit={e => addRoom(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="courseName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="courseshortAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={shortAddress} onChange={e => setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="coursePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAdd}>Close</Button>
            <Button variant="success" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/*EDIT MODAL*/}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={e => editRoom(e, roomId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Room Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="courseName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="courseshortAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={shortAddress} onChange={e => setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="coursePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>Close</Button>
            <Button variant="success" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </Fragment>
  );
}

export default AdminView;