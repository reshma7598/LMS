// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import './login.css'

// const Login = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
//       // Store token and role in localStorage
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', res.data.role);

//       // Redirect based on user role
//       if (res.data.role === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate('/user');
//       }
//     } catch (err) {
//       console.error(err.response?.data?.msg || err.message);
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//       <div className="bg-white p-3 rounded w-25">
//         <h2 style={{ color: '#ffffff', fontFamily: 'initial', fontWeight: 700 }}><b>Login</b></h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <TextField
//               placeholder='Enter username'
//               autoComplete='off'
//               name='username'
//               variant="outlined"
//               fullWidth
//               onChange={handleChange}
//               sx={{
//                 borderRadius: '25px',
//                 backgroundColor: 'transparent',
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: '25px',
//                   height: '40px',
//                   '& fieldset': {
//                     borderColor: 'white',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: 'white',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: 'white',
//                   },
//                 },
//                 input: {
//                   color: '#ffffff',
//                 },
//               }}
//             />
//           </div>
//           <div className="mb-3">
//             <TextField
//               type="password"
//               placeholder='Enter password'
//               autoComplete='off'
//               name='password'
//               variant="outlined"
//               fullWidth
//               onChange={handleChange}
//               sx={{
//                 borderRadius: '25px',
//                 backgroundColor: 'transparent',
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: '25px',
//                   height: '40px',
//                   '& fieldset': {
//                     borderColor: 'white',
//                   },
//                   '&:hover fieldset': {
//                     borderColor: 'white',
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: 'white',
//                   },
//                 },
//                 input: {
//                   color: '#ffffff',
//                 },
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-center">
//             <Button
//               type='submit'
//               variant="contained"
//               color="primary"
//               sx={{
//                 borderRadius: '50px',
//                 backgroundColor:'#a89e83',
//                 padding: '0.75rem 0',
//                 marginTop: '1rem',
//                 width: '70%',
//                 '&:hover': {
//                   backgroundColor: '#ffffff',
//                   color:'#000000'
//                 },
//               }}
//             >
//               Login
//             </Button>
//           </div>
//         </form>
//         <p className='one'>Don't have an account?</p>
//         <div className='container'>
//           <Link to="/register" className='signup-link'>
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import './login.css'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Store token and role in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Redirect based on user role
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-screen-lg h-full md:h-auto">
      <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-black">BOOK STORE</h2>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">Login To Your Account</h3>
        <p className="mt-2 text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">Sign up</Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-blue-100 rounded-r-lg p-6 flex items-center justify-center">
        <img
          src="https://img.freepik.com/premium-vector/back-school-traditions-new-beginnings_1236599-16139.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);
};

export default Login;
