const express = require("express");
const studentModule = require("../Modules/studentModule");

const router = express.Router();

router.post("/create-student", studentModule.createStudent);
router.put("/update-mentor/:studentId", studentModule.updateMentor);

module.exports = router;
