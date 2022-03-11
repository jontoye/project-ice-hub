const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, ref: 'Person' },
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
    }
);

module.exports = mongoose.model('Coach', CoachSchema);