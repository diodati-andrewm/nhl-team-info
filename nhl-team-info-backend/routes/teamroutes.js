const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        axios.get('https://api-web.nhle.com/v1/standings/now')
        .then(response => {
            res.send(response.data.standings);
        })
        .catch(error => {
            console.log(error);
    });
    } catch (e) {
        console.error('Error fetching teams:', e);
        res.status(500).send('Error fetching teams');
    }
});

router.get('/:abbr', async (req, res) => {
    const abbr = req.params.abbr;
    const url = 'https://api-web.nhle.com/v1/standings/now';
    try {
        axios.get(url)
        .then(response => {
            let teamData = {};
            // check to see if we passed a valid id
            for( var i = 0; i < response.data.standings.length; i++ ) {
                if(response.data.standings[i].teamAbbrev.default == abbr) {
                    teamData = response.data.standings[i]; // capture this part of the JSON 
                    break;
                }
            }
            if(Object.keys(teamData).length === 0) {
                console.error('No team details found for team abbreviation: ' + abbr);
                res.status(404).send('No team details found for team abbreviation: ' + abbr);
            }
            else {
                res.send(teamData);
            }
        })
        .catch(error => {
            console.log(error);
    });
    } catch (e) {
        console.error('Error fetching team details for team ' + abbr + ': ', e);
        res.status(500).send('Error fetching team details for team: ' + abbr);
    }
});

module.exports = router;