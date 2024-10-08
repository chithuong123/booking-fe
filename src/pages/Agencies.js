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
                <Card onClick={() => handleServiceClick(service.id)}>
                  {service.images && service.images.length > 0 && (
                    <CloudinaryContext cloudName="dyilvah0c">
                      <Image publicId={buildImageUrl(service.images[0])} className="card-img-top">
                        <Transformation width="300" height="200" crop="fill" gravity="auto" />
                      </Image>
                    </CloudinaryContext>
                  )}
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
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
            <p>ID: {serviceDetails.id}</p>
            <p>Agency ID: {serviceDetails.agency_id}</p>
            <p>Name: {serviceDetails.name}</p>
            <p>Description: {serviceDetails.description}</p>
            <p>Price: {serviceDetails.price}</p>
            <p>Created At: {serviceDetails.createdAt}</p>
            <p>Updated At: {serviceDetails.updatedAt}</p>
            <div>
              <h3>Images</h3>
              {serviceDetails.images && serviceDetails.images.length > 0 ? (
                <CloudinaryContext cloudName="dyilvah0c">
                  {serviceDetails.images.map((image, index) => (
                    <Image key={index} publicId={buildImageUrl(image)} className="img-fluid mb-2">
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
