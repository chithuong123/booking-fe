import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from 'jwt-decode';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Container, Card, Button, Modal, Form, Carousel, Spinner, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ServiceDetail() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [email, setEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        setService(response.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin dịch vụ.');
        setLoading(false);
      }
    };

    fetchService();

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    }
  }, [serviceId]);

  const handleBooking = async () => {
    const bookingData = {
      serviceId,
      email,
      booking_date: selectedDate,
      price: service?.price,
    };

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Đặt lịch thành công!');
      setShowModal(false);
    } catch (err) {
      console.error('Lỗi khi đặt lịch:', err);
    }
  };

  const buildImageUrl = (imagePath) => `https://res.cloudinary.com/dyilvah0c/${imagePath}`;

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải thông tin dịch vụ...</p>
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
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Row>
            <Col md={6}>
              {service.images && service.images.length > 0 && (
                <div className="my-4">
                  <h4 className="text-secondary">Hình ảnh</h4>
                  <CloudinaryContext cloudName="dyilvah0c">
                    <Carousel>
                      {service.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <Image
                            publicId={buildImageUrl(image)}
                            className="d-block w-100 rounded"
                            style={{ width: '600px', height: '400px', objectFit: 'cover' }}
                          >
                            <Transformation width="600" height="400" crop="fill" gravity="auto" />
                          </Image>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </CloudinaryContext>
                </div>
              )}
            </Col>
            <Col md={6}>
              <Card.Title className="text-primary">{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>

              <Form.Group className="mb-3">
                <Form.Label>Ngày đặt</Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="form-control"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá dịch vụ</Form.Label>
                <Form.Control type="number" value={service.price} readOnly />
              </Form.Group>

              <Button variant="primary" className="mt-3" onClick={() => setShowModal(true)}>
                Đặt ngay
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn đặt dịch vụ này?</p>
          <p>
            <strong>Dịch vụ:</strong> {service.name}
          </p>
          <p>
            <strong>Ngày đặt:</strong> {selectedDate.toDateString()}
          </p>
          <p>
            <strong>Giá:</strong> ${service.price}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ServiceDetail;