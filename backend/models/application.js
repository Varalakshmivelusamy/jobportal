const moongose =require('mongoose');
const Schema=moongose.Schema;
const applicationSchema=new Schema({
    jobId: {
        type: moongose.Schema.Types.ObjectId,
      
    },
    userId: {
        type: moongose.Schema.Types.ObjectId ,
      
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    
    username:{
        type:String
    },
    email:{
        type:String
    },
    Location:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    education: {
        type:String
    },
    skills: {
        type: Object,
        default:[]
    },
    schoolName:{
        type:String
    },
    degree:{
        type:String
    },
    collegeName:{
        type:String
    },
    age:{
        type:Number
    },
    marks:{
        type:Number
    },
    ctc:{
        type:Number
    },
    gender:{
        type:String
    },
    fieldOfStudy:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    experience:{
        type:String
    }, 

    status: {
        type: String,
        default: 'review', 
        enum: ['review', 'accept', 'reject'], 
      },
   
},

    {
        timestamps: true,
      },
    )
module.exports=moongose.model("applicaion",applicationSchema)