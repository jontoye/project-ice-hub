const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        hash: { type: String, required: true },
    }
);

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
}


module.exports = mongoose.model('User', UserSchema);