const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { GoalSchema } = require('./goal');
const { DateTime } = require('luxon');

const GameSchema = new Schema(
    {
        league_id: {
            type: Schema.Types.ObjectId,
            ref: 'League'
        },
        home_team: { 
            type: Schema.Types.ObjectId, 
            ref: 'Team', 
            required: true 
        },
        away_team: { 
            type: Schema.Types.ObjectId, 
            ref: 'Team', 
            required: true 
        },
        home_team_score: { 
            type: Number, 
            required: true, 
            default: 0 
        },
        away_team_score: { 
            type: Number, 
            required: true, 
            default: 0 
        },
        goals: [{ 
            type: GoalSchema 
        }],
        date: { 
            type: Date, 
            required: true 
        },
        is_complete: { 
            type: Boolean, 
            required: true, 
            default: false 
        },
    }
);

// virtual method to format game date
GameSchema.virtual('gametime').get(function(){
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model('Game', GameSchema);

