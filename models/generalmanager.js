const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneralManagerSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
        team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    }
);

module.exports = mongoose.model('GeneralManager', GeneralManagerSchema);