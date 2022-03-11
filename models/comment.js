const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        person: { type: Schema.Types.ObjectId, ref: 'Person', required: true, },
        content: { type: String, required: true },
    }
);

module.exports = mongoose.model('Comment', CommentSchema);