
// import React, { useState } from 'react';
// import './Register.css';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');  // Added Confirm Password
//   const [message, setMessage] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);  // Track registration status

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Check if password and confirm password match
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5002/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const result = await response.json();

//       if (response.status === 201) {
//         setMessage('Registration successful!');
//         setIsRegistered(true);  // Set registration status to true after success

//         // Clear form fields after successful registration
//         setName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         setMessage(result.message);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setMessage('Registration failed, please try again later.');
//     }
//   };

//   return (
//     <div>
//       {isRegistered ? (
//         <div>
//           <h2>Registration Successful</h2>
//           <p>You have successfully registered!</p>
//         </div>
//       ) : (
//         <form onSubmit={handleRegister}>
//           <h2>Register</h2>
//           <input 
//             type="text" 
//             placeholder="Full Name" 
//             value={name}
//             onChange={(e) => setName(e.target.value)} 
//             required 
//           />
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//           <input 
//             type="password" 
//             placeholder="Confirm Password" 
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             required 
//           />
//           <button type="submit">Register</button>
//           <p>{message}</p>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Register;





// import React, { useState } from 'react';
// import './Register.css';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Client-side check
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5002/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password, confirmPassword }), // include confirmPassword
//       });

//       const result = await response.json();

//       if (response.status === 201) {
//         setMessage('Registration successful!');
//         setName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         setMessage(result.message || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setMessage('Registration failed, please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Register</h2>
//       <input 
//         type="text" 
//         placeholder="Full Name" 
//         value={name}
//         onChange={(e) => setName(e.target.value)} 
//         required 
//       />
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={email}
//         onChange={(e) => setEmail(e.target.value)} 
//         required 
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password}
//         onChange={(e) => setPassword(e.target.value)} 
//         required 
//       />
//       <input 
//         type="password" 
//         placeholder="Confirm Password" 
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)} 
//         required 
//       />
//       <button type="submit">Register</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default Register;






// import React, { useState } from 'react';
// import './Register.css';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Client-side password match check
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5002/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password, confirmPassword }),
//       });

//       const result = await response.json();

//       if (response.status === 201) {
//         // Store userId in localStorage
//         localStorage.setItem('userId', result.user.userId);
//         localStorage.setItem('name', name);

//         setMessage('Registration successful!');
//         setName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         setMessage(result.message || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setMessage('Registration failed, please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Register</h2>
//       <input 
//         type="text" 
//         placeholder="Full Name" 
//         value={name}
//         onChange={(e) => setName(e.target.value)} 
//         required 
//       />
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={email}
//         onChange={(e) => setEmail(e.target.value)} 
//         required 
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={password}
//         onChange={(e) => setPassword(e.target.value)} 
//         required 
//       />
//       <input 
//         type="password" 
//         placeholder="Confirm Password" 
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)} 
//         required 
//       />
//       <button type="submit">Register</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default Register;






// import React, { useState } from 'react';
// import './Register.css';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5002/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phoneNumber,
//           address,
//           password,
//           confirmPassword,
//         }),
//       });

//       const result = await response.json();

//       if (response.status === 201) {
//         localStorage.setItem('userId', result.user.userId);
//         localStorage.setItem('name', name);

//         setMessage('Registration successful!');
//         setName('');
//         setEmail('');
//         setPhoneNumber('');
//         setAddress('');
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         setMessage(result.message || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setMessage('Registration failed, please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="tel"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Register</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default Register;





import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          address,
          age,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.status === 201) {
        localStorage.setItem('userId', result.user.userId);
        localStorage.setItem('name', name);

        setMessage('Registration successful!');
        setName('');
        setEmail('');
        setPhoneNumber('');
        setAddress('');
        setAge('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage(result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Registration failed, please try again later.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        min="0"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}

export default Register;