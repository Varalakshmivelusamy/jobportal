
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkAuthLoader } from './util/auth';
import Root from './page/root';
import Homepage from './page/Homepage';
import Loginform from './page/loginform';
import Registrationform from './page/Registrationform';
import Profilepage from './page/profile';
import MyHomepage from './page/MainHomePage';
import AdminPages from './page/adminPage';
import ProfileUpdate from './components/profileUpdate';
import PostedJob from './page/postedJob';
import Apply from'./page/Applyforms';
import Application from './page/viewApplication';
import Applicant from './page/applicant';
import AdminmainPages from './page/adminmain';
import LocationSelector from './components/countryDropdown';
import ChangePasswordForm from './components/mailverfication';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}   >
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Registrationform />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/profile/:email"   element={<Profilepage />}  />
          <Route path="/profileUpdate/:email"   element={<ProfileUpdate/>} />
          <Route path="/main/:email" element={<MyHomepage />} />
          
          <Route path="/admin/:email"
            element={<AdminmainPages />}  loader={checkAuthLoader }/>
          
         </Route> 
         <Route path="/jobs/:email" element={<AdminPages />}   loader={checkAuthLoader}/> 
        <Route path="/PostedJob/:email" element={<PostedJob />}  loader={checkAuthLoader }/>
        <Route path="/apply/:userId/:jobId/:email" element={<Apply/>} loader={checkAuthLoader }/>
        <Route path="/getapplication/:jobId" element={<Application/>} loader={checkAuthLoader }/>
        <Route path="/getApplicant/:email" element={<Applicant/>} loader={checkAuthLoader } />
        <Route path="/location" element={<LocationSelector/>} loader={checkAuthLoader }/>
         <Route path="/verification" element={<ChangePasswordForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


