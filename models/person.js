const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema(
    {
        first_name: { type: String, maxLength: 30, required: true },
        last_name: { type: String, maxLength: 30, required: true },
        date_of_birth: { type: Date },
        place_of_birth: { type: String },
        photo_url: { type: url },
    }
);


module.exports = mongoose.model('Person', PersonSchema);