import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, TextField, AppBar, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Bell icon

const UserPage = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
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

  const handleBorrow = (book) => {
    if (book.quantity > 0) {
      // Decrease quantity in book list
      const updatedBooks = books.map(b =>
        b._id === book._id ? { ...b, quantity: b.quantity - 1 } : b
      );
      setBooks(updatedBooks);

      // Add to borrowed list or increase quantity if already borrowed
      const borrowedBook = borrowedBooks.find(b => b._id === book._id);
      if (borrowedBook) {
        const updatedBorrowedBooks = borrowedBooks.map(b =>
          b._id === book._id ? { ...b, quantity: b.quantity + 1 } : b
        );
        setBorrowedBooks(updatedBorrowedBooks);
      } else {
        setBorrowedBooks([...borrowedBooks, { ...book, quantity: 1 }]);
      }
    }
  };

  const handleReturn = (book) => {
    // Increase quantity in book list
    const updatedBooks = books.map(b =>
      b._id === book._id ? { ...b, quantity: b.quantity + 1 } : b
    );
    setBooks(updatedBooks);

    // Decrease quantity or remove from borrowed list
    const updatedBorrowedBooks = borrowedBooks.map(b =>
      b._id === book._id ? { ...b, quantity: b.quantity - 1 } : b
    ).filter(b => b.quantity > 0);
    setBorrowedBooks(updatedBorrowedBooks);
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
              src="https://cdn-icons-png.freepik.com/256/16353/16353320.png?uid=R160322730&ga=GA1.1.852311962.1713795781&semt=ais_hybrid" // Replace with your image URL
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px' }} // Adjust size and margin as needed
            />
            {/* LMS Text */}
            <Typography variant="h6" style={{ color: '#F1F1F2' }}>
              LMS
            </Typography>
          </div>

          {/* Center this part at 60% of the AppBar */}
          <div style={{
            position: 'absolute',
            left: '60%', // Position this 60% from the left
            transform: 'translateX(-50%)', // Center it horizontally
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
                fontSize: '1.2rem', // Increase the font size
                transition: 'background-color 0.3s ease',
                marginLeft: '16px', // Space between icon and button
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
              width: '40%',  // Set the width to 40%
              borderRadius: '15px',  // Round the corners
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

        {/* Book List */}
        <Typography variant="h5" style={{ marginTop: 20 }}>Book List</Typography>
        <Grid container spacing={0.5}> {/* Reduced spacing between items */}
  {books.map(book => (
    <Grid item xs={6} sm={4} md={2} key={book._id}> {/* Adjusted the grid size for closer alignment */}
      <Card style={{ width: '100%', margin: 'auto', padding: '5px' }}> {/* Center card horizontally and reduce padding */}
        <CardContent>
          <img
            src="https://img.freepik.com/free-photo/still-life-sant-jordi-day-books-roses_23-2151197560.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781&semt=ais_hybrid" // Replace with dynamic image URL if available
            alt={book.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <Typography variant="h6" style={{ marginTop: 5 }}>
            {book.name}
          </Typography>
          <Typography color="textSecondary">
            ISBN: {book.isbn}
          </Typography>
          <Typography color="textSecondary">
            Category: {book.category}
          </Typography>
          <Typography color="textSecondary">
            Price: ${book.price}
          </Typography>
          <Typography color="textSecondary">
            Quantity: {book.quantity}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 5 }}
            onClick={() => handleBorrow(book)}
            disabled={book.quantity === 0}
          >
            CART
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}

  {/* Borrowed Books */}
  <Typography variant="h5" style={{ marginTop: 20 }}>Book List</Typography>
  <Grid container spacing={0.5}> 
  {borrowedBooks.map(book => (
    
    <Grid item xs={6} sm={4} md={2} key={book._id}> {/* Adjusted the grid size for closer alignment */}
      <Card style={{ width: '100%', margin: 'auto', padding: '5px' }}> {/* Center card horizontally and reduce padding */}
        <CardContent>
          <img
            src="https://img.freepik.com/premium-photo/cozy-evening-with-cup-tea-blanket-classic-novel_1320055-3913.jpg?uid=R160322730&ga=GA1.1.852311962.1713795781&semt=ais_hybrid" // Replace with dynamic image URL if available
            alt={book.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <Typography variant="h6" style={{ marginTop: 5 }}>
            {book.name}
          </Typography>
          <Typography color="textSecondary">
            ISBN: {book.isbn}
          </Typography>
          <Typography color="textSecondary">
            Category: {book.category}
          </Typography>
          <Typography color="textSecondary">
            Price: ${book.price}
          </Typography>
          <Typography color="textSecondary">
            Quantity: {book.quantity}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 5 }}
            onClick={() => handleReturn(book)}
          >
            Return
          </Button>
        </CardContent>
      </Card>
      
    </Grid>
  ))}
</Grid>
</Grid>
      </div>
    </div>
  );
};

export default UserPage;
