const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.get('/', playerController.players_index_get);
router.post('/', playerController.players_create_post);
router.get('/new', playerController.players_create_get);
router.post('/:playerID', playerController.players_update_post);
router.get('/:playerID/update', playerController.players_update_get);
router.get('/:playerID/delete', playerController.players_delete_get);

module.exports = router;