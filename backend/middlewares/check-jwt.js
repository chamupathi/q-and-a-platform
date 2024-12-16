const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URL,
  }),

  // Validate the audience and the issuer
  audience: process.env.JWT_AUD, //replace with your API's audience, available at Dashboard > APIs
  issuer: process.env.JWT_ISSUER,
  algorithms: ['RS256'],
});

module.exports = checkJwt;
