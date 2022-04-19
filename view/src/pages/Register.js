import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


function Register() {

  const { user } = useContext(UserContext);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [password2, setPassword2] = useState('');
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNum: mobileNo,
        email: email,
        password: password
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

        Swal.fire({
          title: 'Registration successful',
          icon: 'success',
          text: 'Welcome to Lakbay!'
        });

        // clear input fields
        setFirstName('');
        setLastName('');
        setAddress('');
        setMobileNo('');
        setEmail('');
        setPassword('');

        history("/login");

      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Something went wrong',
          icon: 'error',
          text: 'Please try again'
        });
      });

    // alert('Thank you for registering!');
  }

  useEffect(() => {

    if (firstName !== '' && lastName !== '' && address !== '' && mobileNo !== '' && email !== '' && password !== '') {
      setIsActive(true);

    } else {
      setIsActive(false);
    }

  }, [firstName, lastName, mobileNo, email, password]);

  return (

    (user.id !== null) ?
      <Navigate to="/courses" />
      :

      <Form onSubmit={e => registerUser(e)}>
        <h1>Register</h1>

        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input your First Name here"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input your Last Name here"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input your Address here"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="mobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input your Mobile Number here"
            value={mobileNo}
            onChange={e => setMobileNo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="userEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

        </Form.Group>

        <Form.Group controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Input your password here"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/*conditionally rendering submit button based on isActive state*/}

        {isActive ?
          <Button variant="primary" type="submit" id="submitBtn" className="mt-3 mb-3">
            Submit
          </Button>
          :
          <Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-3" disabled>
            Submit
          </Button>
        }


      </Form>

  );
}

export default Register;