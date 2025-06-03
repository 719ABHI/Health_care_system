// import React, { useState, useEffect } from 'react';

// function MyAccount() {
//   // Assuming user email is stored in localStorage after login/registration
//   const storedEmail = localStorage.getItem('email') || '';

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     age: '',
//     gender: '',
//     profileImage: null,  // will hold uploaded file or URL
//   });

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (!storedEmail) {
//       setMessage('User not logged in');
//       return;
//     }

//     // Fetch user data
//     fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser({
//             ...user,
//             name: data.user.name,
//             email: data.user.email,
//             phoneNumber: data.user.phoneNumber,
//             address: data.user.address,
//             age: data.user.age,
//             gender: data.user.gender || '',  // optional, if backend has gender
//             profileImage: data.user.profileImage || null,  // optional
//           });
//         } else {
//           setMessage('Failed to load user info');
//         }
//       })
//       .catch(err => {
//         setMessage('Error fetching user info');
//         console.error(err);
//       });
//   }, [storedEmail]);

//   // Handle input change for text fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     setUser(prev => ({ ...prev, profileImage: e.target.files[0] }));
//   };

//   // Placeholder for update function (you will need to create this endpoint)
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     // You may need to use FormData if uploading image
//     const formData = new FormData();
//     formData.append('name', user.name);
//     formData.append('email', user.email);
//     formData.append('phoneNumber', user.phoneNumber);
//     formData.append('address', user.address);
//     formData.append('age', user.age);
//     formData.append('gender', user.gender);
//     if (user.profileImage instanceof File) {
//       formData.append('profileImage', user.profileImage);
//     }

//     try {
//       const response = await fetch('http://localhost:5002/api/auth/update-user', {
//         method: 'PUT',  // Assuming you will create a PUT /update-user route
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage('Profile updated successfully!');
//       } else {
//         setMessage(result.message || 'Update failed');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Update failed, please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleUpdate}>
//       <h2>My Account</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         value={user.name}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={user.email}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="tel"
//         name="phoneNumber"
//         placeholder="Phone Number"
//         value={user.phoneNumber}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="address"
//         placeholder="Address"
//         value={user.address}
//         onChange={handleChange}
//       />

//       <input
//         type="number"
//         name="age"
//         placeholder="Age"
//         value={user.age}
//         onChange={handleChange}
//         min="0"
//       />

//       <select name="gender" value={user.gender} onChange={handleChange}>
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>

//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <button type="submit">Update Profile</button>

//       <p>{message}</p>
//     </form>
//   );
// }

// export default MyAccount;



// import React, { useState, useEffect } from 'react';
// import './Myaccount.css';

// function MyAccount() {
//   const storedEmail = localStorage.getItem('email') || '';

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     age: '',
//     gender: '',
//     profileImage: '',
//   });

//   const [profilePreview, setProfilePreview] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (!storedEmail) {
//       setMessage('Please log in first');
//       return;
//     }

//     fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser({
//             name: data.user.name,
//             email: data.user.email,
//             phoneNumber: data.user.phoneNumber,
//             address: data.user.address,
//             age: data.user.age,
//             gender: data.user.gender || '',
//             profileImage: data.user.profileImage || '',
//           });
//           setProfilePreview(data.user.profileImage || '');
//         } else {
//           setMessage('Failed to load user info');
//         }
//       })
//       .catch(() => setMessage('Error fetching user info'));
//   }, [storedEmail]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = e => {
//     const file = e.target.files[0];
//     setUser(prev => ({ ...prev, profileImage: file }));

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('email', user.email);
//     formData.append('name', user.name);
//     formData.append('phoneNumber', user.phoneNumber);
//     formData.append('address', user.address);
//     formData.append('age', user.age);
//     formData.append('gender', user.gender);
//     if (user.profileImage instanceof File) {
//       formData.append('profileImage', user.profileImage);
//     }

//     try {
//       const res = await fetch('http://localhost:5002/api/auth/update-user', {
//         method: 'PUT',
//         body: formData,
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage('Profile updated successfully!');
//         if (data.user.profileImage) setProfilePreview(data.user.profileImage);
//       } else {
//         setMessage(data.message || 'Update failed');
//       }
//     } catch {
//       setMessage('Server error, try again later.');
//     }
//   };

//   return (
//     <div className="myaccount-container">
//       <h1>My Account</h1>
//       <form onSubmit={handleSubmit} className="myaccount-form">
//         <div className="profile-image-section">
//           {profilePreview ? (
//             <img src={profilePreview} alt="Profile Preview" className="profile-preview" />
//           ) : (
//             <div className="profile-placeholder">No Image</div>
//           )}
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <label>Name:
//           <input name="name" type="text" value={user.name} onChange={handleChange} required />
//         </label>

//         <label>Email:
//           <input name="email" type="email" value={user.email} readOnly />
//         </label>

//         <label>Phone Number:
//           <input name="phoneNumber" type="tel" value={user.phoneNumber} onChange={handleChange} />
//         </label>

//         <label>Address:
//           <input name="address" type="text" value={user.address} onChange={handleChange} />
//         </label>

//         <label>Age:
//           <input name="age" type="number" value={user.age} onChange={handleChange} min="0" />
//         </label>

//         <label>Gender:
//           <select name="gender" value={user.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </label>

//         <button type="submit" className="update-btn">Update Profile</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default MyAccount;





// import React, { useState, useEffect } from 'react';
// import './Myaccount.css';

// function MyAccount() {
//   const storedEmail = localStorage.getItem('email') || '';

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     age: '',
//     gender: '',
//     profileImage: '', // URL string or empty
//   });

//   const [profilePreview, setProfilePreview] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (!storedEmail) {
//       setMessage('Please log in first');
//       return;
//     }

//     // Fetch user info from backend
//     fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.user) {
//           setUser({
//             name: data.user.name || '',
//             email: data.user.email || '',
//             phoneNumber: data.user.phoneNumber || '',
//             address: data.user.address || '',
//             age: data.user.age || '',
//             gender: data.user.gender || '',
//             profileImage: data.user.profileImage || '',
//           });
//           // If profileImage is a relative path, prepend base URL
//           const imageUrl = data.user.profileImage
//             ? data.user.profileImage.startsWith('http')
//               ? data.user.profileImage
//               : `http://localhost:5002${data.user.profileImage}`
//             : '';
//           setProfilePreview(imageUrl);
//         } else {
//           setMessage('Failed to load user info');
//         }
//       })
//       .catch(() => setMessage('Error fetching user info'));
//   }, [storedEmail]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = e => {
//     const file = e.target.files[0];
//     setUser(prev => ({ ...prev, profileImage: file }));

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMessage('');

//     const formData = new FormData();
//     formData.append('email', user.email);
//     formData.append('name', user.name);
//     formData.append('phoneNumber', user.phoneNumber);
//     formData.append('address', user.address);
//     formData.append('age', user.age);
//     formData.append('gender', user.gender);
//     if (user.profileImage instanceof File) {
//       formData.append('profileImage', user.profileImage);
//     }

//     try {
//       const res = await fetch('http://localhost:5002/api/auth/update-user', {
//         method: 'PUT',
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setMessage('Profile updated successfully!');
//         // Update profile preview URL if changed on server
//         if (data.user.profileImage) {
//           const imgUrl = data.user.profileImage.startsWith('http')
//             ? data.user.profileImage
//             : `http://localhost:5002${data.user.profileImage}`;
//           setProfilePreview(imgUrl);
//           // Reset profileImage state to string URL (not File)
//           setUser(prev => ({ ...prev, profileImage: imgUrl }));
//         }
//       } else {
//         setMessage(data.message || 'Update failed');
//       }
//     } catch {
//       setMessage('Server error, please try again later.');
//     }
//   };

//   const handleLogout = () => {
//     // Clear localStorage and redirect to login or homepage
//     localStorage.removeItem('email');
//     window.location.href = '/login'; // change as per your routing
//   };

//   const handleSettings = () => {
//     // Redirect to settings page or open settings modal
//     window.location.href = '/settings'; // adjust path as needed
//   };

//   return (
//     <div className="myaccount-container">
//       <h1>My Account</h1>
//       <form onSubmit={handleSubmit} className="myaccount-form" encType="multipart/form-data">
//         <div className="profile-image-section">
//           {profilePreview ? (
//             <img src={profilePreview} alt="Profile Preview" className="profile-preview" />
//           ) : (
//             <div className="profile-placeholder">No Image</div>
//           )}
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <label>
//           Name:
//           <input
//             name="name"
//             type="text"
//             value={user.name}
//             onChange={handleChange}
//             required
//             placeholder="Your name"
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             name="email"
//             type="email"
//             value={user.email}
//             readOnly
//             title="Email cannot be changed"
//           />
//         </label>

//         <label>
//           Phone Number:
//           <input
//             name="phoneNumber"
//             type="tel"
//             value={user.phoneNumber}
//             onChange={handleChange}
//             placeholder="Enter phone number"
//           />
//         </label>

//         <label>
//           Address:
//           <input
//             name="address"
//             type="text"
//             value={user.address}
//             onChange={handleChange}
//             placeholder="Enter address"
//           />
//         </label>

//         <label>
//           Age:
//           <input
//             name="age"
//             type="number"
//             value={user.age}
//             onChange={handleChange}
//             min="0"
//             placeholder="Enter age"
//           />
//         </label>

//         <label>
//           Gender:
//           <select name="gender" value={user.gender} onChange={handleChange}>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </label>

//         <button type="submit" className="update-btn">
//           Update Profile
//         </button>
//       </form>

//       <div className="account-actions">
//         <button className="logout-btn" onClick={handleLogout}>
//           Log Out
//         </button>
//         <button className="settings-btn" onClick={handleSettings}>
//           Settings
//         </button>
//       </div>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default MyAccount;





// import React, { useState, useEffect } from 'react';
// import './Myaccount.css';

// function MyAccount() {
//   const storedEmail = localStorage.getItem('email') || '';
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (!storedEmail) {
//       setMessage('Please log in first');
//       return;
//     }

//     fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data && data.email) {
//           setUser(data);
//         } else {
//           setMessage('Failed to load user info');
//         }
//       })
//       .catch(() => setMessage('Error fetching user info'));
//   }, [storedEmail]);

//   const handleLogout = () => {
//     localStorage.removeItem('email');
//     window.location.href = '/login';
//   };

//   const handleSettings = () => {
//     window.location.href = '/settings';
//   };

//   if (message) {
//     return <div className="myaccount-container"><p>{message}</p></div>;
//   }

//   if (!user) {
//     return <div className="myaccount-container"><p>Loading user info...</p></div>;
//   }

//   const imageUrl = user.profileImage
//     ? `http://localhost:5002/uploads/profile-images/${user.profileImage}`
//     : '';

//   return (
//     <div className="myaccount-container">
//       <h1>My Account</h1>

//       <div className="profile-image-section">
//         {imageUrl ? (
//           <img src={imageUrl} alt="Profile" className="profile-preview" />
//         ) : (
//           <div className="profile-placeholder">No Image</div>
//         )}
//       </div>

//       <div className="user-info">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</p>
//         <p><strong>Address:</strong> {user.address || 'N/A'}</p>
//         <p><strong>Age:</strong> {user.age || 'N/A'}</p>
//         <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
//       </div>

//       <div className="account-actions">
//         <button className="logout-btn" onClick={handleLogout}>
//           Log Out
//         </button>
//         <button className="settings-btn" onClick={handleSettings}>
//           Settings
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MyAccount;



import React, { useState, useEffect } from 'react';
import './Myaccount.css';

function MyAccount() {
  const storedEmail = localStorage.getItem('email') || '';
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!storedEmail) {
      setMessage('Please log in first');
      return;
    }

    fetch(`http://localhost:5002/api/auth/get-user-info?email=${storedEmail}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.user && data.user.email) {
          setUser(data.user);
        } else {
          setMessage('Failed to load user info');
        }
      })
      .catch(() => setMessage('Error fetching user info'));
  }, [storedEmail]);

  if (message) {
    return <div className="myaccount-container"><p>{message}</p></div>;
  }

  if (!user) {
    return <div className="myaccount-container"><p>Loading user info...</p></div>;
  }

  return (
    <div className="myaccount-container">
      <h1>My Account</h1>

      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Age:</strong> {user.age || 'N/A'}</p>
      </div>
    </div>
  );
}

export default MyAccount;
