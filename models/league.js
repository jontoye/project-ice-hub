const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LeagueSchema = new Schema(
    {
        name: { 
            type: String, 
            maxlength: 50, 
            required: true, 
            unique: true 
        },
        commissioner: { 
            type: String, 
            required: true 
        },
        division_names: [{ 
            type: String, 
            required: true 
        }],
        schedule: [{ 
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }],
        teams: [{ 
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }],
        // conference_names: [{ 
            // type: String, 
            // required: true }],
    }, { timestamps: true }
);

// virtual for league url
LeagueSchema.virtual('url').get(function() {
    return '/' + this.name.toLowerCase().replace(' ', '');
})

module.exports = mongoose.model('League', LeagueSchema);