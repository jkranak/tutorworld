const jwt = require('jsonwebtoken');
require('dotenv').config();

export const generateToken = (id:any) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );
};