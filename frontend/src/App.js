
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// import Login from './components/Login';
// import Help from './components/Help';
// import Register from './components/Register';
// import Prediction from './components/Prediction';
// import Treatment from './components/Treatment';
// import StrokePrediction from './components/StrokePrediction';
// import HeartPrediction from './components/HeartPrediction';
// import History from './components/History';
// import Home from './components/Home';
// import Myaccount from './components/Myaccount';
// import HeartPredictionUsingEcg from './components/HeartPredictionUsingEcg';


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
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('email');
//     setIsLoggedIn(false);
//     navigate('/'); // Redirect to home after logout
//   };

//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
//     };
//     checkLogin();
//   }, [location]);

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <img src={logo} alt="Logo" className="navbar-logo" />
//         <h2 className="navbar-title">Smart Healthcare Portal</h2>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           {!isLoggedIn && <Link to="/login">Login</Link>}
//           {!isLoggedIn && <Link to="/register">Register</Link>}
//           {isLoggedIn && <Link to="/Prediction">Prediction</Link>}
//           {isLoggedIn && <Link to="/Treatment">Treatment</Link>}
//           {isLoggedIn && <Link to="/History">History</Link>}
//           {isLoggedIn && <Link to="/Myaccount">My Account</Link>}
//           <Link to="/Help">Help</Link>

//           {/* Show Logout button if logged in */}
//           {isLoggedIn && (
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home backgroundImage={images[currentIndex]} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/Prediction" element={<Prediction />} />
//         <Route path="/Treatment" element={<Treatment />} />
//         <Route path="/History" element={<History />} />
//         <Route path="/stroke" element={<StrokePrediction />} />
//         <Route path="/heart" element={<HeartPrediction />} />
//         <Route path="/ecg" element={<HeartPredictionUsingEcg />} /> {/* Keep the route for ECG form */}
//         <Route path="/Myaccount" element={<Myaccount />} />
//         <Route path="/Help" element={<Help />} />
//       </Routes>

//       {location.pathname === '/' && (
//         <footer className="footer">
//           <p>&copy; {new Date().getFullYear()} Smart Healthcare Portal. All rights reserved.</p>
//         </footer>
//       )}
//     </div>
//   );
// }

// export default App;






// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// import Login from './components/Login';
// import Help from './components/Help';
// import Register from './components/Register';
// import Prediction from './components/Prediction';
// import Treatment from './components/Treatment';
// import StrokePrediction from './components/StrokePrediction';
// import HeartPrediction from './components/HeartPrediction';
// import History from './components/History';
// import Home from './components/Home';
// import Myaccount from './components/Myaccount';
// import HeartPredictionUsingEcg from './components/HeartPredictionUsingEcg';

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
//   const navigate = useNavigate();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('email');
//     setIsLoggedIn(false);
//     navigate('/login'); // Redirect to login after logout
//   };

//   useEffect(() => {
//     const checkLogin = () => {
//       setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
//     };
//     checkLogin();
//   }, [location]);

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <img src={logo} alt="Logo" className="navbar-logo" />
//         <h2 className="navbar-title">Smart Healthcare Portal</h2>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           {!isLoggedIn && <Link to="/login">Login</Link>}
//           {!isLoggedIn && <Link to="/register">Register</Link>}
//           {isLoggedIn && <Link to="/Prediction">Prediction</Link>}
//           {isLoggedIn && <Link to="/Treatment">Treatment</Link>}
//           {isLoggedIn && <Link to="/History">History</Link>}
//           {isLoggedIn && <Link to="/Myaccount">My Account</Link>}
//           <Link to="/Help">Help</Link>

//           {isLoggedIn && (
//             <button className="logout-button" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home backgroundImage={images[currentIndex]} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/Prediction" element={<Prediction />} />
//         <Route path="/Treatment" element={<Treatment />} />
//         <Route path="/History" element={<History />} />
//         <Route path="/stroke" element={<StrokePrediction />} />
//         <Route path="/heart" element={<HeartPrediction />} />
//         <Route path="/ecg" element={<HeartPredictionUsingEcg />} />
//         <Route path="/Myaccount" element={<Myaccount />} />
//         <Route path="/Help" element={<Help />} />
//       </Routes>

//       {location.pathname === '/' && (
//         <footer className="footer">
//           <p>&copy; {new Date().getFullYear()} Smart Healthcare Portal. All rights reserved.</p>
//         </footer>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

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
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Background image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update login status on route change
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h2 className="navbar-title">Smart Healthcare Portal</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/register">Register</Link>}

          {isLoggedIn && (
            <a href="/Prediction" target="_blank" rel="noopener noreferrer">
              Prediction
            </a>
          )}

          {isLoggedIn && <Link to="/Treatment">Treatment</Link>}
          {isLoggedIn && <Link to="/History">History</Link>}
          {/* {isLoggedIn && <Link to="/Myaccount">My Account</Link>} */}

          <a href="/Help" target="_blank" rel="noopener noreferrer">
            Help
          </a>

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
        <Route path="/ecg" element={<HeartPredictionUsingEcg />} />
        {/* <Route path="/Myaccount" element={<Myaccount />} /> */}
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