import { useEffect } from "react";
import ProfileUpdate from "../components/profileUpdate";

import{redirect, useNavigate} from 'react-router-dom';
const ProfileUpdate=()=>{
  const navigate=useNavigate()
  const token = localStorage.getItem('token')
  useEffect(()=>{
  
      
      console.log("in check auth loader",token)
  
     
    if(!token){
        
    return  navigate("/login")
    }
    return null;

  },[token])
return(
  <ProfileUpdate/>

)
}
export default ProfileUpdate;