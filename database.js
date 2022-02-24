const mongoose =require("mongoose");
require("dotenv").config;


const ConnectionDB =()=>{
    try {
        mongoose.connect(process.env.MONGO_URI,()=>{
            console.log("Connected to Database sucessfully")
        })
    } catch (error) {
      console.log(error)  
    }
}

module.exports =ConnectionDB;