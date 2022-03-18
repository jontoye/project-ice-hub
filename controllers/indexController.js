const League = require('../models/league');
const axios = require('axios');
const apiURL = 'https://api.sportsdata.io/v3/nhl/scores/json/News?key='
const { DateTime } = require('luxon');
const nhlteams = require('../cache/nhlteams.json');

exports.index = (req, res) => {

    let articles;

    axios.get(apiURL + process.env.apiKEY)
        .then(response => {
            articles = response.data;

            articles.forEach(article => {
                // formate dates
                article.Updated = DateTime.fromISO(article.Updated).toRelative()

                // attach logo url
                nhlteams.find(team => {
                    if (article.Team === team.Key) {
                        article.Logo = team.WikipediaLogoUrl;
                    }
                });
            });

            res.render('index', { title: 'Home' , articles });
        })
        .catch(err => {
            console.log('Error getting articles ', err);
        })
}
