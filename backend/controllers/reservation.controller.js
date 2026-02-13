import db from '../config/db.js';

// FONCTION POUR LIRE LE PLANNING
export const getReservations = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT r.*, u.firstname, u.lastname 
            FROM reservations r 
            JOIN users u ON r.user_id = u.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// FONCTION POUR CRÉER UNE RÉSERVATION
export const createReservation = async (req, res) => {
    const { date_resa, heure_debut, heure_fin, objet } = req.body;
    const userId = req.userId;

    if (!date_resa || !heure_debut || !objet) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    try {
        const dayOfWeek = new Date(date_resa).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return res.status(400).json({ error: "Réservations interdites le week-end" });
        }

        const [existing] = await db.execute(
            'SELECT * FROM reservations WHERE date_resa = ? AND heure_debut = ?',
            [date_resa, heure_debut]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: "Ce créneau est déjà réservé !" });
        }

        await db.execute(
            'INSERT INTO reservations (date_resa, heure_debut, heure_fin, objet, user_id) VALUES (?, ?, ?, ?, ?)',
            [date_resa, heure_debut, heure_fin, objet, userId]
        );

        res.status(201).json({ message: "Réservation confirmée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//fonction pour supprimer une réservation

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Récupéré via le middleware auth

        // On vérifie que la réservation appartient bien à l'utilisateur

        const [result] = await db.query(
            'DELETE FROM reservations WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Réservation non trouvée ou non autorisée" });
        }

        res.json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};