const axios = require('axios');
const apiURL = 'https://api.sportsdata.io/v3/nhl/scores/json/News?key='
const { DateTime } = require('luxon');

const articles = require('../cache/articles.json');
const nhlteams = require('../cache/nhlteams.json');

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

    // Select articles to display 
    const selections = articles.slice(0, 15).filter(article => article.Team != null);
    selections.forEach(article => {

        // attach logo url
        nhlteams.find(team => {
            if (article.Team === team.Key) {
                article.Logo = team.WikipediaLogoUrl;
            }
        });

        // format date
        article.Updated = DateTime.fromISO(article.Updated).toRelative();
    });


    res.render('index', { title: 'Ice Hub' , articles: selections });
}
