// import React, { useState, useEffect } from "react";
// import { checkAuthLoader } from "../util/auth";
// import { Link, useParams } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";

// import Backgroungimage from "./image2.jpg";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Typography,
//   styled,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Axios from "axios";

// const AdminMain = () => {
//   const { email } = useParams();
//   const navigate = useNavigate();
//   const checking= checkAuthLoader();
//   if(checking==="no token"){
//    navigate("/")
//   }
//   const linkStyle = {
//     textDecoration: "none",
//     color: "white",
//     marginRight: "10px",
//   };

//   const handlePostedjob = () => {
//     navigate(`/PostedJob/${email}`);
//   };
//   function handleLogout(){
//       localStorage.clear()
//   }

//   const [applicationDetails, setApplicationDetails] = useState([]);
//   function getStatusBackgroundColor(status) {
//     switch (status) {
//       case 'accept':
//         return ' #85e085';
//       case 'reject':
//         return '#ff8080';
//       case 'review':
//         return '#6666ff';
//       default:
//         return '#f7f7f7'; // Default background color
//     }
//   }

//   useEffect(() => {
//     // Fetch count data from your API using Axios
//     Axios.get(`/count/${email}`)
//       .then((response) => {
//         setApplicationDetails(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching count data:", error);
//       });
//   }, [email]);

//   return (
//     <div>
//       <AppBar position="static" sx={{ backgroundColor: "#00001a", width: "100%", height: "65px" }}>
//         <Toolbar>
//           <Button color="inherit" sx={{ backgroundColor: "#00bfff", marginLeft: "900px", "&:hover": { backgroundColor: "#0A3D91" } }}>
//             <Link to={`/jobs/${email}`} style={linkStyle}>
//               post job
//             </Link>
//           </Button>
//           <Button color="inherit" sx={{ backgroundColor: "#00bfff", marginLeft: "10px", "&:hover": { backgroundColor: "#0A3D91" } }} onClick={handlePostedjob}>
//             View Posted Job
//           </Button>
//           <Button   onClick={handleLogout} color="inherit" sx={{ width: "10%", marginLeft: "10px", backgroundColor: "#00bfff", "&:hover": { backgroundColor: "#0A3D91" } }}>
//             <Link to="/" style={linkStyle}>
//               Logout
//             </Link>
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <div
//         style={{
//           background: `url(${Backgroungimage}) no-repeat center center fixed`,
//           backgroundSize: "cover",
//           minHeight: "95vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//        <div style={{ display: 'flex' }}>
//   {applicationDetails.map(statusDetail => (
//     <div
//       key={statusDetail.status}
//       className="status-box"
//       style={{
//         border: '1px solid #ccc',
//         padding: '10px',
//         margin: '10px',
//         borderRadius: '5px',
//         flex: 1,
//         textAlign:"center",
//         backgroundColor: getStatusBackgroundColor(statusDetail.status),
//       }}
//     >
//    { statusDetail.status==="accept" &&  <h3>Accepted Application</h3>}
//    { statusDetail.status==="reject" &&  <h3>Rejected Application</h3>}
//    { statusDetail.status==="review" &&  <h3>Application To Review</h3>}
//       <p style={{fontWeight:"30px", textAlign:"center"}}>{statusDetail.count}  Applications</p>
//     </div>
//   ))}
// </div>

//         <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>About Us </h1>
//         <Accordion style={{ margin: "10px 0", backgroundColor: "#f7f7f7", width: "550px" }}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <h2 style={{ fontSize: "18px" }}>Admin Dashboard</h2>
//           </AccordionSummary>
//           <AccordionDetails>
//             <p>
//               Describe the features and tools available in the admin dashboard, such as job management, user management, and analytics.
//             </p>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion style={{ margin: "3px 0", backgroundColor: "#f7f7f7", width: "550px" }}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <h2 style={{ fontSize: "18px" }}>Admin Team</h2>
//           </AccordionSummary>
//           <AccordionDetails>
//             <p>
//               Introduce the members of your admin team responsible for managing the job portal and assisting users.
//             </p>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion style={{ margin: "3px 0", backgroundColor: "#f7f7f7", width: "550px" }}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <h2 style={{ fontSize: "18px" }}>User Support</h2>
//           </AccordionSummary>
//           <AccordionDetails>
//             <p>
//               Explain how the admin team provides user support and assistance, including contact information for user inquiries.
//             </p>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion style={{ margin: "3px 0", backgroundColor: "#f7f7f7", width: "550px" }}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <h2 style={{ fontSize: "18px" }}>Security Measures</h2>
//           </AccordionSummary>
//           <AccordionDetails>
//             <p>
//               Detail the security measures in place to protect user data and ensure the safe operation of the job portal.
//             </p>
//           </AccordionDetails>
//         </Accordion>

//       </div>
//     </div>
//   );
// };

// export default AdminMain;











import React, { useState, useEffect } from "react";
import { checkAuthLoader } from "../util/auth";
import { Link, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Backgroungimage from "./image2.jpg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Axios from "axios";

const AdminMain = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const checking = checkAuthLoader();
  if (checking === "no token") {
    navigate("/");
  }
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    marginRight: "10px",
  };

  const handlePostedjob = () => {
    navigate(`/PostedJob/${email}`);
  };
  const handlepostjob=()=>{
    navigate(`/jobs/${email}`);
  }

  function handleLogout() {
    localStorage.clear();
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const openJobsDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeJobsDropdown = () => {
    setAnchorEl(null);
  };

  const [applicationDetails, setApplicationDetails] = useState([]);

  function getStatusBackgroundColor(status) {
    switch (status) {
      case "accept":
        return " #85e085";
      case "reject":
        return "#ff8080";
      case "review":
        return "#6666ff";
      default:
        return "#f7f7f7"; 
    }
  }

  useEffect(() => {

    Axios.get(`/count/${email}`)
      .then((response) => {
        setApplicationDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching count data:", error);
      });
  }, [email]);

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00001a",
          width: "100%",
          height: "65px",
        }}
      >
        <Toolbar>
        < Button
            color="inherit"
            sx={{
              backgroundColor: "#00bfff",
              marginLeft: "1000px",
              "&:hover": { backgroundColor: "#0A3D91" },
            }}
            onClick={openJobsDropdown}
            
          >
            
            Jobs  
            <ExpandMoreIcon/>
          </Button>  
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeJobsDropdown}
          >
            <MenuItem
             
              onClick={handlepostjob}>Post Job
            </MenuItem>
            <MenuItem onClick={handlePostedjob}>View Posted Job</MenuItem>
          </Menu>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{
              width: "10%",
              marginLeft: "10px",
              backgroundColor: "#00bfff",
              "&:hover": { backgroundColor: "#0A3D91" },
            }}
          >
            <Link to="/" style={linkStyle}>
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          background: `url(${Backgroungimage}) no-repeat center center fixed`,
          backgroundSize: "cover",
          minHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          {applicationDetails.map((statusDetail) => (
            <div
              key={statusDetail.status}
              className="status-box"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
                flex: 1,
                textAlign: "center",
                backgroundColor: getStatusBackgroundColor(statusDetail.status),
              }}
            >
              {statusDetail.status === "accept" && (
                <h3>Accepted Application</h3>
              )}
              {statusDetail.status === "reject" && <h3>Rejected Application</h3>}
              {statusDetail.status === "review" && (
                <h3>Application To Review</h3>
              )}
              <p style={{ fontWeight: "30px", textAlign: "center" }}>
                {statusDetail.count} Applications
              </p>
            </div>
          ))}
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>
          About Us
        </h1>
        <Accordion
          style={{
            margin: "10px 0",
            backgroundColor: "#f7f7f7",
            width: "550px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: "18px" }}>Admin Dashboard</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Describe the features and tools available in the admin dashboard,
              such as job management, user management, and analytics.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            margin: "3px 0",
            backgroundColor: "#f7f7f7",
            width: "550px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: "18px" }}>Admin Team</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Introduce the members of your admin team responsible for managing
              the job portal and assisting users.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            margin: "3px 0",
            backgroundColor: "#f7f7f7",
            width: "550px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: "18px" }}>User Support</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Explain how the admin team provides user support and assistance,
              including contact information for user inquiries.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            margin: "3px 0",
            backgroundColor: "#f7f7f7",
            width: "550px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2 style={{ fontSize: "18px" }}>Security Measures</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              Detail the security measures in place to protect user data and
              ensure the safe operation of the job portal.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default AdminMain;
