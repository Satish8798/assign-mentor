const mongoose = require("mongoose");
const model= mongoose.model;
const Schema = mongoose.Schema;

//schema for student
const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
        unique: true
    },
    assignedMentor:{
        type: mongoose.ObjectId
    }
});

//creating model using student schema
student = model("students",studentSchema);
module.exports = student;