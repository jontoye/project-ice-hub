const League = require("../models/league");
const Team = require('../models/team');
const Game = require('../models/game');

exports.games_index_get = async (req, res) => {

    const leagueID = req.user.leagueID;

    Game.find({ league_id: leagueID })
        .populate('home_team')
        .populate('away_team')
        .sort('date')
        .then(games => {
            res.render('games/index', { title: 'Schedule', games })
        })
        .catch(err => {
            console.log('Error getting schedule: ', err);
        });

}

exports.games_create_get = (req, res) => {

    const leagueID = req.user.leagueID;

    Team.find({ league_id: leagueID })
        .then(teams => {
            res.render('games/new', { title: 'New Game', teams });
        })
        .catch(err => {
            console.log('Error getting create game form', err);
        })

}

exports.games_create_post = async (req, res) => {

    const leagueID = req.user.leagueID;
    req.body.league_id = leagueID;

    const newGame = new Game(req.body);

    newGame.save()
        .then(game => {
            League.findByIdAndUpdate(leagueID, 
                { $push : { schedule: game }})
                .then(() => {
                    res.redirect('/games');
                })
        })
        .catch(err => {
            console.log('Error creating new game', err);
        })

}

exports.games_update_get = (req, res) => {

    Game.findById(req.params.gameID)
        .populate('home_team')
        .populate('away_team')
        .then(game => {
            res.render('games/update', { title: 'Update Game', game });
        })
        .catch(err => {
            console.log('Error getting update game form: ', err);
        });

}

exports.games_update_post = (req, res) => {

    const gameID = req.params.gameID;

    Game.findByIdAndUpdate(gameID, req.body)
        .then(() => {
            res.redirect('/games');
        })
        .catch(err => {
            console.log('Error updating game: ', err);
        });

}

exports.games_delete_get = (req, res) => {
    const gameID = req.params.gameID;

    Game.findByIdAndDelete(gameID)
        .then(() => res.redirect('/games'))
        .catch(err => console.log('Error deleting game: ', err));

}