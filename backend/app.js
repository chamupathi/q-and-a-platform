require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const checkJwt = require('./middlewares/checkJwt');
const userInfo = require('./middlewares/userInfo');
// const { expressjwt: jwt } = require('express-jwt');
// const jwksRsa = require('jwks-rsa');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes');

// Initialize the app and middleware
const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(checkJwt)

app.use(userInfo) 


app.get('/', (req, res) => {
    // console.log('req.auth', req.auth)
    // console.log('req', req)

    var userId = req.auth['https://q-and-a.uk.auth0.com/email'];
    console.log('email', userId)

    res.json({ great: false })
})

app.use('/v1/questions', questionRoutes);


const base = require('./datastore/airtablebase');
base('Questions').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 1,
    view: "Grid view",
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record, i) {
        // console.log('Retrieved',i, record.get('Question Text'));
        console.log('Retrieved', i, record.fields);
        // console.log('Retrieved',i, record.get('Tags'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});


// Add your error-handling middleware at the end
app.use((err, req, res, next) => {
    // Log the error (optional)
    console.error(err.stack);
  
    // Set default status code if not set
    const statusCode = err.status || 500;
  
    // Send error response
    res.status(statusCode).json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  });
  

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
