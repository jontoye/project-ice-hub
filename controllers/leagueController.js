const League = require('../models/league');

exports.league_index = async (req, res) => {
    const leagues = await League.find().populate('commissioner');
    res.json(leagues);
}

exports.league_details = async (req, res) => {
    res.send('NOT READY');
}