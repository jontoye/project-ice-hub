const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.get('/', teamController.teams_index_get);
router.post('/', teamController.teams_create_post);
router.get('/new', teamController.teams_create_get);
router.post('/:teamID', teamController.teams_update_post);
router.get('/:teamID/update', teamController.teams_update_get);
// router.get('/teams/:leagueName/:teamID/delete', teamController.teams_delete_get);





// router.get('/teams/:leagueName', teamController.teams_index_get);
// router.post('/teams/:leagueName', teamController.teams_create_post);
// router.get('/teams/:leagueName/new', teamController.teams_create_get);
// router.post('/teams/:leagueName/:teamID', teamController.teams_update_post);
// router.get('/teams/:leagueName/:teamID/update', teamController.teams_update_get);
// // router.get('/teams/:leagueName/:teamID/delete', teamController.teams_delete_get);


module.exports = router;