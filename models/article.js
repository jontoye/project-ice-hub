const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        title: { type: String, maxLength: 50, required: true },
        content: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    }
);

module.exports = mongoose.model('Article', ArticleSchema);