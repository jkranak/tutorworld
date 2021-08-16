const jwt = require('jsonwebtoken');
require('dotenv').config();

export const generateToken = (email:any) => {
  return jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );
};