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

exports.games_update_get = async (req, res) => {

    Game.findById(req.params.gameID)
        .populate('home_team')
        .populate('away_team')
        .then(game => {
            res.render('games/update', { title: 'Update Game', game });
        })
        .catch(err => {
            console.log('Error getting update game form: ', err);
        });


    // try {
    //     const league = await League.findById(req.user.leagueID);
    //     const game = league.schedule.id(req.params.gameID);
    
    //     res.render('games/update', { title: 'Update Game' , game });

    // } catch (err) {
    //     console.log(err);
    // }
}

exports.games_update_post = async (req, res) => {

    try {

        const league = await League.findById(req.user.leagueID);
        const game = league.schedule.id(req.params.gameID);

        if (game.is_complete) {

            console.log('cannot update a completed game!');
            res.json('Cannot update a completed game!');

        } else {
            
            game.home_team_score = req.body.home_team_score;
            game.away_team_score = req.body.away_team_score;
    
            if (req.body.is_complete == 'true') {
                game.is_complete = true;
            }
    
            await league.save();
    
            res.redirect(req.session.leagueURL + '/games');
        }
    } catch (err) {

    }
}