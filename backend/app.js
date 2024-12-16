require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const checkJwt = require('./middlewares/check-jwt');
const userInfo = require('./middlewares/user-info');
const cors = require('cors');

const questionRoutes = require('./routes/questions-routes');
const tagsRoutes = require('./routes/tags-routes');
const propertiesRoutes = require('./routes/properties-routes');
const errorHandler = require('./middlewares/error-handler');

// Initialize the app and middleware
const app = express();

app.use(helmet());
// Enable CORS
app.use(cors());

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkJwt);
app.use(userInfo);

// routes
app.use('/v1/questions', questionRoutes);
app.use('/v1/tags', tagsRoutes);
app.use('/v1/properties', propertiesRoutes);

// error-handling middleware
app.use(errorHandler);

// Start the server
const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutDown = () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}

// Graceful shutdown
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);