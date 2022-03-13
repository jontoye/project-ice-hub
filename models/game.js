const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
    {
        home_team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
        away_team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
        home_team_score: { type: Number, required: true, default: 0 },
        away_team_score: { type: Number, required: true, default: 0 },
        goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
        date: { type: Date, required: true },
    }
);

module.exports = mongoose.model('Game', GameSchema);