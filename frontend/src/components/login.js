

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess, loginFailure } from "../util/redux/loginSlice";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import MailIcon from "@mui/icons-material/Mail";
// import KeyIcon from "@mui/icons-material/Key";
// import Backgroungimage from "./image2.jpg";
// import { styled } from "@mui/system";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";

// const StyledContainer = styled(Container)(() => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   minHeight: "95vh",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   backgroundImage: `url(${Backgroungimage})`,
// }));

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   minWidth: "330px",
//   padding: theme.spacing(3),
//   backgroundColor: "#d1e0e0",
//   borderRadius: "30px",
//   backgroundSize: "box",
//   backgroundRepeat: "no-repeat",
//   boxShadow:
//     "10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)",
// }));

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const saveUserDataToRedux = (token, userId, email, role) => {
//     dispatch(loginSuccess({ token, userId, email, role }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;

//     if (!emailRegex.test(email)) {
//       toast.error("Invalid email address");
//       return;
//     }

//     try {
//       const response = await axios.post("/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const { role } = response.data;
//         const userId = response.data.user._id;
//         const userEmail = response.data.user.email;
//         const token = response.data.token;
//         localStorage.setItem("userId", userId);
//         localStorage.setItem("userRole", role);
//         localStorage.setItem("email", userEmail);
//         localStorage.setItem("token", token);

//         saveUserDataToRedux(token, userId, userEmail, role);

//         if (role === "admin") {
//           toast.success("Admin login successful");
//           setTimeout(() => {
//             navigate(`/admin/${userEmail}`);
//           }, 2000);
//         } else if (role === "user") {
//           dispatch(loginSuccess({ role, userEmail }));
//           toast.success("User login successful");

//           setTimeout(() => {
//             navigate(`/main/${userEmail}`);
//           }, 2000);
//         }
//       } else {
//         dispatch(loginFailure("Login failed. Please check your credentials."));
//         toast.error("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       dispatch(loginFailure("An error occurred while trying to log in."));
//       toast.error("An error occurred while trying to log in.");
//     }
//   };
//   const credentialResponse = (response) => {
//     console.log(response);
//   };

//   return (
//     <StyledContainer component="main" maxWidth="xm">
//       <StyledPaper elevation={3}>
//         <LockOpenIcon
//           style={{ fontSize: 55, marginLeft: "250px", marginBottom: "5px" }}
//         />
//         <Typography variant="h5" align="center" fontWeight={600}>
//           LOGIN
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             style={{ width: "70%", marginLeft: "15%" }}
//             label="Email"
//             type="email"
//             placeholder="   Enter your Email"
//             value={email}
//             InputProps={{
//               startAdornment: <MailIcon color="action" fontSize="small" />,
//             }}
//             onChange={handleEmailChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             style={{ width: "70%", marginLeft: "15%" }}
//             label="Password"
//             type="password"
//             placeholder="  Enter Your Password"
//             value={password}
//             InputProps={{
//               startAdornment: <KeyIcon color="action" fontSize="small" />,
//             }}
//             onChange={handlePasswordChange}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             style={{ marginLeft: "36%", marginTop: "10px", width: "30%" }}
//           >
//             Login
//           </Button>

//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               console.log(credentialResponse);
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//           <p style={{ marginLeft: "120px" }}>
//             Don't have an account? <Link to="/register">Create One</Link>
//           </p>
//         </form>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </StyledPaper>
//     </StyledContainer>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../util/redux/loginSlice';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import Backgroungimage from './image2.jpg';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
// import ForgotPasswordDialog from './ForgotPasswordDialog';

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '95vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${Backgroungimage})`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: '330px',
  padding: theme.spacing(3),
  backgroundColor: '#d1e0e0',
  borderRadius: '30px',
  backgroundSize: 'box',
  backgroundRepeat: 'no-repeat',
  boxShadow: '10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)',
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const saveUserDataToRedux = (token, userId, email, role) => {
    dispatch(loginSuccess({ token, userId, email, role }));
  };
  
  const handleOpenForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(true);
  };

  const handleCloseForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSendVerificationCode = async (email) => {
    try {
      // Call the API to send a verification code
      await axios.post('/api/send-verification-code', { email });
      toast.success('Verification code sent successfully.');
      handleCloseForgotPasswordDialog();
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error('Error sending verification code. Please try again.');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;

    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { role } = response.data;
        const userId = response.data.user._id;
        const userEmail = response.data.user.email;
        const token = response.data.token;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', role);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('token', token);

        saveUserDataToRedux(token, userId, userEmail, role);

        if (role === 'admin') {
          toast.success('Admin login successful');
          setTimeout(() => {
            navigate(`/admin/${userEmail}`);
          }, 2000);
        } else if (role === 'user') {
          dispatch(loginSuccess({ role, userEmail }));
          toast.success('User login successful');

          setTimeout(() => {
            navigate(`/main/${userEmail}`);
          }, 2000);
        }
      } else {
        dispatch(loginFailure('Login failed. Please check your credentials.'));
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      dispatch(loginFailure('An error occurred while trying to log in.'));
      toast.error('An error occurred while trying to log in.');
    }
  };

const responseGoogleSuccess = async (response) => {
  console.log('Google Login Response:', response);

  try {
    const credential = response.credential;
    console.log('Google Credential:', credential);
     localStorage.setItem("token",response.credential)
    const backendResponse = await axios.post('/api/google-login', {
      credential: credential,
    });

    const { email,userId } = backendResponse.data; // Extract email from the response
    console.log('Backend Response:', backendResponse);
      localStorage.setItem("email",email);
      localStorage.setItem("userId",userId)
    // Use the email to navigate
    navigate(`/main/${email}`);
  } catch (error) {
    console.error('Error during Google login:', error);
    toast.error('Error during Google login');
  }
};

const responseGoogleError = (response) => {
  console.log(response);
  toast.error('Google login failed');
};

  return (
    <StyledContainer component="main" maxWidth="xm">
      <StyledPaper elevation={3}>
        <LockOpenIcon style={{ fontSize: 55, marginLeft: '250px', marginBottom: '5px' }} />
        <Typography variant="h5" align="center" fontWeight={600}>
          LOGIN
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: '70%', marginLeft: '15%' }}
            label="Email"
            type="email"
            placeholder="   Enter your Email"
            value={email}
            InputProps={{
              startAdornment: <MailIcon color="action" fontSize="small" />,
            }}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: '70%', marginLeft: '15%' }}
            label="Password"
            type="password"
            placeholder="  Enter Your Password"
            value={password}
            InputProps={{
              startAdornment: <KeyIcon color="action" fontSize="small" />,
            }}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: '26%', marginTop: '10px', width: '44%' }}
          >
            Login
          </Button>
        <div  style={{marginLeft:"150px", marginTop:"10px",width: '30%'}}>
          <GoogleLogin
          
           clientId="575986163479-9pglu9vcjo67eo6up496p7sfn0nbnde7.apps.googleusercontent.com"
            onSuccess={responseGoogleSuccess}
            onError={responseGoogleError}
          />
          </div>
          {/* <Button
            type="button"
            variant="contained"
            style={{ marginLeft: '26%', marginTop: '10px', width: '44%' }}
            onClick={handleOpenForgotPasswordDialog}
          >
            Forgot Password
          </Button>
          {/* ... (existing form fields) */}
        </form> 

        {/* Render the ForgotPasswordDialog
        <ForgotPasswordDialog
          open={openForgotPasswordDialog}
          onClose={handleCloseForgotPasswordDialog}
          onSendVerificationCode={handleSendVerificationCode}
        /> */}
          <p style={{ marginLeft: '120px' }}>
            Don't have an account? <Link to="/register">Create One</Link>
          </p>
    
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
