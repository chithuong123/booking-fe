import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { fetchBookingsRequest } from '../actions/bookingActions';
import 'bootstrap/dist/css/bootstrap.min.css';

function Booking() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingsRequest());
    console.log(dispatch(fetchBookingsRequest()));

  }, [dispatch]);

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
