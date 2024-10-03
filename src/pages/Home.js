import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet';
import '../assets/Home.css';
import WeddingCenterBanner from '../components/Home/WeddingCenterBanner';
import WeddingCenterSlider from '../components/Home/WeddingCenterSlider';

function Home() {
  return (
    <div>
      <Banner />
      <HelmetConfig />
      <section className="section-wedding-center">
        <WeddingCenterBanner />
        <WeddingCenterSlider />
      </section>
    </div>
  );
}

const HelmetConfig = () => (
  <Helmet>
    <link rel="stylesheet" href="https://www.weddingbook.vn/_next/static/css/957e5a80d40fc4fc.css" />
    <style>
      {`body .only-pc { display: inline-block !important; }`}
    </style>
  </Helmet>
);

export default Home;