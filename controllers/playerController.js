const Player = require('../models/player');
const Team = require('../models/team');
const League = require('../models/league');

exports.players_index_get = async (req, res) => {

    const leagueID = req.user.leagueID;

    Player.find({ league_id: leagueID })
        .populate('team')
        .then(players => {
            res.render('players/index', { title: 'Player List', players });
        })
        .catch(err => {
            console.log('Error getting player list: ', err);
        });

}

exports.players_create_get = (req, res) => {

    const leagueID = req.user.leagueID;

    Team.find({ league_id: leagueID })
        .then(teams => {
            res.render('players/new', { title: 'New Player' , teams });
        })
        .catch(err => {
            console.log('Error getting new player form: ', err);
        });

}

exports.players_create_post = (req, res) => {

    const leagueID = req.user.leagueID;
    req.body.league = leagueID;

    const newPlayer = new Player(req.body);

    newPlayer.save()
        .then(player => {
            Team.findByIdAndUpdate(req.body.team, 
                { $push: { players: player._id }})
                .then(() => {
                    res.redirect('/players');
                });
        })
        .catch(err => {
            console.log('Error creating new player: ', err);
        });

}

exports.players_update_get = (req, res) => {

    const leagueID = req.user.leagueID;
    const playerID = req.params.playerID;

    const fetchTeams = Team.find({ league_id: leagueID });
    const fetchPlayer = Player.findById(playerID);

    Promise.all([
        fetchTeams.exec(),
        fetchPlayer.exec()
    ])
    .then(([teams, player]) => {
        res.render('players/update', { title: 'Update Player', teams, player });
    })
    .catch(err => {
        console.log('Error getting player update form: ', err);
    });

}

exports.players_update_post = async (req, res) => {

    // TODO: allow user to move players between teams

    const leagueID = req.user.leagueID;
    const playerID = req.params.playerID;

    Player.findByIdAndUpdate(playerID, req.body)
        .then(() => {
            res.redirect('/players');
        })
        .catch(err => {
            console.log('Error updating player: ', err);
        });

}

// TODO: 
exports.players_delete_get = async (req, res) => {

//     try {
//         let currentPlayer;

//         const league = await League.findById(req.user.leagueID);

//         league.teams.forEach(team => {
//             if (team.players.id(req.params.playerID)) {
//                 // currentPlayer = team.players.id(req.params.playerID)
//                 team.players.id(req.params.playerID).remove()
//             }
//         });

//         await league.save();
//         console.log('deleted player');

//         res.redirect(req.session.leagueURL + '/players');


//     } catch (err) {
//         console.log(err);
//     }
}