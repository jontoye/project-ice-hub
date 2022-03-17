const League = require('../models/league');
const axios = require('axios');
const apiURL = 'https://api.sportsdata.io/v3/nhl/scores/json/News?key='
const { DateTime } = require('luxon');

const articles = require('../cache/articles.json');
const nhlteams = require('../cache/nhlteams.json');

// format article dates
articles.forEach(article => {
    article.Updated = DateTime.fromISO(article.Updated).toRelative();
});

// LIVE VERSION
// exports.index = async (req, res) => {
//     try {
//         const results = await axios.get(apiURL + process.env.apiKEY);
//         res.render('index', { title: 'Ice Hub' , articles: results.data });
// 	} catch (err) {
// 		console.error(err);
// 	}
// }


// TEST VERSION - uses caches of api data
exports.index = (req, res) => {

    let title;
    let selections;

    if (req.user) {
        title = req.session.leagueName;
        selections = false;
    } else {
        title = 'Home';
        // Select articles to display 
        selections = articles.slice(0, 15).filter(article => article.Team != null);
        selections.forEach(article => {
            // attach logo url
            nhlteams.find(team => {
                if (article.Team === team.Key) {
                    article.Logo = team.WikipediaLogoUrl;
                }
            });
        });
    }

    res.render('index', { title: 'Home' , articles: selections });

}
