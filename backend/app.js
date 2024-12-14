const express = require('express');
const bodyParser = require('body-parser');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config()

// Initialize the app and middleware
const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create middleware for checking the JWT
const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URL
    }),
  
    // Validate the audience and the issuer
    audience: process.env.JWT_AUD, //replace with your API's audience, available at Dashboard > APIs
    issuer: process.env.JWT_ISSUER,
    algorithms: [ 'RS256' ]
  });

console.log('JWKS_URL', process.env.JWKS_URL)
app.get('/', checkJwt, (req, res) => {
    res.json({ great: false })
})

// API endpoint
app.post('/search', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    // Fuzzy Search
    const fuzzyResults = fuzzySearch.search(query);

    // Semantic Search
    const queryEmbedding = await model.encode(query);
    const similarities = questionEmbeddings.map((embedding, index) => ({
        index,
        score: cosineSimilarity(queryEmbedding, embedding),
    }));
    const semanticResults = similarities
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(result => questionAnswerPairs[result.index]);

    // Combine and rank results (simple example: merge fuzzy + semantic)
    const combinedResults = [...fuzzyResults, ...semanticResults];
    const uniqueResults = combinedResults.reduce((acc, item) => {
        if (!acc.find(el => el.question === item.question)) {
            acc.push(item);
        }
        return acc;
    }, []);

    res.json({ results: uniqueResults });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
