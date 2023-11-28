import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationSelector from "./countryDropdown";
import { ToastContainer, toast } from "react-toastify";
import { checkAuthLoader } from "../util/auth";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Checkbox,
  Paper,
  Typography,
  TextField,
  Chip,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import Backgroungimage from "./image2.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";  // Import useSelector and useDispatch
import { selectAuth } from "../util/redux/authSlice";  // 
const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "82vh",
  minWidth: "70vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Backgroungimage})`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "500px",
  padding: theme.spacing(3),
  borderRadius: "30px",
  backgroundSize: "box",
  backgroundRepeat: "no-repeat",
  boxShadow:
    "10px 20px 10px rgba(0, 38, 66, 0.2), 10px 20px 10px rgba(132, 0, 50, 0.2)",
  marginTop: "40px",
}));

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  if (checking === "no token") {
    navigate("/");
  }

  // const { email } = useParams();


  // const { userId, email  } = useSelector(selectAuth);

  const token = localStorage.getItem("token");
  console.log("tooo",token)
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // const [dialogOpen, setDialogOpen] = useState(false);

  // const openDialog = () => {
  //   setDialogOpen(true);
  // };

  // const closeDialog = () => {
  //   setDialogOpen(false);
  // };

  const getCity = (value) => {
    setSelectedCity(value);
  };
  const getCountry = (value) => {
    setSelectedCountry(value);
  };
  const getState = (value) => {
    setSelectedLocation(value);
    
  };

  const [formData, setFormData] = useState({
    username: "",
    age: "",
    phoneNumber: "",
    email: "",
    degree: [],
    collegeName: "",
    schoolName: "",
    skills: [],
    gender: "",
    city: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const flattenedDegree = degrees.flat();
  const userId = localStorage.getItem("userId");
  const [dialogOpen, setDialogOpen] = useState(false);
  const email=localStorage.getItem("email")
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // useEffect(()=>{

  //     console.log("in check auth loader",token)

  //   if(!token){

  //   return  navigate("/")
  //   }
  //   return null;

  // },[token])

  useEffect(() => {
    console.log("userId", userId);
    axios
      .get(`http://localhost:3500/profile/${email}`)
      .then((response) => {
        setFormData(response.data);
        console.log("set", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [email, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDegreeChange = (e) => {
    const selectedValues = e.target.value;
    setSelectedDegrees(selectedValues);
  };

  const handleSkillChange = (e) => {
    const selectedValues = e.target.value;
    setSelectedSkills(selectedValues);
  };

  const handleGenderChange = (e) => {
    const selectedValue = e.target.value;
    setFormData({
      ...formData,
      gender: selectedValue,
    });
  };
  const [selectedResume, setSelectedResume] = useState(null);

  const handleResumeChange = (e) => {
    const resumeFile = e.target.files[0];
    setSelectedResume(resumeFile);
  };

  useEffect(() => {
    axios
      .get("/skills")
      .then((response) => {
        console.log("skills", response.data);
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/Degree")
      .then((response) => {
        setDegrees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching degrees:", error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSkip = () => {
    navigate(`/main/${email}`);
  };
  const handleViewApplication = () => {
    navigate(`/getapplication/${userId}`); // Replace '/view-application' with the actual path
  };
  function handleLogout() {
    localStorage.clear();
  }
  const validateForm = (data) => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.username)) {
      errors.username = "Username should contain letters and spaces only";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber =
        "Phone number should be 10 digits and contain digits only";
    }
    // Add other validation rules for the rest of the fields if needed
    if (!data.age) {
      errors.age = "Age is required";
    } else if (!/^[0-9]+$/.test(data.age)) {
      errors.age = "Age should contain numbers only";
    } else if (parseInt(data.age, 10) < 21) {
      errors.age = "Age should be greater than or equal to 21";
    }
    return errors;
  };

  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    if (!selectedResume) {
      toast.warning("Please select a resume file.");
      return; // Prevent form submission
    }

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const updatedData = {
        username: formData.username,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        degree: selectedDegrees.join(", "),
        collegeName: formData.collegeName,
        schoolName: formData.schoolName,
        skills: selectedSkills.join(", "),
        gender: formData.gender,
        city: selectedCity,
        state: selectedLocation,
        country: selectedCountry,
      };
    
      const formDataToSend = new FormData();
    
      formDataToSend.append("resume", selectedResume);
    
      for (const key in updatedData) {
        formDataToSend.append(key, updatedData[key]);
      }
    
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
   
      const response = await axios.put(`/profile/${email}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
       // Include the token in the Authorization header
        },
      });
      {console.log('token')} 
      toast.success("Profile Updated");
    
      console.log("Profile updated", response.data);
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Handle 403 response (Session expired) with SweetAlert2
        await Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
    
        window.location.href = "/"; // Replace with the actual login page path
      } else {
        toast.error("Profile update failed", error);
      }
    }
  }    

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("resume", formData);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#00001a" }}>
        <Container>
          <Toolbar>
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
                backgroundColor: " #00bfff",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#0A3D91",
                },
              }}
              onClick={handleSkip}
            >
              Home
            </Button>

            <Button
              color="inherit"
              sx={{
                backgroundColor: " #00bfff",
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
              onClick={handleLogout}
              color="inherit"
              sx={{
                backgroundColor: " #00bfff",
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

      <StyledContainer maxWidth="xm">
        <StyledPaper elevation={3} sx={{ maxWidth: "600px" }}>
          <PersonIcon
            style={{ fontSize: 55, marginLeft: "270px", marginBottom: "5px" }}
          />
          <Typography
            variant="h6"
            component="div"
            align="center"
            fontWeight={600}
          >
            PROFILE
          </Typography>

          <form className="C">
            <TextField
              margin="normal"
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "1%" }}
              required
              disabled={!isEditing}
            />
            {errors.username && (
              <div style={{ color: "red", marginLeft: "15%" }}>
                {errors.username}
              </div>
            )}
            <TextField
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "9%" }}
              required
              disabled={!isEditing}
            />
            {errors.email && (
              <div style={{ color: "red", marginLeft: "15%" }}>
                {errors.email}
              </div>
            )}
            <TextField
              margin="normal"
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "1%" }}
              disabled={!isEditing}
            />
            {errors.age && (
              <div style={{ color: "red", marginLeft: "15%" }}>
                {errors.age}
              </div>
            )}
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "50%",
                marginTop: "-60px",
              }}
              disabled={!isEditing}
            >
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                labelPlacement="end"
              />
            </RadioGroup>
            <TextField
              margin="normal"
              label="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{ width: "40%", marginLeft: "1%", marginTop: "30px" }}
              required
              disabled={!isEditing}
            />
            {errors.phoneNumber && ( // Display the error message if there is an error
              <div style={{ color: "red", marginLeft: "1%" }}>
                {errors.phoneNumber}
              </div>
            )}
            <Grid item xs={12}>
              {isEditing ? (
                <div style={{ marginTop: "-80px" }}>
                  <>
                    <InputLabel
                      id="degree-label"
                      sx={{ marginLeft: "50%" }}
                      htmlFor="degree"
                    >
                      Degree
                    </InputLabel>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "40%",
                        marginLeft: "50%",
                        marginBottom: 8,
                        border: "1px solid #ccc",
                      }}
                      labelId="degree-label"
                      id='"degree"'
                    >
                      <Select
                        multiple
                        label="degree"
                        name="degrees"
                        sx={{ height: "55px" }}
                        value={selectedDegrees}
                        onChange={handleDegreeChange}
                        disabled={!isEditing}
                        input={<Input />}
                        renderValue={(selected) => (
                          <div>
                            {selected.map((degree) => (
                              <Chip
                                key={degree}
                                label={degree}
                                style={{ margin: 2 }}
                              />
                            ))}
                          </div>
                        )}
                      >
                        {flattenedDegree.map((degree) => (
                          <MenuItem key={degree} value={degree}>
                            <Checkbox
                              checked={selectedDegrees.includes(degree)}
                            />
                            {degree}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                </div>
              ) : (
                <TextField
                  margin="normal"
                  label="degree"
                  name="degree"
                  value={formData.degree}
                  style={{
                    width: "40%",
                    marginLeft: "50%",
                    marginTop: "-63px",
                  }}
                  disabled={!isEditing}
                />
              )}

              {isEditing ? (
                <>
                  <InputLabel
                    id="skills-label"
                    sx={{ marginLeft: "1%", marginTop: "-5px" }}
                    htmlFor="skills"
                  >
                    Skills
                  </InputLabel>
                  <FormControl
                    variant="outlined"
                    style={{
                      width: "40%",
                      marginLeft: "1%",
                      border: "1px solid #ccc",
                      position: "relative",
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: {
                        transform: "none",
                      },
                    }}
                  >
                    <Select
                      label="Skills"
                      labelId="skills-label"
                      id="skills"
                      multiple
                      sx={{ height: "55px" }}
                      name="skills"
                      value={selectedSkills}
                      onChange={handleSkillChange}
                      disabled={!isEditing}
                      input={<Input />}
                      renderValue={(selected) => (
                        <div>
                          {selected.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              style={{ margin: 2 }}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {skills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          <Checkbox checked={selectedSkills.includes(skill)} />
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                <TextField
                  margin="normal"
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  style={{ width: "40%", marginLeft: "1%", marginTop: "-1px" }}
                  disabled={!isEditing}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              {isEditing ? (
                <LocationSelector
                  state={getState}
                  country={getCountry}
                  city={getCity}
                  onSelectLocation={setSelectedLocation}
                />
              ) : (
                <div>
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    style={{
                      width: "40%",
                      marginLeft: "50%",
                      marginTop: "-60px",
                    }}
                    disabled={!isEditing}
                  />
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    style={{
                      width: "40%",
                      marginLeft: "1%",
                    }}
                    disabled={!isEditing}
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    style={{
                      width: "40%",
                      marginLeft: "50%",
                      marginTop: "-60px",
                    }}
                    disabled={!isEditing}
                  />
                </div>
              )}
            </Grid>
            {isEditing ? (
              <>
                <label htmlFor="resumeInput">Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  required
                  id="resumeInput" // Add an id to associate the label with the input
                  style={{ width: "40%", marginLeft: "1%", marginTop: "30px" }}
                />
              </>
            ) : formData.resume ? (
              <div>
                <FileOpenIcon style={{ marginRight: "1px" }} />

                <Button onClick={openDialog}>Open Resume</Button>
              </div>
            ) : (
              "No resume uploaded"
            )}

            <Dialog open={dialogOpen} onClose={closeDialog} fullScreen>
              <iframe
                src={`http://localhost:3500/resume/${formData.resume}`}
                width="100%"
                height="800px"
              />
              <DialogActions>
                <Button onClick={closeDialog} color="error" variant="contained">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{
                  width: "45%",
                  marginLeft: "30%",
                  marginTop: "30px",
                  backgroundColor: "#00001a",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                style={{
                  width: "45%",
                  marginLeft: "30%",
                  marginTop: "30px",
                  backgroundColor: "#00001a",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Edit
              </Button>
            )}
          </form>
        </StyledPaper>
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
      </StyledContainer>
    </>
  );
};

export default ProfileUpdate;
