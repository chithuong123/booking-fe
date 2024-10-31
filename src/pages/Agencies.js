import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import {
  fetchAgenciesRequest,
  fetchServicesRequest,
  fetchServiceDetailsRequest,
} from '../actions/agencyActions';

function Agencies() {
  const dispatch = useDispatch();
  const { agencies, services, serviceDetails, loading, error } = useSelector((state) => state.agency);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAgenciesRequest());
  }, [dispatch]);

  const handleAgencyChange = (agencyId) => {
    setSelectedAgency(agencyId);
    dispatch(fetchServicesRequest(agencyId));
  };

  const handleServiceClick = (serviceId) => {
    dispatch(fetchServiceDetailsRequest(serviceId));
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const buildImageUrl = (imagePath) => {
    return `https://res.cloudinary.com/dyilvah0c/${imagePath}`;
  };

  const formatImages = (images) => {
    return typeof images === 'string' ? images.split(",") : images;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Agencies</h1>
      <select className="form-select mb-4" onChange={(e) => handleAgencyChange(e.target.value)}>
        <option value="">Select an agency</option>
        {agencies.map((agency) => (
          <option key={agency.id} value={agency.id}>
            {agency.name}
          </option>
        ))}
      </select>

      {selectedAgency && (
        <div>
          <h2 className="my-4">Services</h2>
          <Row>
  {services.map((service) => (
    <Col md={4} key={service.id} className="mb-4">
      <Card onClick={() => handleServiceClick(service.id)} style={{ width: '300px', height: '400px' }}>
        {service.images && service.images.length > 0 ? (
          <CloudinaryContext cloudName="dyilvah0c">
            <Image
              publicId={buildImageUrl(formatImages(service.images)[0].trim())}
              className="card-img-top"
              style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            >
              <Transformation width="300" height="200" crop="fill" gravity="auto" />
            </Image>
          </CloudinaryContext>
        ) : (
          <div style={{ width: '300px', height: '200px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>No image available</p>
          </div>
        )}
        <Card.Body style={{ overflow: 'hidden' }}>
          <Card.Title>{service.name}</Card.Title>
          <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {service.description}
          </Card.Text>
          <Link to={service.id ? `/services/${service.id}` : '#'} className="btn btn-primary">
            View Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

        </div>
      )}

      {serviceDetails && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Service Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name: {serviceDetails.name}</p>
            <p>Description: {serviceDetails.description}</p>
            <p>Price: {serviceDetails.price}</p>
            <div>
              <h3>Images</h3>
              {serviceDetails.images && serviceDetails.images.length > 0 ? (
                <CloudinaryContext cloudName="dyilvah0c">
                  {formatImages(serviceDetails.images).map((image, index) => (
                    <Image key={index} publicId={buildImageUrl(image.trim())} className="img-fluid mb-2">
                      <Transformation width="600" height="400" crop="fill" gravity="auto" />
                    </Image>
                  ))}
                </CloudinaryContext>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Agencies;
