import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkAuthLoader } from "../util/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MobileResumeViewer from "./resumeView";
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import {
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Pagination,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import Backgroungimage from "./image2.jpg";
import Swal from "sweetalert2";

const acceptButtonStyle = {
  backgroundColor: " #2eb82e",
  color: "white",
  marginLeft: "10px",
};

const rejectButtonStyle = {
  backgroundColor: "red",
  color: "white",
  marginLeft: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const AdminApplicantDetails = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  if (checking === "no token") {
    navigate("/");
  }
  const [dialogOpen, setDialogOpen] = useState(false);

 
  const [anchorEl, setAnchorEl] = useState(null);

  const openJobsDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeJobsDropdown = () => {
    setAnchorEl(null);
  };
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [jobTitleSearch, setJobTitleSearch] = useState("");
  const [companyNameSearch, setCompanyNameSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/getApplicant/${email}/?page=${currentPage}${
          statusFilter ? `&status=${statusFilter}` : ""
        }&jobtitle=${jobTitleSearch}&companyName=${companyNameSearch}`
      );
      setApplicationDetails(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      setSearchError("");
    } catch (err) {
      setError("Failed to fetch application details");
      setLoading(false);
      setSearchError("No results found.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [email, currentPage, statusFilter]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.put(`/updateStatus/${applicationId}`, {
        status,
      });
      const updatedDetails = applicationDetails.map((detail) => {
        if (detail._id === applicationId) {
          return { ...detail, status };
        }
        return detail;
      });
      setApplicationDetails(updatedDetails);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        await Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Please log in again.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the login page
            window.location.href = "/login"; // Adjust this to your login page URL
          }
        });
      } else {
        console.error("Failed to update status:", err);
      }
    }
  };
  

  const openDialog = (applicant) => {
    setSelectedApplicant(applicant);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setSelectedApplicant(null);
    setDialogOpen(false);
    setDialogVisible(false);
  };
  const closeResumeDialog = () => {
    setDialogVisible(false);
  };
  
  const downloadResume = () => {
    setDialogOpen(true);

    // const resumeUrl = `http://localhost:3500/resume/${resumeFilename}`;
    // const link = document.createElement("a");
    // link.href = resumeUrl;
    // link.download = resumeFilename;
    // link.click();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    let filteredApplicants = applicationDetails;
    let pdfTitle = "";

    if (statusFilter === "accept") {
      filteredApplicants = applicationDetails.filter(
        (applicant) => applicant.status === "accept"
      );
      pdfTitle = "Accepted Applicants";
    } else if (statusFilter === "reject") {
      filteredApplicants = applicationDetails.filter(
        (applicant) => applicant.status === "reject"
      );
      pdfTitle = "Rejected Applicants";
    } else if (statusFilter === "review") {
      filteredApplicants = applicationDetails.filter(
        (applicant) => applicant.status === "review"
      );
      pdfTitle = "Review Applicants";
    } else {
      pdfTitle = "All Applicants";
    }

    if (filteredApplicants.length === 0) {
      alert(`No ${statusFilter} applicants found for generating a PDF.`);
    } else {
      const pdfContent = [pdfTitle];

      filteredApplicants.forEach((applicant, index) => {
        pdfContent.push(`Applicant #${index + 1}`);
        pdfContent.push(`Username: ${applicant.username}`);
        pdfContent.push(`Email: ${applicant.email}`);
        pdfContent.push(`age:${applicant.age}`);
        pdfContent.push(`status:${applicant.status}`);
        pdfContent.push(`Degree:${applicant.degree}`);
        pdfContent.push(`skills:${applicant.skills}`);
      });

      let position = 20;
      pdfContent.forEach((line) => {
        doc.text(line, 10, position);
        position += 10;
      });

      doc.save(`${pdfTitle}.pdf`);
    }
  };

  const handlePageChange = (event, newpage) => {
    setCurrentPage(newpage);
  };
  const handlepostjob = () => {
    navigate(`/jobs/${email}`);
  };

  const handleFilterChange = (event) => {
    setCurrentPage(1);
    setStatusFilter(event.target.value);
  };

  const handleSearch = () => {
    if (jobTitleSearch === "" && companyNameSearch === "") {
      setSearchError("Please enter a job title or company name.");
    } else {
      setSearchError("");
      setCurrentPage(1);
      fetchData();
    }
  };

  useEffect(() => {
    if (companyNameSearch === "" && jobTitleSearch === "") {
      fetchData();
    }
  }, [companyNameSearch, jobTitleSearch]);

  const handleLogout = () => {
    localStorage.clear();
  };

  const handlePostedjob = () => {
    navigate(`/PostedJob/${email}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Backgroungimage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {isMobile && (
        <AppBar
          sx={{ backgroundColor: "#00001a", width: "100%", height: "65px" }}
        >
          <Toolbar>
          <Button
              color="inherit"
              sx={{
                backgroundColor: "#00bfff",
                
                "&:hover": { backgroundColor: "#0A3D91" },
              }}
              onClick={openJobsDropdown}
            >
              Jobs
              <ExpandMoreIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeJobsDropdown}
            >
              <MenuItem onClick={handlepostjob}>Post Job</MenuItem>
              <MenuItem onClick={handlePostedjob}>View Posted Job</MenuItem>
            </Menu>

            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                width: "100px", // Set your desired width here
                marginLeft: "10px",
                backgroundColor: "#00bfff",
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
      )}
      {!isMobile && (
        <AppBar
          position="static"
          sx={{ backgroundColor: "#00001a", width: "100%", height: "65px" }}
        >
          <Toolbar>
            <Button
              color="inherit"
              sx={{
                backgroundColor: "#00bfff",
                marginLeft: "1000px",
                "&:hover": { backgroundColor: "#0A3D91" },
              }}
              onClick={openJobsDropdown}
            >
              Jobs
              <ExpandMoreIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeJobsDropdown}
            >
              <MenuItem onClick={handlepostjob}>Post Job</MenuItem>
              <MenuItem onClick={handlePostedjob}>View Posted Job</MenuItem>
            </Menu>

            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
               
                marginLeft: "10px",
                backgroundColor: "#00bfff",
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
      )}
      {isMobile && (
        <FormControl>
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            style={{
              marginBottom: "20px",
              width: "200px",
              marginLeft:"10px",
              backgroundColor: "white",
              marginTop: "80px",
            }}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="accept">Accepted</MenuItem>
            <MenuItem value="reject">Rejected</MenuItem>
            <MenuItem value="review">Under Review</MenuItem>
          </Select>
        </FormControl>
      )}
      {!isMobile && (
        <FormControl>
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            style={{
              marginBottom: "20px",
              width: "200px",
              marginLeft: "80px",
              backgroundColor: "white",
              marginTop: "20px",
            }}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="accept">Accepted</MenuItem>
            <MenuItem value="reject">Rejected</MenuItem>
            <MenuItem value="review">Under Review</MenuItem>
          </Select>
        </FormControl>
      )}
      {isMobile && (
        <FormControl style={{ marginBottom: "20px", marginLeft: "60px" }}>
          <TextField
            placeholder="Job Title"
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "50%",
                marginLeft: "-10px",
              },
            }}
            InputLabelProps={{
              style: {
                backgroundColor: "white",
                padding: "0 4px",
                borderRadius: "4px",
              },
            }}
            value={jobTitleSearch}
            onChange={(e) => setJobTitleSearch(e.target.value)}
          />
        </FormControl>
      )}
   
      {!isMobile && (
        <FormControl style={{ marginBottom: "20px", marginLeft: "60px" }}>
          <TextField
            placeholder="Job Title"
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "70%",
                marginTop: "20px",
              },
            }}
            InputLabelProps={{
              style: {
                backgroundColor: "white",
                padding: "0 4px",
                borderRadius: "4px",
              },
            }}
            value={jobTitleSearch}
            onChange={(e) => setJobTitleSearch(e.target.value)}
          />
        </FormControl>
      )}
      {isMobile && (
        <FormControl style={{ marginBottom: "20px", marginRight: "10px" }}>
          <TextField
            placeholder="Company Name"
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "40%",
                marginLeft: "180px",
                marginTop: "-80px",
              },
            }}
            InputLabelProps={{
              style: {
                backgroundColor: "white",
                padding: "0 4px",
                borderRadius: "4px",
              },
            }}
            value={companyNameSearch}
            onChange={(e) => setCompanyNameSearch(e.target.value)}
          />
        </FormControl>
      )}
      {!isMobile && (
        <FormControl style={{ marginBottom: "20px", marginRight: "10px" }}>
          <TextField
            placeholder="Company Name"
            InputProps={{
              style: {
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "70%",
                marginTop: "20px",
              },
            }}
            InputLabelProps={{
              style: {
                backgroundColor: "white",
                padding: "0 4px",
                borderRadius: "4px",
              },
            }}
            value={companyNameSearch}
            onChange={(e) => setCompanyNameSearch(e.target.value)}
          />
        </FormControl>
      )}
      {isMobile && (
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "45px",
            marginLeft: "50px",
            marginTop: "-20px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      )}
      {!isMobile && (
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "45px",
            marginLeft: "-50px",
            marginTop: "30px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      )}
      {isMobile && (
        <Button
          onClick={generatePDF}
          variant="contained"
          color="primary"
          style={{
            marginBottom: "4px",
            marginTop: "-60px",
            marginLeft: "10px",
          }}
        >
          Generate PDF
        </Button>
      )}
      {isMobile && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          style={{ marginLeft: "110px", marginTop: "-10px" }}
        />
      )}
      {!isMobile && (
        <Button
          onClick={generatePDF}
          variant="contained"
          color="primary"
          style={{
            marginBottom: "4px",
            marginTop: "-10px",
            marginLeft: "10px",
          }}
        >
          Generate PDF
        </Button>
      )}


{isMobile && searchError && (
  <Typography variant="body1" color="error" style={{  marginLeft:"150px",marginTop: "10px" ,fontWeight:"bold"}}>
    {searchError}
  </Typography>
)}
      {isMobile && (
        <div>
          {applicationDetails.map((detail, index) => (
            <Card
              key={detail._id}
              style={{ marginBottom: "10px", width: "80%", marginLeft: "50px" }}
            >
              <CardContent>
                <Typography variant="body1">
                  Applicant Name: {detail.username}
                </Typography>
                <Typography variant="body1">
                  Job Title: {detail.jobtitle}
                </Typography>
                <Typography variant="body1">
                  Company Name: {detail.companyName}
                </Typography>
                <Typography variant="body1">Email: {detail.email}</Typography>
                <Typography variant="body1">Status: {detail.status}</Typography>
              </CardContent>
              <CardActions>
                {detail.status !== "accept" && (
                  <Button
                    style={acceptButtonStyle}
                    onClick={() => handleStatusUpdate(detail._id, "accept")}
                  >
                    Accept
                  </Button>
                )}
                {detail.status !== "reject" && (
                  <Button
                    style={rejectButtonStyle}
                    onClick={() => handleStatusUpdate(detail._id, "reject")}
                  >
                    Reject
                  </Button>
                )}
                <Button onClick={() => openDialog(detail)}>View</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      {!isMobile && (
        <TableContainer
          component={Paper}
          style={{ width: "90%", marginLeft: "5%" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  ApplicantName
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Job Title</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  CompanyName
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  <div style={{ marginLeft: "50px" }}>Actions</div>
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Additional Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
              ) : searchError ? (
                <TableRow>
                  <TableCell colSpan={8}>{searchError}</TableCell>
                </TableRow>
              ) : applicationDetails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    {statusFilter === "review"
                      ? "No applications under review found."
                      : "No data found."}
                  </TableCell>
                </TableRow>
              ) : (
                applicationDetails.map((detail, index) => (
                  <TableRow key={detail._id}>
                    <TableCell style={{ fontSize: "15px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      {detail.username}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      {detail.jobtitle}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      {detail.companyName}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      {detail.email}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      {detail.status}
                    </TableCell>
                    <TableCell>
                      {detail.status !== "accept" && (
                        <Button
                          style={acceptButtonStyle}
                          onClick={() =>
                            handleStatusUpdate(detail._id, "accept")
                          }
                        >
                          {console.log(detail)}
                          Accept
                        </Button>
                      )}
                      {detail.status !== "reject" && (
                        <Button
                          style={rejectButtonStyle}
                          onClick={() =>
                            handleStatusUpdate(detail._id, "reject")
                          }
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => openDialog(detail)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
      )}

      {isMobile&&
       <Pagination
       count={totalPages}
       page={currentPage}
       style={ {marginLeft:"100px"}}
       onChange={handlePageChange}
     />}

      <Dialog open={dialogOpen} onClose={closeDialog} fullScreen>
     
        <DialogContent>
          <iframe
            src={`http://localhost:3500/resume/${selectedApplicant?.resume}`}
            width="100%"
            height="800px"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {!isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            position: "Fixed",
            bottom: 19,
            marginLeft: "40%",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
      {isMobile && (
         <Dialog open={dialogVisible} onClose={closeDialog}  minWidth="xm">
         <DialogTitle style={{ textAlign: "center" }}>
           Additional Details
         </DialogTitle>
         <DialogContent>
           {selectedApplicant && (
             <div>
               <DialogContentText>
                 Age: {selectedApplicant.age}
               </DialogContentText>
               <DialogContentText>
                 Phone Number: {selectedApplicant.phoneNumber}
               </DialogContentText>
               <DialogContentText>
                 State: {selectedApplicant.state}
               </DialogContentText>
               <DialogContentText>
                 City: {selectedApplicant.city}
               </DialogContentText>
               <DialogContentText>
                 Country: {selectedApplicant.country}
               </DialogContentText>
               <DialogContentText>
                 Degree: {selectedApplicant.degree}
               </DialogContentText>
               <DialogContentText>
                 Skills: {selectedApplicant.skills}
               </DialogContentText>
               <MobileResumeViewer
                  resumeUrl={`http://localhost:3500/resume/${selectedApplicant.resume}`}
                  onClose={closeResumeDialog}
                />
              
                
             </div>
           )}
         </DialogContent>
         <DialogActions>
           <Button onClick={closeDialog} color="primary">
             Close
           </Button>
         </DialogActions>
       </Dialog>
       
      )}
      {!isMobile && (
        <Dialog open={dialogVisible} onClose={closeDialog}  maxWidth="lg">
          <DialogTitle style={{ textAlign: "center" }}>
            Additional Details
          </DialogTitle>
          <DialogContent>
            {selectedApplicant && (
              <div>
                <DialogContentText>
                  Age: {selectedApplicant.age}
                </DialogContentText>
                <DialogContentText>
                  Phone Number: {selectedApplicant.phoneNumber}
                </DialogContentText>
                <DialogContentText>
                  State: {selectedApplicant.state}
                </DialogContentText>
                <DialogContentText>
                  City: {selectedApplicant.city}
                </DialogContentText>
                <DialogContentText>
                  Country: {selectedApplicant.country}
                </DialogContentText>
                <DialogContentText>
                  Degree: {selectedApplicant.degree}
                </DialogContentText>
                <DialogContentText>
                  Skills: {selectedApplicant.skills}
                </DialogContentText>
               
                <Button
                  onClick={() => downloadResume(selectedApplicant.resume)}
                >
                  View Resume
                </Button>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AdminApplicantDetails;





// import React, { useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux"; // Add import
// import { Link, useNavigate } from "react-router-dom";
// import BackgroungImage from "./image2.jpg";
// import { checkAuthLoader } from "../util/auth";
// import { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Container,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Select,
//   MenuItem,
// } from "@mui/material";

// // Import actions from userDetailsSlice
// import {
//   UserDetails,
//   setFilterStatus,
// } from "../util/redux/userDetailsReducer"; // Update with the correct path

// const linkStyle = {
//   textDecoration: "none",
//   color: "white",
//   marginRight: "10px",
// };

// const tableStyle = {
//   width: "50%",
//   marginLeft: "300px",
// };

// const UserApplicationDetails = () => {
//   const dispatch = useDispatch();
//   const userDetails = useSelector((state) => state.userDetails);

//   const navigate = useNavigate();
//   const checking = checkAuthLoader();
//   if (checking === "no token") {
//     navigate("/");
//   }

//   const email = localStorage.getItem("email");
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState();
//   const [filterStatus, setFilterStatus] = useState("");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     // Fetch user application details based on userId and filterStatus
//     // Replace the axios call with dispatching the action
//     dispatch(userDetails(userId, filterStatus));
//   }, [dispatch, userId, filterStatus]);

//   const handleFilterChange = (event) => {
//     // Replace the local state change with dispatching the action
//     dispatch(setFilterStatus(event.target.value));
//   };

//   const handleSkip = () => {
//     navigate(`/main/${email}`);
//   };

//   const statusColors = {
//     accept: "green",
//     reject: "red",
//     review: "blue",
//   };

//   function handleLogout() {
//     localStorage.clear();
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${BackgroungImage})`,
//         backgroundSize: "cover",
//         minHeight: "100vh",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <AppBar position="static" sx={{ backgroundColor: "#00001a" }}>
//         <Container>
//           <Toolbar>
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
//                 backgroundColor: " #00bfff",
//                 marginRight: "10px",
//                 "&:hover": {
//                   backgroundColor: "#0A3D91",
//                 },
//               }}
//               onClick={handleSkip}
//             >
//               Home
//             </Button>
//             <Button
//               onClick={handleLogout}
//               color="inherit"
//               sx={{
//                 backgroundColor: " #00bfff",
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

//       <Select
//         value={filterStatus}
//         onChange={handleFilterChange}
//         style={{
//           marginBottom: "20px",
//           width: "200px",
//           marginLeft: "80px",
//           backgroundColor: "white",
//         }}
//         displayEmpty
//       >
//         <MenuItem value="">All Applications </MenuItem>
//         <MenuItem value="accept">Accepted</MenuItem>
//         <MenuItem value="reject">Rejected</MenuItem>
//         <MenuItem value="review">Under Review</MenuItem>
//       </Select>

//       {loading ? (
//         <Typography>Loading...</Typography>
//       ) : userDetails.length <= 0 ? (
//         <Typography style={{ textAlign: "center", fontWeight: "bold" }}>
//           No applications found for this user.
//         </Typography>
//       ) : (
//         <TableContainer component={Paper} style={tableStyle}>
//           <Table>
//             <TableHead style={{}}>
//               <TableRow>
//                 <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   Company Name
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>
//                   Application Date
//                 </TableCell>
//                 <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {userDetails.map((userDetail, index) => (
//                 <TableRow key={index}>
//                   <TableCell style={{ fontSize: "17px" }}>
//                     {userDetail.username}
//                   </TableCell>
//                   <TableCell style={{ fontSize: "17px" }}>
//                     {userDetail.companyName}
//                   </TableCell>
//                   <TableCell style={{ fontSize: "17px" }}>
//                     {moment(userDetail.applicationDate).format(
//                       "MMMM Do YYYY"
//                     )}
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       color: statusColors[userDetail.status],
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {userDetail.status}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {filterStatus && userDetails.length === 0 && (
//         <Typography style={{ textAlign: "center", fontWeight: "bold" }}>
//           No applications with status "{filterStatus}" found for this user.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default UserApplicationDetails;
