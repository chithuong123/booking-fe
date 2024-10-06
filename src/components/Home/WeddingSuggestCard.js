// src/components/WeddingSuggestCard.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgencyImageRequest } from '../../actions/agencyActions';

const WeddingSuggestCard = () => {
  const dispatch = useDispatch();
  const { image, loading, error } = useSelector((state) => state.agency);

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
    <div className="wedding-suggest-card" style={{ display: 'block' }}>
      <div className="wedding-suggest-card__image">
        <div className="relative">
          <div>
            <span>
              <span>
                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27238%27%20height=%27156%27/%3e" />
              </span>
              <img alt="Adora-Center" src={buildImageUrl(image)} decoding="async" />
            </span>
          </div>
          <div className="booking__star"><span className="icon icon-star"></span> 4.5</div>
        </div>
      </div>
      <div className="wedding-suggest-card__content">
        <div className="title">
          <h2 className="h2-title">ADORA CENTER</h2>
        </div>
        <div className="info-wedding-center">
          <p className="address">431 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP HCM</p>
          <div>
            <p className="guest">2400 khách</p>
            <p className="hall">15 sảnh</p>
            <p className="comment">2</p>
          </div>
        </div>
      </div>
      <p className="see-price-1">Xem giá</p>
    </div>
  );
};

export default WeddingSuggestCard;
