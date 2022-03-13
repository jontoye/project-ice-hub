const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Arena = require('./arena');

const TeamSchema = new Schema(
    {
        city: { type: String, maxLength: 30, required: true },
        name: { type: String, maxLength: 30, required: true },
        name_short: { type: String, minLength: 3, maxLength: 3, requried: true },
        conference: { type: String, maxLength: 15, required: true },
        division: { type: String, maxLength: 15, required: true },
        arena: { type: Schema.Types.ObjectId, ref: 'Arena', required: true },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        overtime_losses: { type: Number, default: 0 },
    }
);

module.exports = mongoose.model('Team', TeamSchema);