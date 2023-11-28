
import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkAuthLoader } from "../util/auth";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import BackgroungImage from "./image2.jpg"; 

import { useSelector, useDispatch } from "react-redux";  // Import useSelector and useDispatch
import { selectAuth } from "../util/redux/authSlice";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const linkStyle = {
  textDecoration: "none",
  color: "white",
  marginRight: "10px",
};

const tableStyle = {
  width: "50%",
  marginLeft: "300px",
};




const email = localStorage.getItem("email");

const UserApplicationDetails = () => {
  const navigate = useNavigate();
  const checking= checkAuthLoader();
  if(checking==="no token"){
   navigate("/")
  }
  // const email=useParams();
  const email= localStorage.getItem('email')
  // const { userId, email  } = useSelector(selectAuth);
  const userId = localStorage.getItem("userId");
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    // Fetch user application details based on userId and filterStatus
    axios
      .get(`http://localhost:3500/getapplication/${userId}`, {
        params: { status: filterStatus },
      })
      .then((response) => {
        // userId(localStorage.getItem("userId"));
        // Check if there is data in the response, and set userDetails accordingly
        if (
          response.data &&
          response.data.applications &&
          response.data.applications.length > 0
        ) {
          setUserDetails(response.data.applications);
        } else {
          setUserDetails([]); // Set userDetails to an empty array when there are no users
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
        
          console.error("Session expired. Please log in again.");
        
        } else {
      
          console.error("Error fetching user application details:", error);
        }
        setLoading(false);
      });
  }, [userId, filterStatus]);
  
 

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };
  const handleSkip = () => {
    navigate(`/main/${email}`);
  };
  const statusColors = {
    accept: "green",
    reject: "red",
    review: "blue", 
  };
 function handleLogout(){
  localStorage.clear();
 }
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroungImage})`, // Apply the background image
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
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
            <Button onClick={handleLogout}
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
      
    
      <Select
        value={filterStatus}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px" ,width:"200px", marginLeft:"80px",backgroundColor:"white",}}
        displayEmpty
      >
        <MenuItem value=""  >All Applications </MenuItem>
        <MenuItem value="accept" >Accepted</MenuItem>
        <MenuItem value="reject">Rejected</MenuItem>
        <MenuItem value="review">Under Review</MenuItem>
      </Select>

      {loading ? (
       
        <Typography>Loading...</Typography>
       
      )  : userDetails.length <= 0 ? (
        <Typography style={{textAlign:"center",fontWeight:"bold", }}>No applications found for this user.</Typography>
      ) : (
        <TableContainer component={Paper} style={tableStyle}>
          <Table>
            <TableHead style={{}}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Company Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Application Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.map((userDetail, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: "17px" }}>
                    {userDetail.username}
                  </TableCell>
                  <TableCell style={{ fontSize: "17px" }}>
                    {userDetail.companyName}
                  </TableCell>
                  <TableCell style={{ fontSize: "17px" }}>
                    {moment(userDetail.applicationDate).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell
                    style={{
                      color: statusColors[userDetail.status],
                      fontWeight: "bold",
                    }}
                  >
                    {userDetail.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
   
      )}

      {filterStatus && userDetails.length === 0 && (
        <Typography style={{textAlign:"center",fontWeight:"bold", }}>
          No applications with status "{filterStatus}" found for this user.
        </Typography>
      )}
    </div>
  );
};

export default UserApplicationDetails;
