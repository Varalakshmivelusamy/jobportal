import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"; // Import from '@mui/material'
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { ToastContainer, toast } from "react-toastify";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "95vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: "330px",
  padding: theme.spacing(3),
  backgroundColor: "#B3E5FC",
  borderRadius: "30px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  boxShadow:
    "10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)",
}));

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "", // Include the role field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding error message when input changes
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before making an API request
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, make the API request
    try {
      const response = await axios.post("/register", formData);
      console.log("Registration successful", response.data);
      toast.success("Registration  successful");
      setTimeout(function () {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration failed", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = "Username is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (!/^(?=.*[A-Z]).{6,8}$/.test(data.password)) {
      errors.password =
        "Password must contain an uppercase letter and be 6-8 characters long";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!data.role) {
      errors.role = "Role is required"; // Validate the role field
    }

    return errors;
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <HowToRegIcon
          style={{ fontSize: 55, marginLeft: "150px", marginBottom: "5px" }}
        />
        <Typography variant="h5" align="center">
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <Typography variant="body2" color="error">
              {errors.username}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Typography variant="body2" color="error">
              {errors.password}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <Typography variant="body2" color="error">
              {errors.confirmPassword}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <Typography variant="body2" color="error">
              {errors.email}
            </Typography>
          )}

          {/* Role Selection */}
          <FormControl variant="outlined" margin="normal" required fullWidth>
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="">Select a role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          {errors.role && (
            <Typography variant="body2" color="error">
              {errors.role}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </StyledPaper>
      {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
    </StyledContainer>
  );
};

export default Registration;
