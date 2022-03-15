const express = require('express');
const router = express.Router();

// Import controllers
const leagueController = require('../controllers/leagueController');
const teamController = require('../controllers/teamController');
const arenaController = require('../controllers/arenaController');

// Routes
// router.get('/new', leagueController.league_create_get);
router.post('/', leagueController.league_create_post);
router.get('/', leagueController.league_index);


router.get('/:leagueName/teams', teamController.teams_index_get);


router.get('/:leagueName/arenas', arenaController.arenas_index_get);
router.post('/:leagueName/arenas', arenaController.arenas_create_post);
router.get('/:leagueName/arenas/new', arenaController.arenas_create_get);


router.post('/:leagueName/teams', teamController.teams_create_post);
router.get('/:leagueName/teams/new', teamController.teams_create_get);


router.get('/:leagueName', leagueController.league_homepage_get);



module.exports = router;



/*
/:leagueID/standings
/:leagueID/schedule
/:leagueID/stats

*/