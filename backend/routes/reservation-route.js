import express from 'express';
import { createReservation } from '../controllers/reservation.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js'; // pour sécuriser la route

const router = express.Router();

// seuls les utilisateurs connectés peuvent réserver
router.post('/', verifyToken, createReservation);

export default router;