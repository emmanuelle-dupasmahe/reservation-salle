import express from 'express';
import { createReservation, getReservations, deleteReservation, updateReservation } from '../controllers/reservation.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // pour sécuriser la route

const router = express.Router();

// seuls les utilisateurs connectés peuvent réserver
router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getReservations);
router.delete('/:id', authMiddleware, deleteReservation);
router.put('/:id', authMiddleware, updateReservation);

export default router;
