const express = require('express');
const router = express.Router();

// Import controllers
const leagueController = require('../controllers/leagueController');
const arenaController = require('../controllers/arenaController');
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');
const gameController = require('../controllers/gameController');


router.get('/:leagueName', leagueController.league_homepage_get);



module.exports = router;



/*
/:leagueID/standings
/:leagueID/schedule
/:leagueID/stats

*/