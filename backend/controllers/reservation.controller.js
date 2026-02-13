import db from '../config/db.js';

export const createReservation = async (req, res) => {
    const { date_resa, heure_debut, heure_fin, objet } = req.body;
    const userId = req.userId; // récupéré via le middleware verifyToken

    // validation de base
    if (!date_resa || !heure_debut || !objet) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    try {
        // vérification du week-end 
        const dayOfWeek = new Date(date_resa).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return res.status(400).json({ error: "Les réservations sont interdites le week-end" });
        }

        // vérification de collision 
        // on cherche s'il existe une résa à la même date qui chevauche l'heure choisie
        const [existing] = await db.execute(
            'SELECT * FROM reservations WHERE date_resa = ? AND heure_debut = ?',
            [date_resa, heure_debut]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: "Ce créneau est déjà réservé !" });
        }

        // insertion
        await db.execute(
            'INSERT INTO reservations (date_resa, heure_debut, heure_fin, objet, user_id) VALUES (?, ?, ?, ?, ?)',
            [date_resa, heure_debut, heure_fin, objet, userId]
        );

        res.status(201).json({ message: "Réservation confirmée" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};