const Arena = require('../models/arena');
const League = require('../models/league');
const async = require('async');

exports.arenas_index_get = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID).populate('arenas');
        console.log(league.arenas);
        res.render('arenas/index', { title: 'Arena List' , arenas: league.arenas });
    } catch (err) {
        console.log(err);
    }
}

exports.arenas_create_get = (req, res) => {
    res.render('arenas/new', { title: 'New Arena', errors: req.flash('error') });
}

exports.arenas_create_post = async (req, res, next) => {

    try {
        const arena = await Arena.create(req.body);
        const league = await League.findById(req.user.leagueID);
        await league.arenas.push(arena._id);
        await league.save();
        res.redirect(req.session.leagueURL + '/arenas');
    } catch (err) {
        if (err.code == 11000) {
            req.flash('error', 'The Arena Name you entered already exists.');
        }
        res.redirect(req.session.leagueURL + '/arenas/new');
    }  
    
}