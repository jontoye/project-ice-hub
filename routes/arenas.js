const express = require('express');
const router = express.Router();

const arenaController = require('../controllers/arenaController');

router.get('/', arenaController.arenas_index);

module.exports = router;