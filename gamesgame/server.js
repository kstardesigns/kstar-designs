require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let accessToken = '';

async function getAccessToken() {
    try {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            })
        });

        const data = await response.json();
        accessToken = data.access_token;
        console.log('Access token obtained:', accessToken);
    } catch (error) {
        console.error('Error obtaining access token:', error);
    }
}

async function fetchData(query) {
    try {
        console.log('Sending request with query:', query);
        console.log('access:' + accessToken);

        const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: query
        });

        const data = await response.json();
        console.log('Raw response data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data from IGDB:', error);
        throw error; 
    }
}

async function fetchAgeRatings(ageRatingIds) {
    try {
        const query = `fields rating, content_descriptions; where id = (${ageRatingIds.join(',')});`;
        console.log('Age Ratings Query:', query);
        const response = await fetch('https://api.igdb.com/v4/age_ratings', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: query
        });
        const data = await response.json();
        console.log('Age Ratings Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching age ratings from IGDB:', error);
        throw error; 
    }
}

async function fetchInvolvedCompanies(companyIds) {
    try {
        const query = `fields company.*; where id = (${companyIds.join(',')});`;
        // * where (id = (98353,148028,224520,224521) & company.published = (1074)); fields company.*; sort id asc; limit 50;
        console.log('Company list Query:', query);
        const response = await fetch('https://api.igdb.com/v4/involved_companies', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: query
        });
        const data = await response.json();
        console.log('Involved companies Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching age ratings from IGDB:', error);
        throw error; 
    }
}

async function fetchCharacters(searchTerms) {
    try {
        const searchConditions = searchTerms.map(term => 
            `name ~ *"${term}"*`
        ).join(' | '); // Join with OR condition

        const query = `fields id, name, akas; where ${searchConditions};`;
        console.log('Character query:', query); // For debugging purposes

        const response = await fetch('https://api.igdb.com/v4/characters', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            },
            body: query
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('characters:', data);
        return data;
    } catch (error) {
        console.error('Error fetching characters from IGDB:', error);
        throw error;
    }
}


app.use(express.static(path.join(__dirname, 'public')));

app.get('/games', async (req, res) => {
    if (!accessToken) await getAccessToken();
    const searchQuery = req.query.search;
    try { //show games that have a critic rating and do not have "fanmade" keyword
      const query = `search "${searchQuery}"; where rating > 1 & keywords != (27216); fields name, cover.url, release_dates.date; limit 10;`;
      const games = await fetchData(query); 
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from IGDB' });
    }
});

app.get('/game', async (req, res) => {
  if (!accessToken) await getAccessToken();
  const gameId = req.query.id;
  try {
    const query = `where id = ${gameId}; fields *, cover.url, release_dates.y, age_ratings.content_descriptions, involved_companies.*;`;
    const game = await fetchData(query);
      res.json(game);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from IGDB' });
  }
});

app.get('/age_ratings', async (req, res) => {
    if (!accessToken) await getAccessToken();
    const ratingIds = req.query.ids.split(',').map(id => parseInt(id, 10));
    console.log('Rating IDs from Request:', ratingIds);
    
    try {
      //const query = `where id = (${ratingIds.join(',')}); fields rating;`;
      const ratings = await fetchAgeRatings(ratingIds);
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from IGDB' });
    }
});

app.get('/involved_companies', async (req, res) => {
    if (!accessToken) await getAccessToken();
    const companyIds = req.query.ids.split(',').map(id => parseInt(id, 10));
    console.log('Company IDs from Request:', companyIds);
    
    try {
      const companies = await fetchInvolvedCompanies(companyIds);
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from IGDB' });
    }
});

app.get('/characters', async (req, res) => {
    if (!accessToken) await getAccessToken();
    const searchTerms = req.query.searchTerms.split(',');
    console.log('Search Terms from Request:', searchTerms);

    try {
        const characters = await fetchCharacters(searchTerms);
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from IGDB' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
