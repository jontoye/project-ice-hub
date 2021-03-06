const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const arenaRouter = require('./routes/arenas');
const leaguesRouter = require('./routes/leagues');
const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players');
const gamesRouter = require('./routes/games');

const app = express();

// connect to database
require('./config/database');

// setup session and passport
app.use(session({
	secret: process.env.secret,
	resave: false,
	saveUninitialized: false,
}));
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


// Sharing info between pages
app.use((req, res, next) => {
	res.locals.user = req.user;
	if (req.user) {
		res.locals.leagueName = req.session.leagueName;
		res.locals.leagueURL = req.session.leagueURL;
		res.locals.leagueID = req.user.leagueID;
		res.locals.league = req.session.league;
	}
	next();
})

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/arenas', arenaRouter);
// app.use('/leagues', leaguesRouter);
app.use('/teams', teamsRouter);
app.use('/players', playersRouter);
app.use('/games', gamesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error', { title: Error });
});

module.exports = app;
