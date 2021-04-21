import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const authenticateToken = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = {
        _id: decoded.id,
      };
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Oops, Token failed');
    }
  } else {
    res.status(401);
    throw new Error('No Token found');
  }
});
