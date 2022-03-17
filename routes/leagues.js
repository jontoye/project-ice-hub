const express = require('express');
const router = express.Router();

// Import controllers
const leagueController = require('../controllers/leagueController');
const arenaController = require('../controllers/arenaController');
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');
const gameController = require('../controllers/gameController');

// League Home
// router.post('/', leagueController.league_create_post);
router.get('/', leagueController.league_index);

// Arenas
router.get('/:leagueName/arenas', arenaController.arenas_index_get);
router.post('/:leagueName/arenas', arenaController.arenas_create_post);
router.get('/:leagueName/arenas/new', arenaController.arenas_create_get);

// Teams
router.get('/:leagueName/teams', teamController.teams_index_get);
router.post('/:leagueName/teams', teamController.teams_create_post);
router.get('/:leagueName/teams/new', teamController.teams_create_get);
router.post('/:leagueName/teams/:teamID', teamController.teams_update_post);
router.get('/:leagueName/teams/:teamID/update', teamController.teams_update_get);


// Players
router.get('/:leagueName/players', playerController.players_index_get);
router.post('/:leagueName/players', playerController.players_create_post);
router.get('/:leagueName/players/new', playerController.players_create_get);
router.post('/:leagueName/players/:playerID', playerController.players_update_post);
router.get('/:leagueName/players/:playerID/update', playerController.players_update_get);
router.get('/:leagueName/players/:playerID/delete', playerController.players_delete_get);

// Games
router.get('/:leagueName/games', gameController.games_index_get);
router.post('/:leagueName/games', gameController.games_create_post);
router.get('/:leagueName/games/new', gameController.games_create_get);
router.post('/:leagueName/games/:gameID', gameController.games_update_post);
router.get('/:leagueName/games/:gameID/update', gameController.games_update_get);

router.get('/:leagueName', leagueController.league_homepage_get);



module.exports = router;



/*
/:leagueID/standings
/:leagueID/schedule
/:leagueID/stats

*/