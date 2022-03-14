const express = require('express');
const router = express.Router();

const { isAuth, isLeagueAdmin, isTeamAdmin } = require('../utils/auth');


const indexController = require('../controllers/indexController');

// FOR Live Version
// router.get('/', async (req, res) => {

// 	try {
// 		const results = await axios.get(apiURL + process.env.apiKEY);
// 		res.render('index', { title: 'Ice Hub' , articles: results.data });
// 	} catch (err) {
// 		console.error(err);
// 	}

// });

// FOR Test Version
router.get('/', indexController.index);

router.get('/protected', isLeagueAdmin, (req, res) => {
    res.render('protected', { title: 'Protected page' });
})

module.exports = router;
