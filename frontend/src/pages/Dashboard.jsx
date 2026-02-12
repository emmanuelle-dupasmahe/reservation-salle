import { useAuth } from '../hooks/useAuth.js';
import { useState, useEffect } from 'react';
// import { reservationService } from '../services/api.js'; //  quand le service sera prêt

function Dashboard() {
    const { user, logout } = useAuth();
    const [reservations, setReservations] = useState([]);

    // Configuration du planning
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const heures = Array.from({ length: 12 }, (_, i) => i + 8); // [8, 9, ..., 19]

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Planning TechSpace</h1>
                <div>
                    <span>Bienvenue, <strong>{user?.firstname}</strong></span>
                    <button onClick={logout} style={{ marginLeft: '10px' }}>Déconnexion</button>
                </div>
            </header>

            <hr />

            {/* Grille du Planning */}
            <div style={{ overflowX: 'auto' }}>
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4' }}>
                            <th style={{ padding: '10px' }}>Heures</th>
                            {jours.map(jour => (
                                <th key={jour} style={{ padding: '10px' }}>{jour}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {heures.map(heure => (
                            <tr key={heure}>
                                <td style={{ fontWeight: 'bold', padding: '10px', backgroundColor: '#fafafa' }}>
                                    {heure}h00
                                </td>
                                {jours.map(jour => (
                                    <td key={`${jour}-${heure}`} style={{ height: '50px', cursor: 'pointer' }} 
                                        onClick={() => alert(`Réserver le ${jour} à ${heure}h ?`)}>
                                        {/* Ici on affichera les réservations plus tard */}
                                        <small style={{ color: '#ccc' }}>Libre</small>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;