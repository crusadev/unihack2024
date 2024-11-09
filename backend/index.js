const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoute = require("./users/routes");
const app = express();

app.use(cors());

app.listen(process.env.PORT,() => {
    console.log("Server Started");
    mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("Connected to database")
    })
})

app.use("/users",usersRoute)