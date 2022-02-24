require("dotenv").config();
const ConnectionDB =require("./database");
const express = require("express");
const cors = require("cors");
const path = require("path");
const User = require('./models/user');
const Freelancer = require('./models/freelancer');
ConnectionDB();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//Available Routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/user",require("./routes/userdata"))

app.listen(port, () => {
    console.log(` backend listening at http://localhost:${port}`)
  })