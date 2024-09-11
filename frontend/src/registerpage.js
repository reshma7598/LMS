// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css';


// const Register = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', { ...formData, role: 'user' });
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
//       <div className="bg-white p-3 rounded w-50">
//         <h1 style={{ color: 'darkblue' }}>Register</h1> {/* Apply white color to heading */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username">
//               <strong>Username</strong>
//             </label>
//             <input 
//               type="text"
//               placeholder='Enter username'
//               autoComplete='off'
//               name='username'
//               className='form-control rounded-0'
//               onChange={handleChange} 
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input 
//               type="password"
//               placeholder='Enter password'
//               autoComplete='off'
//               name='password'
//               className='form-control rounded-0'
//               onChange={handleChange} 
//             />
//           </div>
//           <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
//         </form>
//         <p className='mt-2' style={{ color: 'black' }}>Already have an account?</p> {/* Apply white color to text */}
//         <div className='container d-flex justify-content-center'>
         
//         <Link 
//   to='/login' 
//   className='btn'
//   style={{
//     backgroundColor: '#007bff', // Solid blue background
//     color: '#ffffff', // White text color
//     padding: '0.75rem 1.5rem', // Padding for button
//     textAlign: 'center', // Center text
//     textDecoration: 'none', // Remove underline
//     border: '1px solid #007bff', // Matching border color
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition
//     width: '60%', // Adjust width to make the button more compact
//     borderRadius: '50px', // Rounded corners for pill shape
//     backdropFilter: 'blur(5px)', // Blur effect for background
//   }}
//   onMouseOver={(e) => {
//     e.currentTarget.style.backgroundColor = '#0056b3'; // Darker blue on hover
//     e.currentTarget.style.color = '#ffffff'; // Keep text color white on hover
//   }}
//   onMouseOut={(e) => {
//     e.currentTarget.style.backgroundColor = '#007bff'; // Revert to original background color
//     e.currentTarget.style.color = '#ffffff'; // Revert text color
//   }}
// >
//   Login
// </Link>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { ...formData, role: 'user' });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg flex w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-full">
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black">BOOK STORE</h2>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Register For An Account</h3>
          <p className="mt-2 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">Login</Link>
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
              Register
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-blue-100 rounded-r-lg p-6 flex items-center justify-center">
          <img
            src="https://img.freepik.com/premium-vector/back-school-motivational-ideas-students_1236599-16864.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
