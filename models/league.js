const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeagueSchema = new Schema(
    {
        name: { type: String, maxlength: 50, required: true },
        schedule: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
        teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
        commissioner: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    }
);

module.exports = mongoose.model('League', LeagueSchema);