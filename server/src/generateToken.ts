import jwt from 'jsonwebtoken';

export const generateToken = (email:any) => {
  return jwt.sign(
    {
      email,
    },
    'secret',
    {
      expiresIn: '24h'
    }
  );
};