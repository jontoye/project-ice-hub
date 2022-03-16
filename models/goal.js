const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
    {
        game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
        scored_by: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
        assisted_by: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    }
);

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = { Goal, GoalSchema }
