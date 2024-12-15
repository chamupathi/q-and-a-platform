const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');



// middleware to get user info
const userInfo = async (req, res, next) => {

  const authorization = req.headers['authorization'];
  const response = await fetch('https://q-and-a.uk.auth0.com/userinfo', {
      method: 'GET',
      headers: {
          Authorization: authorization, // Add Bearer token
          'Content-Type': 'application/json',
      },
  })

  // Check if the response is okay
  if (!response.ok) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
  }

  
  // Parse the JSON response
  const userData = await response.json();

  req._userInfo = userData;

  next()
}

module.exports = userInfo;
