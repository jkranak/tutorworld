const jwt = require('jsonwebtoken');
require('dotenv').config();

export const generateToken = (id:any, role:string) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );
};