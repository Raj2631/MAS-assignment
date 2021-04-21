import express from 'express';
import {
  loginUser,
  registerUser,
  getUserProfile,
} from '../controllers/userControllers.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
  userValidationRules,
  validate,
} from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', userValidationRules(), validate, registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
export default router;
