const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController');

router.get('/register', authController.auth_register_get);
router.post('/register', authController.auth_register_post);

router.get('/login', authController.auth_login_get);

router.post('/login', passport.authenticate('local', 
{ 
    failureRedirect: '/auth/login', 
    successRedirect: '/',
    failureFlash: 'Invalid username or password', 
}));

router.get('/logout', authController.auth_logout_get);




// TESTING
router.get('/login-failure', (req, res) => res.render('auth/login-failure', { title: 'Failed Login'}));
router.get('/login-success', (req, res) => res.render('auth/login-success', { title: 'Login Success'}));



module.exports = router;