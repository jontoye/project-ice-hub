const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
    {
        home_team: { type: Schema.Types.ObjectId, ref: 'Team' },
        away_team: { type: Schema.Types.ObjectId, ref: 'Team' },
        home_team_score: { type: Number, required: true },
        away_team_score: { type: Number, required: true },
        goals: [{ type: Schema.toString.ObjectId, ref: 'Goal' }],
        date: { type: Date, required: true },
    }
);

module.exports = mongoose.model('Game', GameSchema);