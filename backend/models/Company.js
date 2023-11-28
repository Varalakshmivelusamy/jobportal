const moongose =require('mongoose');
const Schema=moongose.Schema;

const companySchema=new Schema({

companyName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required: true,
},
    
    jobtitle:{
        type:String,
        required: true,
    },
    jobtype:{
        type:String,
          required: true,
      
    },
    jobdescription:{
        type:String,
        required: true,
    },
    payScale:{
        type:Number,
        require:true
    },
  

    Location:{
        type:String,
        require:false
    },
    
        email:{
            type:String,
             
        },
        phonenumber:{
            type:Number
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
        status: {
            type: String,
            default: 'active', 
            enum: ['active','inactive'], 
          },
    }
    



)
module.exports=moongose.model('Company',companySchema)