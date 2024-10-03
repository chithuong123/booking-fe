import React from 'react';
import WeddingSuggestCard from './WeddingSuggestCard';

const WeddingCenterSlider = () => (
  <div className="wd-center-slider">
    <div className="slick-slider slider-wrap slick-initialized" dir="ltr">
      <button type="button" className="slick-arrow slick-prev slick-disabled">Previous</button>
      <div className="slick-list" style={{ height: 'auto', width: 'auto', display: 'flex', justifyContent: 'center'  }}>
        <div className="slick-track">
          <div data-index="0" className="slick-slide slick-active slick-current">
            <div>
              <div className="wedding-suggest-card-wrapper">
                <WeddingSuggestCard />
              </div>
            </div>
          </div>
          {/* Repeat similar blocks for each wedding center */}
        </div>
      </div>
      <button type="button" className="slick-arrow slick-next">Next</button>
    </div>
    <button className="btn-seemore-pink">Xem thêm &nbsp;<span className="icon icon-arrow-narrow-right"></span></button>
  </div>
);

export default WeddingCenterSlider;