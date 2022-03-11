const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, required: true },
        team: { type: Schema.Types.ObjectId, required: true },
        position: [{ type: String, enum: ['C', 'LW', 'RW', 'D', 'G'] }],
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

module.exports = mongoose.model('Player', PlayerSchema);