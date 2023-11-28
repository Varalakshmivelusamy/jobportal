import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkAuthLoader } from "../util/auth";
import Swal from 'sweetalert2'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
  TextareaAutosize,
  listItemSecondaryActionClasses,
  CardHeader,
  CardActions,
  Pagination,
} from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Backgroungimage from "./image2.jpg";
import { useParams, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setShowApplySuccess,
  setCurrentPage,
  setJobsPerPage,
  setTotalPages,
  setSelectedJob,
  setJobs,
  selectMainPage,
} from '../util/redux/mainPageSlice';
const containerStyle = {
  marginTop: "1px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  minHeight: "90vh",
  backgroundSize: "100% auto",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Backgroungimage})`,
};

const cardStyle = {
  marginBottom: "20px",
};

const editButtonStyle = {
  marginRight: "8px",
};

const searchStyle = {
  width: "100%",
};

const errorMessageStyle = {
  textAlign: "center",
  color: "red",
};

const paginationStyle = {
  display: "flex",
  justifyContent: "space-between",
  position: "Fixed",
  bottom: 3,
  alignItems: "center",
  marginTop: "20px",
};
const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const PostedJob = () => {
  const email = useParams();
  const email1 = localStorage.getItem("email");
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  const dispatch = useDispatch();
  const { jobs, currentPage, jobsPerPage, totalPages, searchQuery } = useSelector(selectMainPage);
  if (checking === "no token") {
    navigate("/");
  }
  // const [jobs, setJobs] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedJob, setEditedJob] = useState({
    jobId: "",
    jobtitle: "",
    jobtype: "",
    jobdescription: "",
    payScale: "",
    // Location:"",
    city: "",
    companyName:"",
  });
  const [editedJobId, setEditedJobId] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [jobsPerPage, setJobsPerPage] = useState(6);
  // const [totalPages, setTotalPages] = useState(1);
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    fetchJobs(currentPage, jobsPerPage, searchQuery);
  }, [email, currentPage, jobsPerPage]);
  useEffect(() => {
    if (searchQuery === "") {
      fetchJobs(currentPage, jobsPerPage, searchQuery);
    }
  }, [searchQuery]);

  const fetchJobs = (page, pageSize, query) => {
    axios
      .get(
        `/admin/${email.email}/?page=${page}&pageSize=${pageSize}&search=${query}`
      )
      .then((response) => {
        dispatch(setJobs(response.data.jobs));
        dispatch(setTotalPages(response.data.totalPages));
        // setJobs(response.data.jobs);
        // setTotalPages(response.data.totalPages);
        setSearchError(
          response.data.jobs.length === 0 ? "No results found." : null
        );
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setSearchError("No results found.");
      });
  };

  const handleEditJob = (jobId) => {
    const jobToEdit = jobs.find((job) => job._id === jobId);
    if (jobToEdit) {
      setEditedJobId(jobId);
      setEditedJob({
        jobId: jobToEdit._id,
        companyName:jobToEdit.companyName,
        jobtitle: jobToEdit.jobtitle,
        jobtype: jobToEdit.jobtype,
        jobdescription: jobToEdit.jobdescription,
        payScale: jobToEdit.payScale,
      });
      setEditDialogOpen(true);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEditedJob = () => {
    if (!editedJobId) {
      return;
    }
  
    axios
      .put(`/admin/${editedJobId}`, editedJob)
      .then((response) => {
        toast.success("Job edited successfully");
        console.log("Job edited successfully:", response.data);
        setEditDialogOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // Handle 403 response (Session expired) with SweetAlert
          Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "error",
            button: "OK",
          }).then(() => {
            // Redirect or perform any action you want for session expiration
            // window.location.href = "/login"; // Example redirect to login page
          });
        } else {
          // Handle other errors
          toast.error("Error editing job:", error);
          console.error("Error editing job:", error);
        }
      });
  };
  
  const handleDeleteJob = (jobId) => {
    // Use SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this job!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    
    }).then((result) => {
      if (result.isConfirmed) {
  
        axios
          .delete(`/admin/${jobId}`)
          .then((response) => {
            toast.success('Job deleted successfully');
            console.log('Job deleted successfully:', response.data);
            fetchJobs(currentPage, jobsPerPage, searchQuery);
          })
          .catch((error) => {
            toast.error('Error deleting job');
            console.error('Error deleting job:', error);
          });
      }
    });
  };
  

  const handleSearch = () => {
    fetchJobs(1, jobsPerPage, searchQuery);
  };

  const handleApplicant = () => {
    // Navigate to the "View Applicant" page when the "View Applicant" button is clicked
    navigate(`/getApplicant/${email1}`);
  };
  function handleLogout() {
    localStorage.clear();
  }
  // const handlePageChange = (event, newpage) => {
  //   // setCurrentPage(newpage);
  //   dispatch(setJobsPerPage(newpage));
  // };

  const handlePageChange = (event, newpage) => {
    const newPageNumber = parseInt(newpage);
    
    if (newPageNumber >= 1 && newPageNumber <= totalPages) {
      dispatch(setCurrentPage(newPageNumber));
      fetchJobs(newPageNumber, jobsPerPage, searchQuery);
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00001a",
          width: "100%",
          marginLeft: "0px",
          height: "65px",
        }}
      >
        <Toolbar>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "	 #00bfff",
              marginLeft: "900px",
              "&:hover": { backgroundColor: "#0A3D91" },
            }}
          >
            <Link to={`/jobs/${email1}`} style={linkStyle}>
              post job
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{
              backgroundColor: "	 #00bfff",

              "&:hover": {
                backgroundColor: "#0A3D91",
              },
              marginLeft: "10px",
            }}
            onClick={handleApplicant}
          >
            View Applicant
          </Button>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{
              width: "10%",

              backgroundColor: "	 #00bfff",
              marginLeft: "10px",
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
      </AppBar>

      <Container style={containerStyle} maxWidth="xm">
        <div
          style={{
            position: "fixed",
            top: "0.4rem",
            left: "1rem",
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
        {searchError ? (
          <Typography variant="h6" style={errorMessageStyle}>
            {searchError}
          </Typography>
        ) : null}

        <Grid
          container
          spacing={2}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <div style={{ height: "100%" }}>
                <Card
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      {job.jobtitle}
                    </Typography>
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
                      <span style={{ fontWeight: "bold" }}>Status: </span>
                      {job.status}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>Location: </span>
                      {job.city}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{
                        marginLeft: "100px",
                        backgroundColor: "#00001a",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditJob(job._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginLeft: "30px", backgroundColor: "#00001a" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </div>
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
          {/* <div style={paginationStyle}>
          <Button
            style={{ backgroundColor: "#00bfff" }}
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
          <Typography variant="body1">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            style={{ backgroundColor: "#00bfff" }}
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next Page
          </Button> */}
        </div>

        <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit job details:</DialogContentText>
            <TextField
              margin="dense"
              label="Company Name"
              fullWidth
              name="company Name"
              value={editedJob.companyName}
              onChange={(e) =>
                setEditedJob({ ...editedJob, companyName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Job Title"
              fullWidth
              name="jobtitle"
              value={editedJob.jobtitle}
              onChange={(e) =>
                setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Job Type"
              fullWidth
              name="jobtype"
              value={editedJob.jobtype}
              onChange={(e) =>
                setEditedJob({ ...editedJob, [e.target.name]: e.target.value })
              }
            />
            <Typography
              variant="body1"
              style={{ fontSize: "12px", marginLeft: "3px", color: "gray" }}
            >
              Job Description
            </Typography>
            <TextareaAutosize
              margin="dense"
              label="Job Description"
              style={{ width: "550px", height: "45px", fontFamily: "inherit" }}
              name="jobdescription"
              value={editedJob.jobdescription}
              onChange={(e) =>
                setEditedJob({ ...editedJob, jobdescription: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Pay Scale"
              fullWidth
              name="payScale"
              value={editedJob.payScale}
              onChange={(e) =>
                setEditedJob({ ...editedJob, payScale: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEditedJob} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
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
    </div>
  );
};

export default PostedJob;
