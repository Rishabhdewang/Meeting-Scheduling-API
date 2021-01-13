const {Model} = require('objection');

class Participant  extends Model{
    static get tableName(){
        return "participant"
    }

    static get relationMappings(){
        const meeting = require("./meeting");
        return{
            meeting : {
                relation : Model.HasOneRelation,
                modelClass : meeting,
                join : {
                    from : "participant.MeetingId",
                    to : "meeting.id"
                }
            }
        }
    }


}

module.exports = Participant;