// components/Home.js
import React from 'react';

const Home = ({ backgroundImage }) => (
  <>
    <div className="home-background" style={{
      backgroundImage: `url(${backgroundImage})`,
      width: '100vw',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-image 1s ease-in-out',
      marginTop: '2cm',
    }}>
      <div className="home-content">
        <h1>Welcome to Smart Healthcare Portal</h1>
        <p>Your health, our priority.</p>
      </div>
    </div>

    <div className="page-content">
      <h2>Explore our features</h2>
      <p>Health predictions, treatment suggestions, and more.</p>
    </div>
  </>
);

export default Home;
