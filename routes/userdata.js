const express = require('express');
const User = require('../models/user');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Freelancer = require('../models/freelancer');
const { request } = require('express');


// ROUTE 1: update user location using: 
//POST route "/api/user/updatelocation".
router.post('/updatelocation', fetchuser, async (req, res) => {
  try {
    User.updateOne({ _id: req.user.id },
      { $push: { location: req.body.location } }, function (err, docs) {
        if (err) {
          console.log(err)
          res.status(500).send("Internal Server Error");
        }
        else {
          // console.log("Updated Docs : ", docs);
          res.send("Success");
        }
      })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 2: delete user location using: 
//POST route "/api/user/deletelocation".
router.post('/deletelocation', fetchuser, async (req, res) => {
  try {
    User.updateOne({ _id: req.user.id },
      { $pull: { location: { $in: [req.body.location] } } }, function (err, docs) {
        if (err) {
          console.log(err)
          res.status(500).send("Internal Server Error");
        }
        else {
          if (docs.modifiedCount == 0) {
            res.send("No such location to delete!")
          }
          else {
            res.send("Success");
          }

        }
      })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 3:delete all location history: 
//POST route "/api/user/deletealllocation".
router.post('/deletealllocation', fetchuser, async (req, res) => {
  try {
    User.updateOne({ _id: req.user.id },
      { $set: { location: [] } }, function (err, docs) {
        if (err) {
          console.log(err)
          res.status(500).send("Internal Server Error");
        }
        else {
          if (docs.modifiedCount == 0) {
            res.send("No location history to delete!")
          }
          else {
            res.send("Success");
          }

        }
      })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.get('/findfreelancers', async (req, res) => {
  try {
    let type="electrician";
    const data=await Freelancer.find({"category":type}).select("-password")
    res.status(200).send(data)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.get('/findfreelancers/:id', async (req, res) => {
  try {
    let id=req.params.id;
    const data=await Freelancer.findById(id).select("-password")
    res.status(200).send(data)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//not tested yet
router.post('bookfreelancer/:id', fetchuser,async (req,res)=>{
  try {
    const f=Freelancer.findById(req.params.id);
    if(!f){
      res.status(404).send("Freelancer not found");
    }
    else{
      User.updateOne({ _id: req.user.id },
        { $push: { upcomingBookings: {freelancerId:req.params.id,freelancerName:f.name,freelancerEmail:f.email} } }, function (err, docs) {
          if (err) {
            console.log(err)
            res.status(500).send("Internal Server Error");
          }
          else {
            // console.log("Updated Docs : ", docs);
            res.send("Success");
          }
        })
        const u=User.findById(req.user.id);
        Freelancer.updateOne({ _id: req.params.id },
          { $push: { pendingCustomers: {userId:req.user.id,userName:u.name,freelancerEmail:u.email} } }, function (err, docs) {
            if (err) {
              console.log(err)
              res.status(500).send("Internal Server Error");
            }
            else {
              // console.log("Updated Docs : ", docs);
              res.send("Success");
            }
          })
    }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/bookmark/:id',fetchuser,async(req,res)=>{
  try {
    const fl=Freelancer.findById(req.params.id);
    console.log(fl);
    if(!fl){
      res.status(404).send("Freelancer not found");
    }
    else{
      User.updateOne({ _id: req.user.id },
        { $push: { bookmarks: {freelancerId:req.params.id,freelancerName:fl.name,freelancerEmail:fl.email} } }, function (err, docs) {
          if (err) {
            console.log(err)
            res.status(500).send("Internal Server Error");
          }
          else {
            // console.log("Updated Docs : ", docs);
            res.status(200).send("Success");
          }
        })
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//get bookmark pending
router.get('/getbookmarks',fetchuser,async (req,res)=>{
  try {
    const us=User.findById(req.user.id);
    res.send(us.bookmarks)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router