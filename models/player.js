const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
    {
        first_name: { type: String, maxLength: 30, required: true },
        last_name: { type: String, maxLength: 30, required: true },
        photo_url: { type: String },
        date_of_birth: { type: Date },
        place_of_birth: { type: String },
        position: [{ type: String, enum: ['C', 'LW', 'RW', 'D', 'G'] }],
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        jersey: { type: Number, required: true },
        goals: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
        penalty_minutes: { type: Number, default: 0},
        goalie_gaa: { type: Number, default: 0.00 },
        goalie_sv: { type: Number, max: 1, default: 0.00 },
        goalie_wins: { type: Number, default: 0 },
        goalie_losses: { type: Number, default: 0 },
    }
);

const Player = mongoose.model('Player', PlayerSchema);

module.exports = { PlayerSchema, Player };
// module.exports = mongoose.model('Player', PlayerSchema);