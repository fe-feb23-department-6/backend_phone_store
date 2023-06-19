import jwt from 'jsonwebtoken';

const generateAccessToken = (user: string | object | Buffer) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error('JWT Access Secret is not set!');
  }

  return jwt.sign(user, secret);
};

const validateAccessToken = (token: string) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error('JWT Access Secret is not set!');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
};
