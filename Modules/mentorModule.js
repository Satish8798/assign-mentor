const MentorModel = require("../Models/mentorModel");
const StudentModel = require("../Models/studentModel");
const mongoose= require("mongoose")


//module for creating a mentor
module.exports.createMentor = async (req, res) => {
  const mentorData = new MentorModel({ ...req.body.mentor });
  try {
    await mentorData.save();
    res.send({
      message: "mentor created",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      msg: error,
    });
  }
};

//module for assigning students
module.exports.assignStudent = async (req, res) => {
  const mentorId = req.params.mentorId;
  const mentor = await MentorModel.find({ _id: mentorId });
  const student = await StudentModel.find({ _id: req.body.assign.student });
  try {
    if (!student[0].assignedMentor) {
      await MentorModel.findByIdAndUpdate(
        mentorId,
        {
          assignedStudents: [
            ...new Set([
              ...mentor[0].assignedStudents,
              req.body.assign.student,
            ]),
          ],
        },
        { new: true, runValidators: true }
      );
      await StudentModel.findByIdAndUpdate(
        req.body.assign.student,
        { assignedMentor: mentorId },
        { new: true, runValidators: true }
      );
      res.send({
        msg: "student assigned",
      });
    } else {
      res.send({
        msg: "mentor already assigned for this student",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      msg: error,
    });
  }
};

//module for getting all the students of a particular mentor
module.exports.getMentorStudents = async (req, res) => {
  let mentorId = req.params.mentorId;
  mentorId = mongoose.Types.ObjectId(mentorId)
  try {
    console.log(mentorId)
    const response = await MentorModel.aggregate([
        {
            $match:{_id:mentorId}
        }
     ]).lookup({
        from: "students",
        localField: "assignedStudents",
        foreignField: '_id',
        as: "assignedStudents"
    }).project({
        assignedStudents:1
    })
    
    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({
      msg: error,
    });
  }
};
