import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout,
  getCurrentUser,
  googleCallback,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  getAllUsers
} from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);
router.get("/getallusers",getAllUsers)
// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleCallback
);

export default router;
