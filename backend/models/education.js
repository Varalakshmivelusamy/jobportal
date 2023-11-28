const moongose =require('mongoose');
const Schema=moongose.Schema;
const educationSchema=new Schema({
   school:{
    type:String,
    reuire:true
   },
   schoolname:{
    type:String,
    require:true
   },
   schoollocation:{
    type:String,
    reuire:true
   },
   YearofPassing:{
    type:Date
   },
    
    university:{
        type:String,
        require:false
    },
    ctc:{
        type:Number
    },
    collegeName:{
        type:String
    },
    Location:{
        type:String
    },

 
})
module.exports=moongose.model('education',educationSchema)