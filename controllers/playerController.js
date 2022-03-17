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

exports.players_update_get = async (req, res) => {

    try {

        let currentPlayer;
        const league = await League.findById(req.user.leagueID);

        league.teams.forEach(team => {
            if (team.players.id(req.params.playerID)) {
                currentPlayer = team.players.id(req.params.playerID)
            }
        });

        res.render('players/update', { title: 'Update Player' , teams: league.teams, player: currentPlayer });
    } catch (err) {
        console.log(err);
    }
}

exports.players_update_post = async (req, res) => {

    // TODO: allow user to move players between teams

    try {

        let currentPlayer;
        const league = await League.findById(req.user.leagueID);

        league.teams.forEach(team => {
            if (team.players.id(req.params.playerID)) {
                currentPlayer = team.players.id(req.params.playerID)
            }
        });

        currentPlayer.first_name = req.body.first_name;
        currentPlayer.last_name = req.body.last_name;
        currentPlayer.date_of_birth = req.body.date_of_birth;
        currentPlayer.place_of_birth = req.body.place_of_birth;
        currentPlayer.jersey = req.body.jersey;
        
        // remove existing positions and replace with new
        currentPlayer.position = [];
        [...req.body.position].forEach(pos => {
            currentPlayer.position.push(pos);
        });

        league.save();

        res.redirect(req.session.leagueURL + '/players');

    } catch (err) {
        console.log(err);
    }

}