import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { Container, Card, Button, Modal, Form, Carousel, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { fetchServiceDetailRequest } from '../actions/serviceActions'; // Action lấy chi tiết dịch vụ
import { createBookingRequest } from '../actions/bookingActions'; // Action đặt dịch vụ
import 'bootstrap/dist/css/bootstrap.min.css';

function ServiceDetail() {
  const { serviceId } = useParams(); // Lấy serviceId từ URL
  const dispatch = useDispatch();

  // Trích xuất dữ liệu từ Redux store
  const { serviceDetail, loading, error } = useSelector((state) => state.service);

  const [selectedDate, setSelectedDate] = useState(new Date()); // Lưu ngày đặt
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
  const [email, setEmail] = useState(null); // Lưu email người dùng

  // Lấy email từ token JWT khi component được mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email); // Lưu email từ token vào state
    }
  }, []);

  // Gửi action để lấy chi tiết dịch vụ khi component được mount
  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceDetailRequest(serviceId));
    }
  }, [dispatch, serviceId]); // Chỉ phụ thuộc vào dispatch và serviceId

  // Hàm xử lý đặt dịch vụ
  const handleBooking = () => {
    const bookingData = {
      serviceId,
      email, // Gửi email cùng với dữ liệu đặt dịch vụ
      booking_date: selectedDate,
      price: serviceDetail?.price,
    };
    dispatch(createBookingRequest(bookingData)); // Gửi action đặt dịch vụ
    setShowModal(false); // Đóng modal sau khi đặt
  };

  // Hàm xây dựng URL hình ảnh
  const buildImageUrl = (imagePath) => `https://res.cloudinary.com/dyilvah0c/${imagePath}`;

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải thông tin dịch vụ...</p>
      </Container>
    );
  }

  // Hiển thị khi có lỗi
  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Hiển thị chi tiết dịch vụ
  return (
    <Container className="my-4">
      {serviceDetail && (
        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
          <Card.Body>
            <Row>
              <Col md={6}>
                {serviceDetail.images && serviceDetail.images.length > 0 && (
                  <div className="my-4">
                    <h4 className="text-secondary">Hình ảnh</h4>
                    <CloudinaryContext cloudName="dyilvah0c">
                      <Carousel>
                        {serviceDetail.images.map((image, index) => (
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
                <Card.Title className="text-primary">{serviceDetail.name}</Card.Title>
                <Card.Text>{serviceDetail.description}</Card.Text>

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
                  <Form.Control type="number" value={serviceDetail.price} readOnly />
                </Form.Group>

                <Button variant="primary" className="mt-3" onClick={() => setShowModal(true)}>
                  Đặt ngay
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Modal xác nhận đặt dịch vụ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn đặt dịch vụ này?</p>
          <p>
            <strong>Dịch vụ:</strong> {serviceDetail?.name}
          </p>
          <p>
            <strong>Ngày đặt:</strong> {selectedDate.toDateString()}
          </p>
          <p>
            <strong>Giá:</strong> ${serviceDetail?.price}
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
