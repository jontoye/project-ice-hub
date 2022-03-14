const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Define verify callback
const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        })
        .catch(err => {
            return done(err); 
        });
}

// Create strategy object
const strategy = new LocalStrategy(verifyCallback);

// Mount
passport.use(strategy);

// Save user ID into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Retrieve userID from session and look for it in database
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err)
        })
})