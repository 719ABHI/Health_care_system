// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// import Login from './components/Login';
// import Help from './components/Help';
// import Register from './components/Register';
// import Prediction from './components/Prediction';
// import Treatment from './components/Treatment';
// import StrokePrediction from './components/StrokePrediction';
// import HeartPrediction from './components/HeartPrediction';
// import Home from './components/Home';
// import './App.css';

// import logo from './assets/logo.png';
// import image1 from './assets/image1.png';
// import image2 from './assets/image2.png';
// import image3 from './assets/image3.png';

// const images = [image1, image2, image3];

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// function AppContent() {
//   const location = useLocation();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <img src={logo} alt="Logo" className="navbar-logo" />
//         <h2 className="navbar-title">Smart Healthcare Portal</h2>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//           <Link to="/Prediction">Prediction</Link>
//           <Link to="/Treatment">Treatment</Link>
//           <Link to="/Help">Help</Link>
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home backgroundImage={images[currentIndex]} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/Prediction" element={<Prediction />} />
//         <Route path="/Treatment" element={<Treatment />} />
//         <Route path="/stroke" element={<StrokePrediction />} />
//         <Route path="/heart" element={<HeartPrediction />} />
//         <Route path="/Help" element={<Help />} />
//       </Routes>

//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} Smart Healthcare Portal. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Login from './components/Login';
import Help from './components/Help';
import Register from './components/Register';
import Prediction from './components/Prediction';
import Treatment from './components/Treatment';
import StrokePrediction from './components/StrokePrediction';
import HeartPrediction from './components/HeartPrediction';
import History from './components/History';
import Home from './components/Home';
import Myaccount from './components/Myaccount';
import HeartPredictionUsingEcg from './components/HeartPredictionUsingEcg';


import './App.css';

import logo from './assets/logo.png';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';

const images = [image1, image2, image3];

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home after logout
  };

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLogin();
  }, [location]);

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h2 className="navbar-title">Smart Healthcare Portal</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/register">Register</Link>}
          {isLoggedIn && <Link to="/Prediction">Prediction</Link>}
          {isLoggedIn && <Link to="/Treatment">Treatment</Link>}
          {isLoggedIn && <Link to="/History">History</Link>}
          {isLoggedIn && <Link to="/Myaccount">My Account</Link>}
          <Link to="/Help">Help</Link>

          {/* Show Logout button if logged in */}
          {isLoggedIn && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home backgroundImage={images[currentIndex]} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Prediction" element={<Prediction />} />
        <Route path="/Treatment" element={<Treatment />} />
        <Route path="/History" element={<History />} />
        <Route path="/stroke" element={<StrokePrediction />} />
        <Route path="/heart" element={<HeartPrediction />} />
        <Route path="/ecg" element={<HeartPredictionUsingEcg />} /> {/* Keep the route for ECG form */}
        <Route path="/Myaccount" element={<Myaccount />} />
        <Route path="/Help" element={<Help />} />
      </Routes>

      {location.pathname === '/' && (
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Smart Healthcare Portal. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;



