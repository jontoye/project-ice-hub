const Team = require('../models/team');

exports.teams_index = async (req, res) => {
    const teams = await Team.find().populate('arena');
    res.json(teams);
}