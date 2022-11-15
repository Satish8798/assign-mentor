const express = require("express");
const studentModule = require("../Modules/studentModule");

const router = express.Router();

//routes for different requests redirecting to modules of student
router.post("/create-student", studentModule.createStudent);
router.put("/update-mentor/:studentId", studentModule.updateMentor);

module.exports = router;
