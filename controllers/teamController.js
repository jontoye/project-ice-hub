const League = require('../models/league');
const Arena = require('../models/arena.js');
const Team = require('../models/team');

exports.teams_index_get = (req, res) => {

    const leagueID = req.user.leagueID;

    Team.find({ league_id: leagueID })
        .populate('arena')
        .then(teams => {
            res.render('teams/index', { title: 'Team List', teams });
        })
        .catch(err => {
            console.log('Error getting team list: ', err);
        });

}

exports.teams_create_get = async (req, res) => {

    const leagueID = req.user.leagueID;

    Arena.find({ leagues: leagueID })
        .then(arenas => {
            res.render('teams/new', { title: 'New Team', arenas });
        })
        .catch(err => {
            console.log('Error getting league arenas: ', err);
        });

}

exports.teams_create_post = (req, res) => {

    const leagueID = req.user.leagueID;
    req.body.league_id = leagueID;

    const newTeam = new Team(req.body);

    newTeam.save()
        .then(team => {
            League.findByIdAndUpdate(leagueID, 
                { $push: { teams: team._id }})
                .then(() => {
                    res.redirect('/teams');
                });
        })
        .catch(err => {
            console.log('Error creating new team: ', err);
        });
  
}

exports.teams_update_get = async (req, res) => {

    const leagueID = req.user.leagueID;
    const teamID = req.params.teamID;

    const fetchArenas = Arena.find({ league_id: leagueID });
    const fetchTeam = Team.findById(teamID);

    Promise.all([
        fetchArenas.exec(),
        fetchTeam.exec()
    ])
    .then(([arenas, team]) => {
        res.render('teams/update', { title: 'Update Team', team, arenas });
    })
    .catch(err => {
        console.log('Error getting team update page: ', err);
    });
    
}

exports.teams_update_post = async (req, res) => {


    const teamID = req.params.teamID;

    Team.findByIdAndUpdate(teamID, req.body)
        .then(() => {
            res.redirect('/teams');
        })
        .catch(err => {
            console.log('Error updating team: ', err);
        });

}

// TODO:
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