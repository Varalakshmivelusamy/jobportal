
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const jobSchema=new Schema({
    admin:{
        type:Schema.Types.ObjectId,
        ref:'Admin'
    },
    adminname:{
        type:String

    },
    companyName:{
        type:String
    },
    adminemail:{
        type:String
    },
    // jobId:{
    //    type:Number,
    //    require:true
    // },
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        //required: true
    },
    duration: {
        type: Number,
        //required: true
    },
    salary: {
        type: Number,
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    },
    deadline:{
		type: Date,
		//required: true
	}


    })
    module.exports=mongoose.model("job",jobSchema)