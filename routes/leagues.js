const express = require('express');
const router = express.Router();

// Import controllers
const leagueController = require('../controllers/leagueController');

// Routes
router.get('/', leagueController.league_index);
router.get('/:leagueID', leagueController.league_details);



module.exports = router;



/*
/:leagueID/standings
/:leagueID/schedule
/:leagueID/stats

*/