const {Model} = require('objection');

class Meeting  extends Model{
    static get tableName(){
        return "meeting"
    }

    static get relationMappings(){
        const Participant = require("./participant");
        return{
            part : {
                relation : Model.HasManyRelation,
                modelClass : Participant,
                join : {
                    from : "meeting.id",
                    to : "participant.MeetingId"
                }
            }
        }
    }

    

}

module.exports = Meeting;