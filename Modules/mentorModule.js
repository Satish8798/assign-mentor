const MentorModel = require("../Models/mentorModel")

module.exports.createMentor=async (req,res)=>{
    const mentorData= new MentorModel({...req.body.mentor})
    try {
        mentorData.save();
        res.send({
            message: "mentor created"
        })
    } catch (error) {
        console.error(error);
        res.status(400).send({
            msg: error
        })
    }
}

module.exports.assignStudent=async (req,res)=>{
    
}

module.exports.getMentorStudents=async (req,res)=>{
    
}