const Arena = require('../models/arena');
const League = require('../models/league');
const async = require('async');

// Show list of arenas
exports.arenas_index_get = (req, res) => {

    const leagueID = req.user.leagueID;

    const fetchAllArenas = Arena.find()
    const fetchLeagueArenas = Arena.find( {leagues: leagueID });

    Promise.all([
        fetchAllArenas.exec(),
        fetchLeagueArenas.exec(),
    ])
    .then(([allArenas, leagueArenas]) => {
        res.render('arenas/index', { title: 'Arena List', allArenas, leagueArenas });
    })
    .catch(err => {
        console.log('Error trying to get arenas', err);
    })

}

// TODO:
// Show arena details
exports.arenas_detail_get = (req, res) => {

}

// Show create new arena form
exports.arenas_create_get = (req, res) => {
    res.render('arenas/new', { title: 'New Arena', errors: req.flash('error') });
}

// Add new arena
exports.arenas_create_post = async (req, res) => {

    const newArena = new Arena({
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        leagues: [ req.user.leagueID ]
    });

    newArena.save()
            .then(arena => {
                res.redirect('/arenas');
            })
            .catch(err => {
                res.json(err);
            })
    
}

// Add a league to an arena
exports.arenas_addLeague_get = (req, res) => {
    const leagueID = req.user.leagueID;
    const arenaID = req.params.arenaID;

    Arena.findByIdAndUpdate(arenaID, 
        { $push: { leagues: leagueID }})
        .then(() => { 
            res.redirect('/arenas')
        })
        .catch(err => {
            console.log('Error add arena to league: ', err);
        })
}

// TODO: 
// Show update arena form
exports.arenas_update_get = (req, res) => {

}

// TODO: 
// Update arena details
exports.arenas_update_post = (req, res) => {

}