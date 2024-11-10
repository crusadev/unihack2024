const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./users/routes");
const conversationsRouter = require("./messages/routes")
const filesRouter = require("./google_cloud/routes")
const app = express();

app.use(cors());

app.listen(process.env.PORT,() => {
    console.log("Server Started");
    mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("Connected to database")
    })
})

app.use("/users",usersRouter);
app.use("/conversations",conversationsRouter);
app.use("/files",filesRouter);