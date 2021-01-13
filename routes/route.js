const express = require("express");
const router = express.Router();

const control = require("../controllers/controller");

router.post("/createParticipant",control.createParticipant);
router.post("/meetings",control.scheduleMeeting); //Schedule a meeting
router.get("/meeting/:id",control.findMeeting); //Get a meeting using id
router.get('/meetings',control.allMeetings); //List all meetings within a time frame
router.get('/meeting',control.participantsAllMeeting) // List all meetings of a participant

module.exports = router;
