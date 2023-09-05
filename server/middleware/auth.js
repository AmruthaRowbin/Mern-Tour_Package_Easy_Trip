const jwt = require('jsonwebtoken');
const Agent = require('../modelsss/agent');
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token,jwtSecret );
      req.agentId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const agent = await Agent.findOne({ googleId });
      req.agentId = agent?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};



module.exports = auth;
