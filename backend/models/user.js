const moongose =require('mongoose');
const Schema=moongose.Schema;

 const userSchema=new Schema({
  username:{
    type:String,

  
  },
 
  email:{
    type:String,
    
    require:true
  },
  password:{
    type:String,
    // require:true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
},
gender: {
    type: String,
    enum: ['Female', 'Male', 'Other'], // Restrict the values to these options
   // Make the field required
  },
  
    phoneNumber:{
        type:String,
        
    },
    education: {
        type:String
    },
    skills: {
        type:Object,
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
        type:String
    },
    marks:{
        type:Number
    },
    ctc:{
        type:Number
    },
    // gender:{
    //     type:String
    // },
    fieldOfStudy:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    experience:{
        type:String
    }, 
    companyName: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    country:{
        type:String,
        default:""
         
    },
    state:{
        type:String,
        default:""

    },

    city:{
        type:String,
        default:""
    },
    resume:{
        type:String

    },
    verificationCode: {
        type: String,
      },
   }
 )
 module.exports=moongose.model('user',userSchema)
 