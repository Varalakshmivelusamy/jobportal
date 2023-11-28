
// export default ChangePasswordForm;
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BackgroungImage from './image2.jpg';
import { AppBar } from '@mui/material';

const ChangePasswordForm = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const navigate = useNavigate();
  const email1 = localStorage.getItem('email');

  const sendVerificationCode = async () => {
    try {
      await axios.post('/api/send-verification-code', { email });
      toast.success('Verification code sent successfully.');
      setIsVerificationCodeSent(true);
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error('Error sending verification code. Please try again.');
    }
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    marginRight: '10px',
  };

  const changePassword = async () => {
    try {
      const response = await axios.post('/api/change-password', {
        email,
        verificationCode,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password changed successfully.');
        console.log('Request Data:', { email, verificationCode, newPassword });
        navigate('/login');
      } else {
        toast.error('Error changing password. Please check your verification code.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Error changing password. Please try again later.');
    }
  };

  const handleSkip = () => {
    navigate(`/main/${email1}`);
  };

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroungImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#00001a' }}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'Arial',
                fontWeight: 'bold',
              }}
            ></Typography>
            <Button
              color="inherit"
              sx={{
                backgroundColor: ' #00bfff',
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: '#0A3D91',
                },
              }}
              onClick={handleSkip}
            >
              Home
            </Button>
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                backgroundColor: ' #00bfff',
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: '#0A3D91',
                },
              }}
            >
              <Link to="/" style={linkStyle}>
                Logout
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ marginTop: '90px' }}>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email1}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={sendVerificationCode}>
            Send Verification Code
          </Button>
          {isVerificationCodeSent && (
            <>
              <TextField
                label="Verification Code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button variant="contained" color="primary" onClick={changePassword}>
                Change Password
              </Button>
            </>
          )}
        </Paper>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default ChangePasswordForm;
