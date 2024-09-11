// // import React from 'react'

// // function Adminpage() {
// //   return (
// //     <div>
// //       <h1>admin</h1>
// //     </div>
// //   )
// // }

// // export default Adminpage


// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import NotificationsIcon from '@mui/icons-material/Notifications'; 

// const AdminPage = () => {
//   const [books, setBooks] = useState([]);
//   const [editBookId, setEditBookId] = useState(null);
//   const [formData, setFormData] = useState({
//     isbn: '',
//     name: '',
//     category: '',
//     quantity: '',
//     price: ''
//   });
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const fetchBooks = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         return;
//       }

//       const res = await axios.get('http://localhost:5000/api/books', {
//         headers: { 'x-auth-token': token },
//       });

//       const filteredBooks = res.data.filter(book =>
//         book.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       setBooks(filteredBooks);
//     } catch (err) {
//       console.error(err.response?.data?.msg || err.message);
//     }
//   }, [searchQuery]);

//   useEffect(() => {
//     fetchBooks();
//   }, [fetchBooks]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { 'x-auth-token': token } };

//       if (editBookId) {
//         await axios.put(`http://localhost:5000/api/books/${editBookId}`, formData, config);
//         setEditBookId(null);
//       } else {
//         await axios.post('http://localhost:5000/api/books', formData, config);
//       }

//       setFormData({
//         isbn: '',
//         name: '',
//         category: '',
//         quantity: '',
//         price: ''
//       });

//       setIsFormVisible(false);
//       fetchBooks();
//     } catch (err) {
//       console.error(err.response?.data?.msg || err.message);
//     }
//   };

//   const handleEdit = (book) => {
//     setFormData(book);
//     setEditBookId(book._id);
//     setIsFormVisible(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/books/${id}`, {
//         headers: { 'x-auth-token': token },
//       });
//       fetchBooks();
//     } catch (err) {
//       console.error(err.response?.data?.msg || err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div>
// <AppBar position="static" style={{ backgroundColor: '#1995AD' }}>
//   <Toolbar style={{ position: 'relative' }}>
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       {/* Logo Image */}
//       <img 
//         src="https://cdn-icons-png.freepik.com/256/16353/16353320.png?uid=R160322730&ga=GA1.1.852311962.1713795781&semt=ais_hybrid"  // Example logo, replace with your image URL
//         alt="Logo"
//         style={{ width: '40px', height: '40px', marginRight: '10px' }}  // Adjust size and margin as needed
//       />
//       {/* LMS Text */}
//       <Typography variant="h6" style={{ color: '#F1F1F2' }}>
//         LMS
//       </Typography>
//     </div>

//     {/* Center this part at 60% of the AppBar */}
//     <div style={{
//       position: 'absolute',
//       left: '60%',  // Position this 60% from the left
//       transform: 'translateX(-50%)',  // Center it horizontally
//       display: 'flex',
//       alignItems: 'center',
//     }}>
//       <IconButton color="inherit" onClick={() => alert('Notifications!')}>
//         <NotificationsIcon style={{ color: '#F1F1F2' }} />
//       </IconButton>
//       <Button
//         color="inherit"
//         onClick={handleLogout}
//         style={{
//           color: '#F1F1F2',
//           backgroundColor: '#1995AD',
//           fontSize: '1.2rem',  // Increase the font size
//           transition: 'background-color 0.3s ease',
//         }}
//         onMouseEnter={(e) => e.target.style.backgroundColor = '#A1D6E2'}
//         onMouseLeave={(e) => e.target.style.backgroundColor = '#1995AD'}
//       >
//         Logout
//       </Button>
//     </div>
//   </Toolbar>
// </AppBar>



// <div style={{ margin: '20px' }}>
//   <div style={{ width: '100%', marginBottom: '16px' }}>
//     {/* Text above the search bar */}
//     <Typography variant="h4" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
//       Search
//     </Typography>

//     {/* Search Bar */}
//     <TextField
//       label="Search Books"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       variant="outlined"
//       style={{
//         width: '40%',  // Set the width to 40%
//         borderRadius: '8px',  // Round the corners
//         overflow: 'hidden'  // Ensure the rounded corners display properly
//       }}
//       InputProps={{
//         style: {
//           borderRadius: '8px'  // Apply border radius to the input itself
//         }
//       }}
//       margin="normal"
//     />
//   </div>

//   <Button
//   variant="contained"
//   color="primary"
//   onClick={() => setIsFormVisible(!isFormVisible)}
// >
//   {isFormVisible ? 'Cancel' : 'Add Book'}
// </Button>
// {isFormVisible && (
//   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//     {/* Form with 50% width */}
//     <form onSubmit={handleSubmit} style={{ width: '50%' }}>
//       <TextField
//         label="ISBN"
//         name="isbn"
//         value={formData.isbn}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         required
//       />
//       <TextField
//         label="Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         required
//       />
//       <TextField
//         label="Category"
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         required
//       />
//       <TextField
//         label="Quantity"
//         name="quantity"
//         value={formData.quantity}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         required
//       />
//       <TextField
//         label="Price"
//         name="price"
//         value={formData.price}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         required
//       />

//       <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
//         {editBookId ? 'Update Book' : 'Add Book'}
//       </Button>
//     </form>

//     {/* Demo image beside the form */}
//     <div style={{ width: '40%', marginLeft: '20px' }}>
//       <img
//         src="https://img.freepik.com/premium-photo/comprehensive-inspection-organizational-quality-hr-finance-certification-insurance-stan_209190-189223.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781"  // Replace with your demo image URL
//         alt="Demo Book Cover"
//         style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
//       />
//     </div>
//   </div>
// )}

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ISBN</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {books.map((book) => (
//               <TableRow key={book._id}>
//                 <TableCell>{book.isbn}</TableCell>
//                 <TableCell>{book.name}</TableCell>
//                 <TableCell>{book.category}</TableCell>
//                 <TableCell>{book.quantity}</TableCell>
//                 <TableCell>{book.price}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleEdit(book)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => handleDelete(book._id)} style={{ marginLeft: '10px' }}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [formData, setFormData] = useState({
    isbn: '',
    name: '',
    category: '',
    quantity: '',
    price: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.get('http://localhost:5000/api/books', {
        headers: { 'x-auth-token': token },
      });

      const filteredBooks = res.data.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setBooks(filteredBooks);
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };

      if (editBookId) {
        await axios.put(`http://localhost:5000/api/books/${editBookId}`, formData, config);
        setEditBookId(null);
      } else {
        await axios.post('http://localhost:5000/api/books', formData, config);
      }

      setFormData({
        isbn: '',
        name: '',
        category: '',
        quantity: '',
        price: ''
      });

      setIsFormVisible(false);
      fetchBooks();
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditBookId(book._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchBooks();
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#1995AD' }}>
        <Toolbar style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo Image */}
            <img 
              src="https://cdn-icons-png.freepik.com/256/16353/16353320.png?uid=R160322730&ga=GA1.1.852311962.1713795781&semt=ais_hybrid"  // Example logo, replace with your image URL
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}  // Adjust size and margin as needed
            />
            {/* LMS Text */}
            <Typography variant="h6" style={{ color: '#F1F1F2' }}>
              LMS
            </Typography>
          </div>

          {/* Center this part at 60% of the AppBar */}
          <div style={{
            position: 'absolute',
            left: '60%',  // Position this 60% from the left
            transform: 'translateX(-50%)',  // Center it horizontally
            display: 'flex',
            alignItems: 'center',
          }}>
            <IconButton color="inherit" onClick={() => alert('Notifications!')}>
              <NotificationsIcon style={{ color: '#F1F1F2' }} />
            </IconButton>
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{
                color: '#F1F1F2',
                backgroundColor: '#1995AD',
                fontSize: '1.2rem',  // Increase the font size
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#A1D6E2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1995AD'}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ margin: '20px' }}>
        <div style={{ width: '100%', marginBottom: '16px' }}>
          {/* Text above the search bar */}
          <Typography variant="h4" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
            Search
          </Typography>

          {/* Search Bar */}
          <TextField
            label="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            style={{
              width: '30%',  // Set the width to 40%
              borderRadius: '10px',  // Round the corners
              overflow: 'hidden'  // Ensure the rounded corners display properly
            }}
            InputProps={{
              style: {
                borderRadius: '15px'  // Apply border radius to the input itself
              }
            }}
            margin="normal"
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Cancel' : 'Add Book'}
        </Button>
        {isFormVisible && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Form with 50% width */}
            <form onSubmit={handleSubmit} style={{ width: '40%' }}>
              <TextField
                label="ISBN"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />

              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                {editBookId ? 'Update Book' : 'Add Book'}
              </Button>
            </form>

            {/* Demo image beside the form */}
            <div style={{ width: '50%', marginLeft: '20px' }}>
              <img
                src="https://img.freepik.com/premium-photo/comprehensive-inspection-organizational-quality-hr-finance-certification-insurance-stan_209190-189223.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781"  // Replace with your demo image URL
                alt="Demo Book Cover"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(book)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
