const League = require('../models/league');

// GET - list of all leagues
exports.league_index = async (req, res) => {
    const leagues = await League.find().populate('commissioner');
    res.json(leagues);
}

// GET - show new league registration form
// exports.league_create_get = (req, res) => {
// 	res.render('leagues/create', { title: 'Create League' });
// }

// POST - submit new league registration
exports.league_create_post = (req, res) => {

}

exports.league_homepage_get = async (req, res) => {
    console.log(req.params);
    res.render('index', { title: req.params.leagueName, articles: false })
}