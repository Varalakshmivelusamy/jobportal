


 export function getAuthToken(){

     const token= localStorage.getItem('token') 
     console.log(token)
     return token;
 }
  export function tokenLoader(){
    return getAuthToken()
  }

  export  function checkAuthLoader(){
    const token = localStorage.getItem('token')
    console.log("in check auth loader",token)

   
  if(!token){
     console.log(token)
    return "no token"
  }
  return null;
  }


