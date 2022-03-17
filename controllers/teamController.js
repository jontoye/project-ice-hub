const League = require('../models/league');
const { Team } = require('../models/team');

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

exports.teams_update_get = async (req, res) => {

    try {

        const league = await League.findById(req.user.leagueID).populate('arenas');
        res.render('teams/update', { title: 'Update Team', team: league.teams.id(req.params.teamID), arenas: league.arenas });

    } catch (err) {
        console.log(err);
    }
}

exports.teams_update_post = async (req, res) => {

    try {
        
        const league = await League.findById(req.user.leagueID);
        const team = league.teams.id(req.params.teamID);
        
        team.city = req.body.city;
        team.name = req.body.name;
        team.name_short = req.body.name_short;
        team.arena = req.body.arena;
        team.division = req.body.division;
        await league.save();
        res.redirect(req.session.leagueURL + '/teams');

    } catch(err) {
        console.log(err);
    }
}

// exports.teams_delete_get = async (req, res) => {

//     try {

//         const league = await League.findById(req.user.leagueID);
//         league.teams.id(req.params.teamID).remove();
//         console.log('team deleted');

//         league.save();

//         res.redirect(req.session.leagueURL + '/teams');

//     } catch (err) {
//         console.log(err);
//     }
// }