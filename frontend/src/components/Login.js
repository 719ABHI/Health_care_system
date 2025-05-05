// import React, { useState } from 'react';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5002/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();

//       if (response.status === 200) {
//         setMessage(`Login successful. Token: ${result.token}`);
//       } else {
//         setMessage(result.message);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setMessage('Login failed, please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
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
//       <button type="submit">Login</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/auth/login', {  // Ensure correct URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true'); // Store login state
        setMessage('Login successful.');
        navigate('/'); // Navigate to home or dashboard
      } else {
        setMessage(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Login failed, please try again later.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;

