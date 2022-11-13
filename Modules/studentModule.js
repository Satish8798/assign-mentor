const studentModel = require("../Models/studentModel")

module.exports.createStudent=async (req,res)=>{
    const studentData= new studentModel({...req.body.student})
    try {
        studentData.save();
        res.send({
            message: "student created"
        })
    } catch (error) {
        console.error(error);
        res.status(400).send({
            msg: error
        })
    }
}

module.exports.updateMentor=async (req,res)=>{
    
}