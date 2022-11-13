const express = require("express");
const mentorModule = require("../Modules/mentorModule");

const router = express.Router();

router.post("/create-mentor", mentorModule.createMentor);
router.put("/assign-student/:mentorId", mentorModule.assignStudent);
router.get("/all-mentors/:objectId", mentorModule.getMentorStudents);

module.exports = router;