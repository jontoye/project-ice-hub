const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Arena = require('./arena');
const PlayerSchema = require('./player');

const TeamSchema = new Schema(
    {
        city: { type: String, maxLength: 30, required: true },
        name: { type: String, maxLength: 30, required: true },
        name_short: { type: String, minLength: 3, maxLength: 3, requried: true },
        players: [{ type: PlayerSchema }],
        // conference: { type: String, maxLength: 15, required: true },
        division: { type: String, maxLength: 15, required: true },
        arena: { type: Schema.Types.ObjectId, ref: 'Arena', required: true },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        overtime_losses: { type: Number, default: 0 },
    }
);

const Team = mongoose.model('Team', TeamSchema);

module.exports = { TeamSchema, Team };
// module.exports = mongoose.model('Team', TeamSchema);