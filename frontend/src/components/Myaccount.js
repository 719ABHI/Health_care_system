import React, { useState, useEffect } from 'react';
import './Myaccount.css';

const AccountSection = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user info from localStorage or API if available
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Save updated user information (you can replace this with an API call)
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setEditMode(false);
  };

  const handleLogout = () => {
    // Handle user logout (clear user data, redirect to login)
    localStorage.removeItem('userInfo');
    window.location.href = '/login'; // Redirect to login page or home page
  };

  return (
    <div className="account-section">
      <h2>Account Details</h2>
      
      {editMode ? (
        <div className="account-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSaveChanges} className="save-btn">
            Save Changes
          </button>
        </div>
      ) : (
        <div className="account-info">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
          <p><strong>Address:</strong> {userInfo.address}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit
          </button>
        </div>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default AccountSection;
