const studentModel = require("../Models/studentModel");
const MentorModel = require("../Models/mentorModel");
const { default: mongoose } = require("mongoose");

//module to creating a student
module.exports.createStudent = async (req, res) => {
  const studentData = new studentModel({ ...req.body.student });
  try {
    await studentData.save();
    res.send({
      message: "student created",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      msg: error,
    });
  }
};

//module to update a menot
module.exports.updateMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const mentor = await MentorModel.find({ _id: req.body.assign.mentor });
    const student = await studentModel.find({_id:studentId})
    const assignedMentor= student[0].assignedMentor
    console.log(assignedMentor)
    const requestedMentor = mongoose.Types.ObjectId(req.body.assign.mentor);
    if(assignedMentor){ //checking if no mentor is assigned before
      if(assignedMentor.valueOf()!==requestedMentor.valueOf()){ // checking if  mentor is not present assigned mentor
        const previousMentor = await MentorModel.find({_id: assignedMentor });
        let assignedStudentsList= previousMentor[0].assignedStudents;
         for(let i=0;i<assignedStudentsList.length;i++){
          if((student[0]._id).valueOf()===assignedStudentsList[i].valueOf()){
            assignedStudentsList.splice(i,1);
            break;
          }
         }
      }else{
        return res.send({
          msg: "trying to assign same mentor again"
        })
      }
    } 
    await studentModel.findByIdAndUpdate(studentId,{assignedMentor: req.body.assign.mentor},{
        new:true, runValidators:true
    })
    await MentorModel.findByIdAndUpdate(
        req.body.assign.mentor,
        {
          assignedStudents: [...new Set([...mentor[0].assignedStudents,studentId])],
        },
        { new: true, runValidators: true }
      );

        res.send({
            msg:"mentor assigned"
        })
  } catch (error) {
    console.error(error);
    res.status(400).send({
      msg: error,
    });
  }
};
