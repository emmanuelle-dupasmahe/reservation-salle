import { useAuth } from '../hooks/useAuth.js';
import { useState } from 'react';
import { reservationService } from '../services/api.js';

function Dashboard() {
    const { user, logout } = useAuth();
    const [currentDate] = useState(new Date()); 

    // --- LA FONCTION MANQUANTE ---
    const getWeekDays = (date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        // Ajustement pour trouver le lundi (si dimanche day=0, on recule de 6)
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 5; i++) {
            const nextDay = new Date(startOfWeek);
            nextDay.setDate(startOfWeek.getDate() + i);
            days.push({
                nom: nextDay.toLocaleDateString('fr-FR', { weekday: 'long' }),
                dateAffichee: nextDay.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            });
        }
        return days;
    };

    const weekDays = getWeekDays(currentDate);
    const heures = Array.from({ length: 12 }, (_, i) => i + 8); // 8h à 19h



    const handleCellClick = (day, heure) => {
        setSelectedSlot({ date: day.dateISO, dateAffichee: day.dateAffichee, heure });
        setIsModalOpen(true);
    };

    const handleConfirmBooking = async () => {
        try {
            await reservationService.create({
                date_resa: selectedSlot.date,
                heure_debut: `${selectedSlot.heure}:00:00`,
                heure_fin: `${selectedSlot.heure + 1}:00:00`,
                objet: objet
            });
            alert("Réservation réussie !");
            setIsModalOpen(false);
            setObjet('');
            // Idéalement, ici on rafraîchirait la liste des réservations
        } catch (err) {
            alert(err.message || "Erreur lors de la réservation");
        }
    };

    return (
        <div className="dashboard-container">
            
            <header style={{ backgroundColor: '#2dd4bf', padding: '20px', color: 'black', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span>Accueil</span>
                    <span>Inscription</span>
                    <span>Connexion</span>
                </div>
                <button onClick={logout} style={{ background: 'none', border: '1px solid black', cursor: 'pointer', borderRadius: '5px' }}>
                    Déconnexion ({user?.firstname})
                </button>
            </header>

            <div style={{ padding: '20px', backgroundColor: '#1e293b', minHeight: '100vh', color: 'white' }}>
                {/* Sélecteur de semaine */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                    <button style={{ background: '#2dd4bf', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>◀</button>
                    <h2 style={{ fontSize: '1.5rem', color: '#2dd4bf' }}>Semaine du {weekDays[0].dateAffichee}</h2>
                    <button style={{ background: '#2dd4bf', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>▶</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '8px' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}></th>
                            {weekDays.map((day, index) => (
                                <th key={index} style={{ 
                                    backgroundColor: index === 0 ? '#94a3b8' : '#2dd4bf', 
                                    color: 'black',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem'
                                }}>
                                    {day.nom} <br /> 
                                    <span style={{ fontSize: '0.8rem' }}>{day.dateAffichee}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {heures.map(heure => (
                            <tr key={heure}>
                                <td style={{ textAlign: 'right', paddingRight: '15px', fontSize: '0.9rem', color: '#2dd4bf', fontWeight: 'bold' }}>
                                    {heure}h
                                </td>
                                {weekDays.map((day, index) => (
                                    <td key={index} style={{ 
                                        backgroundColor: '#334155', 
                                        height: '60px', 
                                        borderRadius: '8px',
                                        border: '1px solid #475569',
                                        position: 'relative',
                                        padding: '5px'
                                    }}>
                                        {/* Simulation visuelle de votre Figma */}
                                        {heure === 9 && index === 0 && (
                                            <div style={{ 
                                                backgroundColor: '#94a3b8', 
                                                color: 'black', 
                                                fontSize: '0.7rem',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                textAlign: 'center'
                                            }}>
                                                <strong>{user?.lastname.toUpperCase()} {user?.firstname}</strong>
                                                <span>Réunion sur ????</span>
                                            </div>
                                        )}
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