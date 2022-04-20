import React, { Fragment, useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import defaultPic from '../img/default-pic.png';

function Profile(props) {

  const { profileData, fetchProfile } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
    setAddress(profileData.address);
    setPhoneNum(profileData.phoneNum);
    setEmail(profileData.email);
  }, [profileData]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    (profileData === {} ? <div>Loading...</div> :
      <>
        <h1 className="p-3 mt-3 text-center">My Profile</h1>
        <div className="d-flex">
          <img
            className="me-5 my-2"
            src={defaultPic}
            alt="Lakbay Logo"
            height="200px"
            width="200px"
          ></img>
          <div className="mt-2">
            <h3 className="pt-3">Name: {firstName} {lastName}</h3>
            <h3>Address: {address}</h3>
            <h3>Phone Number: {phoneNum}</h3>
            <h3>Email Address: {email}</h3>
          </div>
        </div>
        <hr />
        <h1 className="p-3 text-center">My Orders</h1>
        <h3 className="p-3 text-center">Coming soon...</h3>
      </>)
  );
}

export default Profile;
