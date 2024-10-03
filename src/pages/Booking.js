import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading bookings...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Booking Page</h1>
      {bookings.length > 0 ? (
        <Row>
          {bookings.map((booking) => (
            <Col md={4} key={booking.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{booking.service.name}</Card.Title>
                  <Card.Text>{booking.service.description}</Card.Text>
                  <Card.Text><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</Card.Text>
                  <Card.Text><strong>Price:</strong> ${booking.totalPrice}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No bookings found.</p>
      )}
    </Container>
  );
}

export default Booking;