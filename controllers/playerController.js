const { Player } = require('../models/player');
const { Team } = require('../models/team');
const League = require('../models/league');

exports.players_index_get = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID).select('teams');
        
        let players = [];

        league.teams.forEach(team => {
            team.players.forEach(player => {
                players.push(player);
            });
        });

        res.render('players/index', { title: 'Player List', players });

    } catch (err) {
        console.log(err);
    }


}

exports.players_create_get = async (req, res) => {

    try {
        const teams = await League.findById(req.user.leagueID).select('teams');
        res.render('players/new', { title: 'New Player' , teams: teams.teams });
    } catch (err) {
        console.log(err);
    }


}

exports.players_create_post = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID)

        const team = league.teams.id(req.body.team);

        const player = new Player(req.body);
        await team.players.push(player);
        await league.save();
        res.redirect(req.session.leagueURL + '/players');

    } catch(err) {
        console.log(err);
    }
}