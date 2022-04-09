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

module.exports = router