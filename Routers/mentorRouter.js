const express = require("express");
const mentorModule = require("../Modules/mentorModule");

const router = express.Router();

//routes for different requests redirecting to modules of mentor
router.post("/create-mentor", mentorModule.createMentor);
router.put("/assign-student/:mentorId", mentorModule.assignStudent);
router.get("/assigned-students/:mentorId", mentorModule.getMentorStudents);

module.exports = router;