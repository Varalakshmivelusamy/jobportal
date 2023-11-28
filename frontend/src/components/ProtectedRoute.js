// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element, adminOnly }) => {
//   // Check if the user is authenticated and their role
//   const userRole = localStorage.getItem('userRole'); // Get the user's role from local storage

//   if (!userRole) {
//     // If the user's role is not found, redirect to the login page
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && userRole !== 'admin') {
//     // If adminOnly is true and the user is not an admin, redirect to a different page
//     return <Navigate to="/unauthorized" />;
//   }

//   // If authenticated and authorized, render the provided element/component
//   return <Route element={element} />;
// };

// export default ProtectedRoute;


import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, adminOnly }) => {
  // Check if the user is authenticated and their role
  const userRole = localStorage.getItem('userRole');
   // Get the user's role from local storage


  if (!userRole) {
    // If the user's role is not found, redirect to the login page
    return <Navigate to="/login" state={{ referrer: window.location.pathname }} />;
  }

  if (adminOnly && userRole !== 'admin') {
    // If adminOnly is true and the user is not an admin, redirect to a different page
    return <Navigate to="/unauthorized" state={{ referrer: window.location.pathname }} />;
  }

  // If authenticated and authorized, render the provided element/component
  return <Route element={element} />;
};

export default ProtectedRoute;



