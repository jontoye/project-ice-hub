const express = require('express');
const router = express.Router();
const { isAuth, isLeagueAdmin, isTeamAdmin } = require('../utils/auth');
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/protected', isLeagueAdmin, (req, res) => {
    res.render('protected', { title: 'Protected page' });
})

module.exports = router;
