const mongoose = require("mongoose");
const model= mongoose.model;
const Schema = mongoose.Schema;

//creating schema for mentor
const mentorSchema = new Schema({
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
    assignedStudents:[mongoose.ObjectId]
});

//creating model for mentor schema
mentor = model("mentors",mentorSchema);
module.exports = mentor;


