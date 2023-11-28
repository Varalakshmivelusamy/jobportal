import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import Backgroungimage from "./images/background.jpg";
import Grid from "@mui/material/Grid";

import {
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Chip,
  Input,
  Checkbox,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "95vh",
  minWidth: "150vh",
  backgroundSize: "cover", // Set background size to cover
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Backgroungimage})`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "500px",
  padding: theme.spacing(3),
  backgroundColor: "#d1e0e0",
  borderRadius: "30px",
  backgroundSize: "box",
  backgroundRepeat: "no-repeat",
  boxShadow:
    "10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)",
}));

const Profile = () => {
  const { email } = useParams();
  console.log("email", email);
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    phoneNumber: "",
    email: "",
    degree: "",
    collegeName: "",
    schoolName: "",
    skills: [],
    gender: "",
    dateofbirth: "",
    Fieldofstudy: "",
    Experience: "",
    ctc: "",
  });
  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = "Name is required";
    } else if (!/^[A-Za-z]+$/i.test(data.username)) {
      errors.username = "Username should contain letters only";
    }

    if (!data.age) {
      errors.age = "Age is required";
    } else if (!/^\d+$/i.test(data.age)) {
      errors.age = "Age should contain only numbers";
    }

    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/i.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(data.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!data.degree) {
      errors.degree = "Degree is required";
    }

    if (!data.collegeName) {
      errors.collegeName = "College name is required";
    }

    if (!data.schoolName) {
      errors.schoolName = "School name is required";
    }

    if (!data.skills) {
      errors.skills = "Skills are required";
    }

    return errors;
  };
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const flattenedSkills = skills.flat(); // Flatten the nested skills array
  console.log(flattenedSkills);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/skills")
      .then((response) => {
        setSkills(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3500/profile/${email}`,
        formData
      );
      //   const email=response.data.email
      //   console.log(email);
      console.log("Profile updated", response.data);
      alert("Profile Updated");

      navigate(`/main/${email}`);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error("Profile update failed", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleSkip = () => {
    // Navigate back to the homepage when the Skip button is clicked
    navigate(`/main/${email}`);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <PersonIcon
          style={{ fontSize: 55, marginLeft: "220px", marginBottom: "5px" }}
        />
        <Typography variant="h5" align="center" fontWeight={600}>
          Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "70%", marginLeft: "15%" }}
            label="Name"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
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
            style={{ width: "70%", marginLeft: "15%" }}
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && (
            <Typography variant="body2" color="error">
              {errors.age}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "70%", marginLeft: "15%" }}
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Gender"
            type="tel"
            name="Gender"
            value={formData.gender}
            onChange={handleChange}
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "70%", marginLeft: "15%" }}
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
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%", marginLeft: "15%" }}
            label="Degree"
            type="text"
            name="degree"
            value={formData.education}
            onChange={handleChange}
          />
          {errors.education && (
            <Typography variant="body2" color="error">
              {errors.degree}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%", marginLeft: "15%" }}
            label="College Name"
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
          />
          {errors.collegeName && (
            <Typography variant="body2" color="error">
              {errors.collegeName}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%", marginLeft: "15%" }}
            label="School Name"
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
          />
          {errors.schoolName && (
            <Typography variant="body2" color="error">
              {errors.schoolName}
            </Typography>
          )}{" "}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                style={{ width: "70%", marginLeft: "15%" }}
                margin="normal"
              >
                <InputLabel>Skills</InputLabel>
                <Select
                  multiple
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((skill) => (
                        <Chip key={skill} label={skill} style={{ margin: 2 }} />
                      ))}
                    </div>
                  )}
                >
                  {flattenedSkills.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      <Checkbox checked={formData.skills.includes(skill)} />
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "70%", marginLeft: "15%" }}
          >
            Update Profile
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ width: "70%", marginLeft: "15%", marginTop: "10px" }}
            onClick={handleSkip}
          >
            Skip
          </Button>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Profile;
