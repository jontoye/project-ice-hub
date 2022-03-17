const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PlayerSchema = new Schema(
    {
        first_name: { 
            type: String, 
            maxLength: 30, 
            required: true 
        },
        last_name: { 
            type: String, 
            maxLength: 30, 
            required: true 
        },
        team: { 
            type: Schema.Types.ObjectId, 
            ref: 'Team' 
        },
        league: {
            type: Schema.Types.ObjectId,
            ref: 'League'
        },
        photo_url: { 
            type: String 
        },
        date_of_birth: { 
            type: Date 
        },
        place_of_birth: { 
            type: String 
        },
        position: [{ 
            type: String, 
            enum: ['C', 'LW', 'RW', 'D', 'G'] 
        }],
        jersey: { 
            type: Number, 
            required: true 
        },
        goals: { 
            type: Number, 
            default: 0 
        },
        assists: { 
            type: Number, 
            default: 0 
        },
        penalty_minutes: { 
            type: Number,
            default: 0
        },
        goalie_gaa: { 
            type: Number, 
            default: 0.00 
        },
        goalie_sv: { 
            type: Number, 
            max: 1, default: 0.00 
        },
        goalie_wins: { 
            type: Number, default: 0 
        },
        goalie_losses: { 
            type: Number, default: 0 
        },
    }
);

// virtual method for displaying fullname
PlayerSchema.virtual('fullname').get(function() {
    return this.first_name + ' ' + this.last_name;
});

// virtual method for formatting date of birth
PlayerSchema.virtual('born').get(function() {

    // Need to get timezone offset since date is stored in UTC
    const timeOffset = this.date_of_birth.getTimezoneOffset()

    return DateTime.fromJSDate(this.date_of_birth)
                    .plus({ minutes: timeOffset })
                    .toLocaleString({ month: 'long', day: 'numeric', year: 'numeric'})
});

module.exports = mongoose.model('Player', PlayerSchema);

