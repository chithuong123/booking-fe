import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeddingSuggestCard = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agencies');
        const agencies = response.data.slice(0, 1); // Get the first agency
        const image = agencies[0].image; // Extract image from the first agency
        setImage(image);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải hình ảnh.');
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

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