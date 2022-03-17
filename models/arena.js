const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArenaSchema = new Schema(
    {
        name: { 
            type: String, 
            maxLength: 50, 
            required: true, 
            unique: true 
        },
        capacity: { 
            type: Number 
        },
        location: { 
            type: String, 
            required: true
        },
        leagues: [{
            type: Schema.Types.ObjectId,
            ref: 'League'
        }]
    }
);

module.exports = mongoose.model('Arena', ArenaSchema);