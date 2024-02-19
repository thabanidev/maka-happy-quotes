const express = require('express');
const dotenv = require('dotenv');
const request = require('request');
const path = require('path');

dotenv.config()

const app = express()

app.use(express.static('public'));
app.use(express.json());

// index.html in public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/quotes', (req, res) => {
    const category = req.query.category || 'life'; // Get category from query parameter or default to 'life'
    const apiKey = process.env.API_KEY; // Use the loaded API key from .env

    // Make API request using the key and category
    request(`https://api.api-ninjas.com/v1/quotes?category=${category}`, { headers: { 'X-Api-Key': apiKey } }, (error, response, body) => {
        if (error) {
            console.error('API request error:', error);
            return res.status(500).json({ error: 'Failed to fetch quote' });
        }

        try {
            const data = JSON.parse(body);
            const quote = data[0];

            res.json({ quote: quote.quote, author: quote.author });
        } catch (err) {
            console.error('Error parsing API response:', err);
            res.status(500).json({ error: 'Failed to process quote' });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
