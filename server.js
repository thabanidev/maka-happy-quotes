import express from 'express'
import dotenv from 'dotenv'
import request from 'request'
import path from 'path'

dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'index.html'))
});

app.get('/quotes', (req, res) => {
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
            console.log('Quote:', quote);
            res.json({ quote: quote.quote, author: quote.author });
        } catch (err) {
            console.error('Error parsing API response:', err);
            res.status(500).json({ error: 'Failed to process quote' });
        }
    });
});

app.get('about', (req, res) => {
    res.send('This is an about page');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
});