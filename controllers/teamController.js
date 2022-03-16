const League = require('../models/league');
const { Team } = require('../models/team');

// exports.teams_index = async (req, res) => {
//     // const teams = await Team.find().populate('arena');
//     // res.json(teams);

//     res.render('teams/index', { title: 'Team List'});
// }


exports.teams_index_get = async (req, res) => {
    const league = await League.findById(req.user.leagueID).populate('teams.arena');
    res.render('teams/index', { title: 'Team List', teams: league.teams });
}

exports.teams_create_get = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID).populate('arenas');
        res.render('teams/new', { title: 'New Team', arenas: league.arenas });
    } catch(err) {
        console.log(err);
    }


}

exports.teams_create_post = async (req, res) => {
	
    try {
        const league = await League.findById(req.user.leagueID);
        const team = new Team(req.body);
        await league.teams.push(team);
        await league.save();
        res.redirect(req.session.leagueURL + '/teams');
    } catch(err) {
        console.log(err);
    }
}