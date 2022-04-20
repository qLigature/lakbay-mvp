import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import '../css/Register.css';

function Register() {
  const { user } = useContext(UserContext);

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
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
        setPassword2('');

        history('/login');
      })
      .catch((err) => {
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
    if (
      firstName !== '' &&
      lastName !== '' &&
      address !== '' &&
      mobileNo !== '' &&
      email !== '' &&
      password !== '' &&
      password2 !== '' &&
      password === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, mobileNo, email, password, password2]);

  return user.id !== null ? (
    <Navigate to="/courses" />
  ) : (
    <div className="regCard col-md-6 mx-auto">
      <Form onSubmit={(e) => registerUser(e)}>
        <h2 className="px-3 mt-3">Create an account</h2>

        <Form.Group className="forms" controlId="firstName">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="lastName">
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="address">
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="mobileNo">
          <Form.Control
            type="text"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="userEmail">
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="password1">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="forms" controlId="password2">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>

        {isActive ? (
          <Button
            className="m-3 mt-4 mb-4 px-5 rounded-pill btn-lg"
            variant="danger"
            type="submit"
            id="submitBtn"
          >
            Sign Up
          </Button>
        ) : (
          <Button
            className="m-3 mt-4 mb-4 px-5 rounded-pill btn-lg"
            variant="secondary"
            type="submit"
            id="submitBtn"
            disabled
          >
            Sign Up
          </Button>
        )}
      </Form>
      <p className="px-5 mx-4 text-center">Already have an account?
        <Link className="mx-2" to="/login" style={{ textDecoration: 'underline' }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
