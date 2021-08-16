const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

const authenticate = async (req:any, res:any, next:any) => {
  try {
    const token = req.header('x-auth-token');

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedData;
      next();
    } else {
      res.status(401).send({message: 'No token, authorization denied.'});
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = authenticate;