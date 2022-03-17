const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/', gameController.games_index_get);
router.post('/', gameController.games_create_post);
router.get('/new', gameController.games_create_get);
router.post('/:gameID', gameController.games_update_post);
router.get('/:gameID/update', gameController.games_update_get);

module.exports = router;