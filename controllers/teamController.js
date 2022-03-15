const League = require('../models/league');

// exports.teams_index = async (req, res) => {
//     // const teams = await Team.find().populate('arena');
//     // res.json(teams);

//     res.render('teams/index', { title: 'Team List'});
// }


exports.teams_index_get = async (req, res) => {
    const league = await League.findById(req.user.leagueID);

    res.render('teams/index', { title: 'Team List', leagueID: req.user.leagueID, teams: league.teams });
}

exports.teams_create_get = (req, res) => {
	res.render('teams/new', { title: 'New Team'});
}

exports.teams_create_post = (req, res) => {
	res.json(req.body);
}