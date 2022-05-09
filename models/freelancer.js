const mongoose = require('mongoose');
const { Schema } = mongoose;

const FreelancerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobileNo:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    location:{  
        type:Array,
        default:[]
    },
    bio:{
        type: String,
    },
    About:{
        type: String,
    },
    Avatar:{
        type:String
    },
    Address:{
        city:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:Number
        },
    },
    pastCustomers:{
        type:Array,
        default:[]
    },
    upcomingCustomers:{
        type:Array,
        default:[]
    },
    pendingCustomers:{
        type:Array,
        default:[]
    },
    avgRating:{
        type: Number
    },
    review:{
        type:Array,
    },
    experience:{
        type:Array,
        default:[]
    },
    banner:{
        type:String
    },
    CVandCert:{
        type:Array,
        default:[]
    },
    charge:{
        type:String
    },
    rating:{
        type:Number,
    },
    category:{
        type:String,
    }
  });
  const Freelancer = mongoose.model('freelancer', FreelancerSchema);
  module.exports = Freelancer;