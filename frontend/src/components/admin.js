import React, { useState } from "react";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { checkAuthLoader } from "../util/auth";
import {
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import Backgroungimage from "./image2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationSelector from "./countryDropdown";
import { Select, MenuItem } from "@mui/material";

const containerStyle = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Backgroungimage})`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "85vh",
  minWidth: "150vh",
  backgroundSize: "cover",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "550px",
  padding: theme.spacing(3),
  borderRadius: "30px",
  backgroundSize: "box",
  backgroundRepeat: "no-repeat",
  boxShadow:
    "10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)",
  marginTop: "40px",
}));

const textFieldStyle = {
  marginBottom: "16px",
};

const submitButtonStyle = {
  marginTop: "16px",
  backgroundColor: "#0D47A1",
  color: "white",
  marginLeft: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const JobPosting = () => {
  // const { email } = useParams();
  const email =localStorage.getItem("email")
  const navigate = useNavigate();
  const checking= checkAuthLoader();
  if(checking==="no token"){
   navigate("/")
  }
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const getCity = (value) => {
    setSelectedCity(value);
  };
  const getCountry = (value) => {
    setSelectedCountry(value);
  };
  const getState = (value) => {
    setSelectedLocation(value);
    console.log("%%%", value);
  };

  const [formData, setFormData] = useState({
    jobid: "",
    jobtitle: "",
    jobtype: "",
    jobdescription: "",
    payScale: "",
    companyName: "",
    Location: "",
    email: "",
    phonenumber: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

   

    return newErrors;
  };

  const validateJobTitle = (title) => {
    const regex = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
    return regex.test(title);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "jobtitle") {
      if (!validateJobTitle(value)) {
        setErrors({
          ...errors,
          jobtitle: "Job title should only contain letters and spaces.",
        });
      } else {
        setErrors({
          ...errors,
          jobtitle: "",
        });
      }
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors({
          ...errors,
          email: "Please enter a valid email address.",
        });
      } else {
        setErrors({
          ...errors,
          email: "",
        });
      }
    }

    if (name === "payScale") {
      if (isNaN(value)) {
        setErrors({
          ...errors,
          payScale: "Pay scale must be a number.",
        });
      } else {
        setErrors({
          ...errors,
          payScale: "",
        });
      }
    }
    if (name === "phonenumber") {
      const regex = /^[0-9]*$/;
      if (value.length !== 10 || !regex.test(value)) {
        setErrors({
          ...errors,
          phonenumber:
            "Phone number must be exactly 10 digits and contain only numbers.",
        });
      } else {
        setErrors({
          ...errors,
          phonenumber: "",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    formData.city = selectedCity;
    formData.state = selectedLocation;
    formData.country = selectedCountry;

    try {
      const response = await axios.post(
        `/admin/${email}`,
        formData
      );
      console.log("Job posted successfully", response.data);
      toast.success("Job Posted Successfully");
      
    } catch (error) {
      console.error("Job posting failed", error);
      toast.error("job posted failed ")
    
    }
  };

  const handlePostedjob = () => {
   
    navigate(`/PostedJob/${email}`);
  };

  const handleApplicant = () => {
   
    navigate(`/getApplicant/${email}`);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  function handleLogout(){
    localStorage.clear();
  }
  const handleUpload = () => {
    if (selectedFile) {
      
      const formData = new FormData();
      formData.append("csvFile", selectedFile);

      axios
      .post("/uploadCSV", formData)
      .then((response) => {
        toast.success("Jobs Uploaded sucessfully")
        console.log("File uploaded successfully", response.data);
        setOpenDialog(false);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const backendValidationErrors = error.response.data.errors;
    
          // Display validation errors as toast notifications
          backendValidationErrors.forEach((error) => {
            toast.error(error, {
              position: "top-right",
              autoClose: 5000,
            });
          });
        } else {
          // Handle other errors, such as network issues or server errors
          console.error("File upload failed", error);
        }
      });
    }}

  return (
    <Container style={containerStyle}>
      
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00001a",
          width: "1199px",
          marginLeft: "-24px",
        }}
      >
        
        <Toolbar>
          <Button
            color="inherit"
            sx={{ backgroundColor: '	 #00bfff', marginLeft: '700px', '&:hover': { backgroundColor: '#0A3D91', }, }}
            onClick={handlePostedjob}
          >
            View Posted Job
          </Button>

          <Button
            color="inherit"
            sx={{
              backgroundColor: '	 #00bfff',
              marginLeft: '10px',
              '&:hover': {
                backgroundColor: '#0A3D91',
              }
            }}
            onClick={handleApplicant}
          >
            View Applicant
          </Button>
          <Button  onClick={handleLogout} color="inherit"  sx={{
              width: '10%',
              marginLeft: '10px',
              backgroundColor: '	 #00bfff',
              '&:hover': {
                backgroundColor: '#0A3D91',
              },
            }}>
            <Link to="/" style={linkStyle}>
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <StyledContainer maxWidth="sm">
        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit}>
         <Typography style={{textAlign:"center",fontWeight:"bold"}}>CREATEJOB</Typography>
         <br/>
            <TextField
              label="Job Title"
              name="jobtitle"
              value={formData.jobtitle}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "1%", marginBottom: "20px", marginRight:"8px" }}
              required
              error={!!errors.jobtitle}
              helperText={errors.jobtitle}
            />
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "40px", marginBottom: "20px" }}
              required
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "1%", marginBottom: "20px", marginRight:"8px" }}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "40px", marginBottom: "20px" }}
              required
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
            />

            <FormControl
              style={{ width: "40%", marginLeft: "1%", marginBottom: "10px",marginRight:"8px" }}
            >
              <InputLabel>Job Type</InputLabel>
              <Select
                label="Job Type"
                name="jobtype"
                value={formData.jobtype}
                onChange={handleChange}
                required
                error={!!errors.jobtype}
              >
                <MenuItem value="fulltime">Full-time</MenuItem>
                <MenuItem value="parttime">Part-time</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Pay Scale"
              name="payScale"
              value={formData.payScale}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "40px", marginTop: "3px" ,height:"30px"}}
              required
              error={!!errors.payScale}
              helperText={errors.payScale}
            />
            <Typography
              variant="body1"
              style={{ fontSize: "15px", marginLeft: "1%", color: "gray" }}
            >
              Job Description
            </Typography>
            <TextareaAutosize
              name="jobdescription"
              fullwidth
              placeholder="Job Description"
              value={formData.jobdescription}
              onChange={handleChange}
              style={{
                width: "40%",
                marginLeft: "1%",
              
                height: "55px",
                fontSize: "17px",
                fontFamily: "inherit",
              }}
              row
              required
              error={!!errors.jobdescription}
              helperText={errors.jobdescription}
            />
            <LocationSelector
              state={getState}
              country={getCountry}
              city={getCity}
            />
            <Button
            variant="contained"
            style={{backgroundColor:"#0D47A1",marginLeft:"20%",marginBottom:"-15px"}}
            onClick={() => setOpenDialog(true)}
          >
            Upload CSV
          </Button>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}   minWidth="xs" >
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={submitButtonStyle}
            >
              Post Job
            </Button>
          </form>
        </StyledPaper>
      </StyledContainer>
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
    </Container>
  );
};

export default JobPosting;
