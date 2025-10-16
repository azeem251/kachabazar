import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv'
dotenv.config()
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ email: profile.emails[0].value });

  if (existingUser) return done(null, existingUser);

  const newUser = await User.create({
    name: profile.displayName,
    email: profile.emails[0].value,
    password: null, // Google user
  });

  return done(null, newUser);
}));
