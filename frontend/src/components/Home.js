

import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Backgroungimage from "./image2.jpg";


import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
 
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home = () => {

  
const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '90vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${Backgroungimage})`,
  

}));

  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    navigate(`/login`); // Pass role as a route parameter
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: " #00001a" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Button
      color="inherit"
      sx={{
        backgroundColor: '	 #00bfff',
       marginRight:"10px",
     
        '&:hover': {
          backgroundColor: '#0A3D91', // Change the background color on hover
          // Add any other hover styles here
        },
      }}
      onClick={() => handleLoginClick('admin')}
    >
      Admin
    </Button>
          <Button color="inherit" sx={{ backgroundColor: '	 #00bfff',
        marginRight: '600px',
        '&:hover': {
          backgroundColor: '#0A3D91', // Change the background color on hover
          // Add any other hover styles here
        },}}onClick={() => handleLoginClick("user")}>
            User
          </Button>
        </Toolbar>
      </AppBar>
      <StyledContainer maxWidth="xm">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>About Our Job Portal</h1>
        <Accordion style={{ margin: '10px 0', backgroundColor: '#f7f7f7', width: '550px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: '18px' }}>Job Listings</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              View our latest job listings, which are updated regularly to help you find your dream job.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ margin: '3px 0', backgroundColor: '#f7f7f7', width: '550px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: '18px' }}>Application Process</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Learn about our application process and how you can apply for jobs on our platform.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ margin: '3px 0', backgroundColor: '#f7f7f7', width: '550px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: '18px' }}>User Support</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Get in touch with our support team if you have any questions or need assistance while using our job portal.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion style ={{ margin: '3px 0', backgroundColor: '#f7f7f7', width: '550px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: '18px' }}>Security Measures</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Your data's security is our priority. Learn about the measures we have in place to protect your information.
            </p>
          </AccordionDetails>
        </Accordion>
      </StyledContainer> 
   
    </>
     
   
  
  );
}; 
export default Home;












