import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import './Banner.css'; // Import file CSS cho hiệu ứng chuyển tiếp

function Banner() {
  const service = {
    images: [
      'https://s3.ap-southeast-1.amazonaws.com/vn-wbook-prd/cms/202408/20240821/b6470135-0ef2-422b-a503-d2ac32ee423c.webp',
      'https://s3.ap-southeast-1.amazonaws.com/vn-wbook-prd/cms/202408/20240821/2461d86d-fc6f-4127-a84b-432b4bd50e24.webp',
      'https://s3.ap-southeast-1.amazonaws.com/vn-wbook-prd/cms/202408/20240816/fecabd17-c08e-449a-8ad7-df532b9d0c72.webp'
    ]
  };

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center">
        <Col md={12} className="p-0">
          {service.images && service.images.length > 0 && (
            <Carousel>
              {service.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="d-block w-100"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Banner;