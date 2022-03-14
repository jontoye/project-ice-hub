const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You must be logged in to view this resource' });
    }
}

const isLeagueAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'league_admin') {
        next();
    } else {
        res.status(401).json({ msg: 'You must be a league administrator to view this resource' });
    }    
}

const isTeamAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'team_admin') {
        next();
    } else {
        res.status(401).json({ msg: 'You must be a team administrator to view this resource' });
    }
}

module.exports = {
    isAuth,
    isLeagueAdmin,
    isTeamAdmin,
}