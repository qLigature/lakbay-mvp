import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Logout() {

  const { setUser } = useContext(UserContext);

  // clears the localStorage of the user's information
  sessionStorage.clear();
  Swal.fire({
    title: 'Logout Successful',
    icon: 'success',
    text: 'Have a safe trip!'
  });

  useEffect(() => {
    // set the user state back to its original value
    setUser({ id: null, isAdmin: null });

  }, []);

  return (
    <Navigate to='/' />
  );
}