import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgencyImageRequest } from '../../actions/agencyActions';

const WeddingSuggestCard = () => {
  const dispatch = useDispatch();
  const { agencies, loading, error } = useSelector((state) => state.agency);

  useEffect(() => {
    dispatch(fetchAgencyImageRequest());
  }, [dispatch]);

  const buildImageUrl = (imagePath) => `https://res.cloudinary.com/dyilvah0c/${imagePath}`;

  if (loading) {
    return <p>Đang tải hình ảnh...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex">
      {Array.isArray(agencies) && agencies.length > 0 ? (
        agencies.map((agency, index) => (
          agency.image ? ( // Chỉ hiển thị card nếu có ảnh
            <div
              className="wedding-suggest-card"
              style={{ display: 'block' }}
              key={index}
            >
              <div className="wedding-suggest-card__image">
                <div className="relative">
                  <div>
                    <span>
                      <span>
                        <img
                          alt=""
                          aria-hidden="true"
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27238%27%20height=%27156%27/%3e"
                        />
                      </span>
                      <img alt="Adora-Center" src={buildImageUrl(agency.image)} decoding="async" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="wedding-suggest-card__content">
                <div className="title">
                  <h2 className="h2-title">{agency.name}</h2>
                </div>
                <div className="info-wedding-center">
                  <p className="address">{agency.address}</p>
                  <div>
                    <p className="guest">Sức chứa: {agency.capacity} khách</p>
                    <p className="hall">Sảnh: {agency.lobby}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null // Không render nếu không có ảnh
        ))
      ) : (
        <p>No agencies available</p>
      )}
    </div>
  );
};

export default WeddingSuggestCard;
