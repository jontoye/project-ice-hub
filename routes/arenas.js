const express = require('express');
const router = express.Router();

const arenaController = require('../controllers/arenaController');

// Arenas
router.get('/', arenaController.arenas_index_get);
router.post('/', arenaController.arenas_create_post);
router.get('/new', arenaController.arenas_create_get);
router.get('/:arenaID/detail', arenaController.arenas_detail_get);
router.get('/:arenaID/addLeague', arenaController.arenas_addLeague_get);
router.get('/:arenaID/update', arenaController.arenas_update_get);
router.post('/:arenaID/update', arenaController.arenas_update_post);

module.exports = router;