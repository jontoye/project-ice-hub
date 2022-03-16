const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { TeamSchema } = require('./team');
const { GameSchema } = require('./game');

const LeagueSchema = new Schema(
    {
        name: { type: String, maxlength: 50, required: true, unique: true },
        commissioner: { type: String, required: true },
        division_names: [{ type: String, required: true }],
        schedule: [{ type: GameSchema }],
        teams: [{ type: TeamSchema }],
        arenas: [{ type: Schema.Types.ObjectId, ref: 'Arena' }],
        // conference_names: [{ type: String, required: true }],
    }, { timestamps: true }
);

// virtual for league url
LeagueSchema.virtual('url').get(function() {
    return '/leagues/' + this.name.toLowerCase().replace(' ', '');
})

module.exports = mongoose.model('League', LeagueSchema);