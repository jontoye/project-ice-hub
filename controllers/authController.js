const User = require('../models/user');
const League = require('../models/league');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const async = require('async');

// GET - show register form
exports.auth_register_get = (req, res) => {
    res.render('auth/register', { title: 'Register', errors: req.flash('error') });
}

// POST - register a new user
exports.auth_register_post = (req, res) => {

    let leagueID;
    // let conferences = [];
    let divisions = [];

    // hash the plaintext password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // New User
      const newUser = new User({
        username: req.body.username,
        hash: hash,
        role: req.body.role,
    });

    // New League
    // conferences.push(
    //     req.body.conferenceName1, 
    //     req.body.conferenceName2);
    divisions.push(
        req.body.divisionName1,
        req.body.divisionName2,
        req.body.divisionName3,
        req.body.divisionName4);

    const newLeague = new League({
        name: req.body.leagueName,
        commissioner: req.body.commissionerName,
        // conference_names: conferences,
        division_names: divisions,
    });

    // Save league to db first, then use leagueID to save new user
    async.series([
        function(callback) {
            newLeague.save(function(err, league) {
                if (err) {
					if (err.code == 11000) {
						req.flash('error', 'The League Name you entered already exists.')
					}
  	            	return callback(err);
                }
                leagueID = league._id;
                return callback(null, league);
            })
        },

        function(callback) {
            newUser.leagueID = leagueID;
            newUser.save(function(err, user) {
                if (err) {
                    if (err.code == 11000) {
						req.flash('error', 'The Username you entered already exists');
					}
                    return callback(err);
                }
                return callback(null, user);
            })
        }
    ], function(err, results) {
		if (err) {
			// console.log(err);
			res.redirect('/auth/register');
		} else {
			res.redirect('/auth/login');
		}
    })

}

// GET - show login page
exports.auth_login_get = (req, res) => {
    res.render('auth/login', { 
        title: 'Login',
        errors: req.flash('error'), 
    });
}

// POST - attempt to login
exports.auth_login_post = async (req, res) => {
	const league = await League.findById(req.user.leagueID);
	req.session.leagueName = league.name;
	req.session.leagueURL = league.url;
    req.session.league = league;
	res.redirect('/');
}

// GET - logout current user
exports.auth_logout_get = (req, res) => {
	req.session.destroy(err => {
		res.redirect('/');
	})


    // req.logout();
    // res.redirect('/');
}