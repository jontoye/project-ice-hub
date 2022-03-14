const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET - show register form
exports.auth_register_get = (req, res) => {
    res.render('auth/register', { title: 'Register' });
}

// POST - register a new user
exports.auth_register_post = (req, res) => {

    // hash the plaintext password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // save new user to database
    const newUser = new User({
        username: req.body.username,
        hash: hash,
    });

    newUser.save()
        .then(user => {
            console.log('New user: ', user);
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log('Error adding new user to db: ', err);
        })

}

// GET - show login page
exports.auth_login_get = (req, res) => {
    res.render('auth/login', { title: 'Login' });
}

// POST - attempt to login
exports.auth_login_post = (req, res, next) => {

        
}