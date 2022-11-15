const express = require("express");
const dotenv= require("dotenv");
const mongooseConnection = require("./connect");
const mentorRouter = require("./Routers/mentorRouter");
const studentRouter = require("./Routers/studentRouter");

dotenv.config();
const app = express();

mongooseConnection.connectMongoose();

app.use(express.json());

app.use("/",(req,res,next)=>{
    console.log("assign-mentor application");
    next();
});

app.use("/mentor",mentorRouter);
app.use("/student",studentRouter);


app.listen(process.env.PORT);



