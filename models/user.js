const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
        country:{
            type:String,
        },
        lane1:{
            type:String,
        }
    },
    pastBookings:{
        type:Array,
        default:[]
    },
    upcomingBookings:{
        type:Array,
        default:[]
    },
    bookmarks:{
        type:Array,
        default:[]
    },
    banner:{
        type:String
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;