const axios = require('axios');
const apiURL = 'https://api.sportsdata.io/v3/nhl/scores/json/News?key='

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

    // Select articles to display and attach logo urls
    const selections = articles.slice(0, 15).filter(article => article.Team != null);
    selections.forEach(article => {
        nhlteams.find(team => {
            if (article.Team === team.Key) {
                article.Logo = team.WikipediaLogoUrl;
            }
        })
    });


    res.render('index', { title: 'Ice Hub' , articles: selections });
}
