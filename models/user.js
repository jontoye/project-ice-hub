const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true 
        },
        hash: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['league_admin', 'team_admin', 'player'], 
        default: 'player' 
    },
        leagueID : { 
            type: Schema.Types.ObjectId, 
            ref: 'League' 
    }
    }
);

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
}


module.exports = mongoose.model('User', UserSchema);