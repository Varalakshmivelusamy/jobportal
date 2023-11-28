// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { checkAuthLoader } from "../util/auth";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Paper, 
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Container } from "@mui/material";
// import backgroundImage from "./image2.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const linkStyle = {
//   textDecoration: "none",
//   color: "white",
//   marginRight: "10px",
// };

// const paperStyle = {
//   padding: 20,
//   maxWidth: 500,
//   margin: "0 auto",
//   marginTop: 20,
// };

// const ApplyForm = () => {
//   const { email } = useParams();
//   const { userId, jobId } = useParams();
//   const navigate = useNavigate();
//   const checking= checkAuthLoader();
//   if(checking==="no token"){
//    navigate("/")
//   }

//   const [formData, setFormData] = useState({
//     username: "",
//     phoneNumber: "",
//     Location: "",
//     email: email,
//     degree: [],
//     skills: [],
//   });

//   const [errors, setErrors] = useState({
//     username: "",
//     phoneNumber: "",
//     email: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`/profile/${email}`)
//       .then((response) => {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           ...response.data,
//           userId: userId,
//           jobId: jobId,
//         }));
//       })
//       .catch((error) => {
//         console.error("Error fetching user details:", error);
//       });
//   }, [email]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const updatedErrors = {
//       username: "",
//       phoneNumber: "",
//       email: "",
//     };

//     // Validation logic
//     const usernameRegex = /^[A-Za-z]+$/;
//     if (!formData.username.trim() || !usernameRegex.test(formData.username)) {
//       updatedErrors.username = "Username is required and should contain only letters";
//       valid = false;
//     }
  

//     const phoneNumberRegex = /^\d{10}$/;
//     if (!phoneNumberRegex.test(formData.phoneNumber)) {
//       updatedErrors.phoneNumber = "Phone Number is required and should contain 10 digits";
//       valid = false;
//     }

//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
//     if (!emailRegex.test(formData.email)) {
//       updatedErrors.email = "Invalid email address";
//       valid = false;
//     }

//     setErrors(updatedErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return; // Don't submit if the form is not valid
//     }

//     try {
//       const response = await axios.post(
//         `/applications/${userId}/${jobId}`,
//         formData
//       );
//       console.log("Application submitted", response.data);
//       toast.success("Application submitted");

//       setFormData({
//         username: formData.username,
//         phoneNumber: formData.phoneNumber,
//         Location: "",
//         email: email,
//         degree: [],
//         skills: [],
//       });
//       setErrors({
//         username: "",
//         phoneNumber: "",
//         email: "",
//       });
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         console.log("Application submission failed", error.response.data);
//         toast.error("You already applied for this job!");
//       } else {
//         console.error("Application submission failed", error);
//         toast.error("create your profile");
//       }
//     }
//   };

//   const handleViewApplication = () => {
//     navigate(`/getapplication/${userId}`);
//   };

//   const handleSkip = () => {
//     navigate(`/main/${email}`);
//   };
//   function handleLogout(){
//     localStorage.clear();
//   }

//   return (
//     <div style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "100vh" }}>
//       <AppBar position="static" sx={{ backgroundColor: "#00001a" }}>
//         <Container>
//           <Toolbar>
//             <Button
//               color="inherit"
//               sx={{
//                 backgroundColor: "#00bfff",
//                 marginLeft: "600px",
//                 "&:hover": {
//                   backgroundColor: "#0A3D91",
//                 },
//               }}
//               onClick={handleSkip}
//             >
//               Home
//             </Button>
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{
//                 flexGrow: 1,
//                 fontFamily: "Arial",
//                 fontWeight: "bold",
//               }}
//             ></Typography>
//             <Button
//               color="inherit"
//               sx={{
//                 backgroundColor: "#00bfff",
//                 marginRight: "10px",
//                 "&:hover": {
//                   backgroundColor: "#0A3D91",
//                 },
//               }}
//               onClick={handleViewApplication}
//             >
//               View Applied Jobs
//             </Button>

//             <Button
//               color="inherit"
//               sx={{
//                 marginRight: "10px",
//                 backgroundColor: "	 #00bfff",
//                 marginRight: "10px",
//                 "&:hover": {
//                   backgroundColor: "#0A3D91",
//                 },
//               }}
//             >
//               <Link to={`/ProfileUpdate/${email}`} style={linkStyle}>
//                 profileUpdate
//               </Link>
//             </Button>
//             <Button onClick={handleLogout}
//               color="inherit"
//               sx={{
//                 backgroundColor: "#00bfff",
//                 marginRight: "10px",
//                 "&:hover": {
//                   backgroundColor: "#0A3D91",
//                 },
//               }}
//             >
//               <Link to="/" style={linkStyle}>
//                 Logout
//               </Link>
//             </Button>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       <Container>
//         <Paper elevation={3} style={paperStyle}>
//           <Typography variant="h6" gutterBottom>
//             Apply for the Job
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//                 {errors.username && <div className="error-message"style={{color: "red"}}>{errors.username}</div>}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Phone Number"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                 />
//                 {errors.phoneNumber && <div className="error-message"style={{color: "red"}}>{errors.phoneNumber}</div>}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <div className="error-message" style={{color: "red"}}>{errors.email}</div>}
//               </Grid>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 style={{
//                   marginLeft: "152px",
//                   marginTop: "10px",
//                   backgroundColor: "#00001a",
//                 }}
//               >
//                 Submit Application
//               </Button>
//             </Grid>
//           </form>
//         </Paper>
//         <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//       </Container>
//     </div>
//   );
// };

// export default ApplyForm;





import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkAuthLoader } from "../util/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";
import backgroundImage from "./image2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const paperStyle = {
  padding: 20,
  maxWidth: 500,
  margin: "0 auto",
  marginTop: 20,
};

const ApplyForm = () => {
  const { email } = useParams();
  const { userId, jobId } = useParams();
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  if (checking === "no token") {
    navigate("/");
  }

  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`/profile/${email}`)
      .then((response) => {
        setFormData({
          userId: userId,
          jobId: jobId,
          email: email,
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/applications/${userId}/${jobId}`, formData);
      console.log("Application submitted", response.data);
      toast.success("Application submitted");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Application submission failed", error.response.data);
        toast.error("You already applied for this job!");
      } else {
        console.error("Application submission failed", error);
        toast.error("create your profile");
      }
    }
  };

  const handleViewApplication = () => {
    navigate(`/getapplication/${userId}`);
  };

  const handleSkip = () => {
    navigate(`/main/${email}`);
  };

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#00001a" }}>
        <Container>
          <Toolbar>
            <Button
              color="inherit"
              sx={{
                backgroundColor: "#00bfff",
                marginLeft: "600px",
                "&:hover": {
                  backgroundColor: "#0A3D91",
                },
              }}
              onClick={handleSkip}
            >
              Home
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Arial",
                fontWeight: "bold",
              }}
            ></Typography>
            <Button
              color="inherit"
              sx={{
                backgroundColor: "#00bfff",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#0A3D91",
                },
              }}
              onClick={handleViewApplication}
            >
              View Applied Jobs
            </Button>

            <Button
              color="inherit"
              sx={{
                marginRight: "10px",
                backgroundColor: "	 #00bfff",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#0A3D91",
                },
              }}
            >
              <Link to={`/ProfileUpdate/${email}`} style={linkStyle}>
                profileUpdate
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                backgroundColor: "#00bfff",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#0A3D91",
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
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <Typography variant="h6" gutterBottom>
            Apply for the Job
          </Typography>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginLeft: "152px",
                marginTop: "10px",
                backgroundColor: "#00001a",
              }}
            >
               Apply
            </Button>
          </form>
        </Paper>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Container>
    </div>
  );
};

export default ApplyForm;


