const Meeting = require("../model/meeting");
const Participant = require("../model/participant");

const updateParticipant = async (req,res) => {

    let email = req.body.email;
    let rspv = req.body.rspv;

    const answerd = await Participant.query().update({ RSPV : rspv }).where("Email",email);
    if (answerd) {
    res.send(answerd)
    }
}

const scheduleMeeting = async(req,res) => {

    let title = req.body.Title;
    let participant = req.body.Participants;
    let start = req.body.StartTime;
    let end = req.body.EndTime;

    let End = Date.parse(end);// in milliseconds
    let Start = Date.parse(start);

    if(End - Start < 0){
        res.send("Error, Please Enter Correct Date and Time");
    }
    // console.log(End, Start);
    
    const scheduled = await Meeting.query().insertGraph([{ 
        Title : title,
        StartTime : Start,
        EndTime :  End,
        part: participant,
    }]);
    
    if(scheduled){
        res.send(scheduled)
    }
}

const findMeeting = async(req,res) =>{ 

    let id = req.params.id;
    // console.log(id);

    let find = await Meeting.query().where("id",id).withGraphFetched("part");

    if(find){
        res.send(find);
    }
}

const participantsAllMeeting = async(req,res) =>{ 

    let email = req.query.email;
    console.log(email);

    const offset = parseInt(req.query.offset)
    const limit = parseInt(req.query.limit)

    const startIndex = (offset - 1) * limit
    const endIndex = offset * limit
    
    if (startIndex > 0) {
      results.previous = {
        offset: offset - 1,
        limit: limit
      }
    }

    let details = await Participant.query()
                    .where("Email",email)
                    .withGraphFetched("[meeting]")
                    .limit(limit)
                    .offset(offset)
                    .returning("*");


    if (endIndex < await details.length) {
        results.next = {
            offset: offset + 1,
            limit: limit
        }
    }
    if(details){
        console.log("gggg")
        res.send(details);
    }
}

const allMeetings = async(req,res) =>{

    let start = req.query.StartTime;
    let end = req.query.EndTime;

    let End = Date.parse(end);// in milliseconds
    let Start = Date.parse(start);    
    console.log(Start,End);

    const offset = parseInt(req.query.offset)
    const limit = parseInt(req.query.limit)

    const startIndex = (offset - 1) * limit
    const endIndex = offset * limit
 
    if (startIndex > 0) {
      results.previous = {
        offset: offset - 1,
        limit: limit
      }
    }
    
    const Meetings = await Meeting.query()
                        .having("StartTime",">=",Start)
                        .having("EndTime","<=",End)
                        .skipUndefined().groupBy("id")
                        .limit(limit)
                        .offset(offset)
                        .returning("*")

    if (endIndex < await Meetings.length()) {
        results.next = {
            offset: offset + 1,
            limit: limit
        }
    }


    if(Meetings){
        res.send(Meetings)
    }


}

module.exports = { 
    updateParticipant,
    scheduleMeeting,
    findMeeting,
    participantsAllMeeting,
    allMeetings
}