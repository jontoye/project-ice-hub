const League = require("../models/league");
const { Game } = require('../models/game');

exports.games_index_get = async (req, res) => {

    const games = [];
    
    try {
        const league = await League.findById(req.user.leagueID);

        // await league.schedule.forEach(game => {
        //     // console.log(league.teams.id(game.home_team).fullname)
        //     // console.log(league.teams.id(game.away_team).fullname)

        //     // Get team names from db
        //     game.home_team = league.teams.id(game.home_team).fullname;
        //     game.away_team = league.teams.id(game.away_team).fullname;

        //     games.push(game);
        // })

        // console.log(games);

        res.render('games/index', { title: 'Schedule', games: league.schedule });

    } catch(err) {
        console.log(err);
    }

}

exports.games_create_get = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID);
        res.render('games/new', { title: 'New Game', teams: league.teams });
    } catch(err) {
        console.log(err);
    }
}

exports.games_create_post = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID);
    
        const game = new Game(req.body);
        await league.schedule.push(game);
        await league.save();
    
        res.redirect(req.session.leagueURL + '/games');

    } catch (err) {
        console.log(err);
    }

}

exports.games_update_get = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID);
        const game = league.schedule.id(req.params.gameID);
    
        res.render('games/update', { title: 'Update Game' , game });

    } catch (err) {
        console.log(err);
    }
}

exports.games_update_post = async (req, res) => {

    try {
        const league = await League.findById(req.user.leagueID);

        const game = league.schedule.id(req.params.gameID);
        game.home_team_score = req.body.home_team_score;
        game.away_team_score = req.body.away_team_score;
        await league.save();

        res.redirect(req.session.leagueURL + '/games');
    } catch (err) {

    }
}