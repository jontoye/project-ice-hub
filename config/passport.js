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

// Save user ID into Session.passport object
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Populates req.user with matched user from db
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err)
        })
})