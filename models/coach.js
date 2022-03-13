const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
        team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    }
);

module.exports = mongoose.model('Coach', CoachSchema);