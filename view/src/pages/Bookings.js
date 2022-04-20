import React, { Fragment, useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Booking() {

  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [price, setPrice] = useState(0);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:9000/bookings', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      // console.log('response: ', data);
      setBookingData(data.reservations);
      setPrice(data.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  // Function that clears the entire booking
  const clearBooking = async () => {
    try {
      const response = await fetch('http://localhost:9000/bookings/clear', {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      Swal.fire({
        title: "Booking cleared!",
        icon: "success",
        text: "You have successfully cleared your booking!"
      });
      navigate('/profile');

    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Something went wrong!"
      });
    }
  };

  const confirmBooking = async () => {
    try {
      const response = await fetch('http://localhost:9000/bookings/confirm', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(response.status);
      }

      Swal.fire(
        'Confirmed!',
        'Your booking has been confirmed.',
        'success'
      );
      navigate('/profile');

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {

    fetchBookings();

    if (!bookingData || bookingData.length === 0) return;

    // console.log(bookingData);

    const bookingsArr = bookingData.map(reservation => {
      return (
        <tr key={reservation.roomId}>
          <td>{reservation.name}</td>
          <td>{reservation.shortAddress}</td>
          <td>PHP {reservation.subtotal}</td>
        </tr>
      );
    });
    setReservations(bookingsArr);

  }, [bookingData]);

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Fragment>

      <div className="text-center my-4">
        <h2>Your Booking</h2>
      </div>

      {!bookingData || bookingData.length === 0 ? (
        <div className="text-center my-4">
          <h3>No Bookings...</h3>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="bg-dark text-white">
              <tr>
                <th>Name</th>
                <th>Short Address</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {reservations}
            </tbody>
          </Table>
          <h4 className="p-3" style={{ textAlign: 'right' }}>Total: PHP {price}</h4>

          {/* Button that when clicked, clears the booking */}
          <Button
            variant="danger"
            className="mx-auto mb-2"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  clearBooking();
                }
              });
            }}
          >Clear Booking</Button>
          <br />

          <Button variant="primary" className="mx-auto mb-2" onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, confirm it!'
            }).then((result) => {
              if (result.value) {
                confirmBooking();
              }
            });
          }}>Confirm Booking</Button>
        </>

      )
      }

    </Fragment >
  );
}

export default Booking;