const jwt = require('jsonwebtoken');
const Users = require('../modelsss/user');
const jwtSecret = 'keyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';

const authuser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const usertoken = authorizationHeader.split(' ')[1];

    if (!usertoken) {
      return res.status(401).json({ message: 'Unauthorized: Token is missing' });
    }

    const isCustomAuth = usertoken.length < 500;
    let decodedData;

    if (isCustomAuth) {
      decodedData = jwt.verify(usertoken, jwtSecret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(usertoken);
      const googleId = decodedData?.sub.toString();
      const user = await Users.findOne({ googleId });
      req.uuserId = user?._id;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authuser;
