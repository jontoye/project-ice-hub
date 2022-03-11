const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneralManagerSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, ref: 'Person' },
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
    }
);

module.exports = mongoose.model('GeneralManager', GeneralManagerSchema);