const User=require("../models/user");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");

//Register Admin
const newRegister=async(req,res)=>{

    console.log(" in register")
    try{

        const{username,email,password,role}=req.body;
        if(!username||!email||!password||!role){
        return res.status(400).json({errorMessage:"please enter all required fields"});
        }
        if(password.length<5)
         return res.status(400).json({errorMessage:"enter valid password"})
        const existingUser= await User.findOne({username,email})
        if(existingUser){
            return res.status(409).json({errorMessage:"An account with this email already exist"})
        }
        const hashPassword= await bcrypt.hash(password,8);
//save newadmin
     const NewUser= new User({
        username:username,
        email:email,
        password:hashPassword,
        role:role,
     })
     const savedUser=NewUser.save()
    const token=jwt.sign(
        {
        _id: savedUser._id,
        role
       },
       process.env.JWT_SECRET,
      
    )
    console.log(token)
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
        
    })
    .send("cookies sent");
    }
    catch(err){
        console.error(err)
    }
}
// //login
//  const adminLogin=async(req,res)=>{
//     try{
//         const{adminname,email,password}=req.body;
//         const existingAdmin=await Admin.findOne({email,password,adminname})
//         if(!existingAdmin)
//         return res.status(401).json({errormessage:"wrong email or password or adminname"})
//        const passwordCheck=await bcrypt.compare(
//            password,
//            existingAdmin.password
//        );
//        if(!passwordCheck)
//        return res.status(401)
       
//     }catch(err){
//         console.error(err)
//     }
//  }
module.exports={newRegister}