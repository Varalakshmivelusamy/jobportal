import React, { useState, useEffect } from "react";
import { checkAuthLoader } from "../util/auth";
import { Link, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Backgroungimage from "./image2.jpg";
import { styled, InputAdornment, IconButton, Pagination } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { selectAuth } from "../util/redux/authSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import SettingsIcon from "@mui/icons-material/Settings";

import Swal from "sweetalert2";
import {
  setSearchQuery,
  setShowApplySuccess,
  setCurrentPage,
  setJobsPerPage,
  setTotalPages,
  setSelectedJob,
  setJobs,
  selectMainPage,
} from "../util/redux/mainPageSlice";
const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "82vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Backgroungimage})`,
}));

const MainHomepage = () => {
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  if (checking === "no token") {
    navigate("/");
  }
  const dispatch = useDispatch();
  const { email1 } = useParams();
  // const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const userId = localStorage.getItem("userId");
  const email =localStorage.getItem("email")
  // const { userId, email } = useSelector(selectAuth);
  console.log("@####", userId, email);
  // const [searchQuery, setSearchQuery] = useState("");
  const { jobs, currentPage, jobsPerPage, totalPages, searchQuery } =
    useSelector(selectMainPage);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [jobsPerPage, setJobsPerPage] = useState(6);
  // const [totalPages, setTotalPages] = useState(1);
  // const [showApplySuccess, setShowApplySuccess] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleVerificationClick = () => {
    handleMenuClose();
    navigate("/verification"); // Replace with your actual verification page route
  };
  const fetchJobs = (page, pageSize, query) => {
    axios
      .get(`/Jobs/?page=${page}&pageSize=${pageSize}&search=${query}`)
      .then((response) => {
        // const { jobs, totalPages } = response.data;

        // setJobs(jobs);
        // setTotalPages(totalPages);
        dispatch(setJobs(response.data.jobs));
        dispatch(setTotalPages(response.data.totalPages));
      })
      .catch((error) => {
        console.error("Error fetching job postings:", error);
      });
  };

  useEffect(() => {
    fetchJobs(currentPage, jobsPerPage, searchQuery);
  }, [currentPage, jobsPerPage]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchJobs(currentPage, jobsPerPage, searchQuery);
    }
  }, [searchQuery]);
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    Location: "",
    email: email,
    degree: [],
    skills: [],
  });
  useEffect(() => {
    axios
      .get(`/profile/${email}`)
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...response.data,
          userId: userId,
        }));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [email]);

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    fetchJobs(1, jobsPerPage, searchQuery);
  };

  const handleViewMore = (job) => {
    setSelectedJob(job);
  };
  const handlePageChange = (event, newpage) => {
    const newPageNumber = parseInt(newpage);

    if (newPageNumber >= 1 && newPageNumber <= totalPages) {
      dispatch(setCurrentPage(newPageNumber));
      fetchJobs(newPageNumber, jobsPerPage, searchQuery);
    }
  };
  const handleSubmit = async (jobId) => {
    formData.jobId = jobId;

    try {
      const response = await axios.post(
        `/applications/${userId}/${jobId}`,
        formData
      );

      console.log("Application submitted", response.data);
      setShowApplySuccess(true);
      toast.success("Application submitted");
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

        window.location.href = "/";
      } else if (error.response && error.response.status === 409) {
        toast.error("You already applied for this job!");
        console.log("Application submission failed", error.response.data);
      } else {
        console.error("Application submission failed", error);
        toast.error("Create your profile");
      }
    }
  };
  // Function to close the dialog
  const handleCloseDialog = () => {
    setSelectedJob(null);
  };
  const handleViewApplication = () => {
    navigate(`/getapplication/${userId}`);
  };
  function handleLogout() {
    localStorage.clear();
  }
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const handleProfileMenuClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleProfileUpdateClick = () => {
    handleProfileMenuClose();
    navigate(`/ProfileUpdate/${email}`); // Replace with your actual profile update route
  };

  return (
    <div>
      {isMobile && (
        <div>
          <AppBar position="static" sx={{ backgroundColor: "#00001a" }}>
            <Container>
           
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: "#00bfff",
                    marginLeft: "-23px",
                    marginRight: "10px",
                    "&:hover": {
                      backgroundColor: "#0A3D91",
                    },
                  }}
                >
                  <Link
                    to={`/ProfileUpdate/${email}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Profile
                  </Link>
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: "#00bfff",
                    marginRight: "10px",
                    width: "180px",
                    height: "40px",
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
                    marginRight: "00px",
                    backgroundColor: "#00bfff",
                    "&:hover": {
                      backgroundColor: "#0A3D91",
                    },
                  }}
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Logout
                  </Link>
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      )}

      {!isMobile && (
        <AppBar position="static" sx={{ backgroundColor: " #00001a" }}>
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

              {/* <Button
                color="inherit"
                sx={{
                  marginRight: "10px",
                  backgroundColor: "	 #00bfff",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "#0A3D91",
                  },
                }}
              > */}
                 {/* <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* ... (other buttons) */}

                {/* Settings Icon and Dropdown */}
                {/* <IconButton
                  color="inherit"
                  onClick={handleMenuClick}
                  sx={{ marginRight: "10px", backgroundColor: "#00bfff" }}
                >
                  <SettingsIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleVerificationClick}>
                    Verification
                  </MenuItem>
                  {/* Add more menu items as needed */}
                {/* </Menu>
              </Toolbar>   */}
              <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* ... (other buttons) */}

                {/* Profile Update Icon and Dropdown */}
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuClick}
                  sx={{ marginRight: "10px", backgroundColor: "#00bfff" }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleProfileUpdateClick}>
                    Profile Update
                  </MenuItem>
                  <MenuItem onClick={handleVerificationClick}>
                    Change Password
                  </MenuItem>
                  {/* Add more menu items as needed */}
                </Menu>
              </Toolbar>
              <Button
                color="inherit"
                sx={{
                  backgroundColor: "	 #00bfff",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "#0A3D91",
                  },
                  marginRight: "10px",
                }}
                onClick={handleViewApplication}
              >
                View Applied Jobs
              </Button>

              <Button
                onClick={handleLogout}
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
                <Link to="/" style={linkStyle}>
                  Logout
                </Link>
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {isMobile && (
        <Container
          style={{
            marginTop: "-10px",
            backgroundColor: "lightblue",
            height: "100%",
            minHeight: "900px",
          }}
        >
          <div
            style={{
              marginLeft: "-1px",
              width: "50%",
              marginTop: "10px",
            }}
          >
            <TextField
              placeholder="SearchJobs"
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ marginLeft: "230px" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              style={{ fontWeight: "bold" }}
            />
          </div>

          <Grid container spacing={2} justifyContent="flex-start">
            {jobs.map((job) => (
              <Grid item xs={12} sm={5} md={4} key={job._id}>
                <Card
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <CardHeader
                    title={job.jobtitle}
                    subheader={
                      <span style={{ fontWeight: "bold" }}>
                        {job.companyName}
                      </span>
                    }
                  />

                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {job.jobtype}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Pay Scale: </span>
                      {job.payScale}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                      {job.city}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ marginLeft: "80px", backgroundColor: "#00001a" }}
                      variant="contained"
                      color="primary"
                      onClick={() => job && job._id && handleSubmit(job._id)}
                    >
                      Apply
                    </Button>
                    <Button
                      style={{ marginLeft: "40px", backgroundColor: "#00001a" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewMore(job)}
                    >
                      View More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            style={{ marginTop: "50px", width: "60%", marginLeft: "150px" }}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Container>
      )}
      {!isMobile && (
        <StyledContainer maxWidth="xm">
          <div
            style={{
              position: "fixed",
              top: "0.4rem",
              left: "7rem",
              zIndex: 1000,
            }}
          >
            <TextField
              placeholder="SearchJobs"
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          <Grid container spacing={2} justifyContent="flex-start">
            {jobs.map((job) => (
              <Grid item xs={12} sm={5} md={4} key={job._id}>
                <Card
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <CardHeader
                    title={job.jobtitle}
                    subheader={
                      <span style={{ fontWeight: "bold" }}>
                        {job.companyName}
                      </span>
                    }
                  />

                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {job.jobtype}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Pay Scale: </span>
                      {job.payScale}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                      {job.city}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ marginLeft: "80px", backgroundColor: "#00001a" }}
                      variant="contained"
                      color="primary"
                      onClick={() => job && job._id && handleSubmit(job._id)}
                    >
                      Apply
                    </Button>

                    <Button
                      style={{ marginLeft: "40px", backgroundColor: "#00001a" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewMore(job)}
                    >
                      View More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              position: "Fixed",
              bottom: 5,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
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
      )}
      <Dialog
        open={Boolean(selectedJob)}
        onClose={handleCloseDialog}
        minWidth="lg"
        fullWidth
      >
        {selectedJob && (
          <>
            <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
              JOB DETAILS
            </DialogTitle>
            <DialogContent sx={{ padding: "20px" }}>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Job Title:</span>{" "}
                {selectedJob.jobtitle}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>CompanyName: </span>
                {selectedJob.companyName}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                {selectedJob.jobdescription}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Job Type: </span>
                {selectedJob.jobtype}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>PayScale:</span>{" "}
                {selectedJob.payScale}
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>Location: </span>
                {selectedJob.city}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                style={{ marginLeft: "20px", backgroundColor: "#00001a" }}
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(jobs._id)}
              >
                Apply
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseDialog}
                style={{ marginLeft: "20px", backgroundColor: "#00001a" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};
export default MainHomepage;
