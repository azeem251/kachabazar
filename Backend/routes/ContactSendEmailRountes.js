import express from 'express';
import { ContactSendEmail } from '../controllers/ContactSendEmail.js';
const router = express.Router();

router.post('/', ContactSendEmail);