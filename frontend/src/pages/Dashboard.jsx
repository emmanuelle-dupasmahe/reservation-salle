import { useAuth } from '../hooks/useAuth.js';
import { useState } from 'react';
import { reservationService } from '../services/api.js';

function Dashboard() {
    const { user, logout } = useAuth();
    const [currentDate] = useState(new Date());

    // ÉTATS AJOUTÉS POUR LA MODALE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({ date: '', dateAffichee: '', heure: '' });
    const [objet, setObjet] = useState('');

    const getWeekDays = (date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
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
                }),
                dateISO: nextDay.toISOString().split('T')[0] // Format YYYY-MM-DD pour la BDD
            });
        }
        return days;
    };

    const weekDays = getWeekDays(currentDate);
    const heures = Array.from({ length: 12 }, (_, i) => i + 8);

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
                                    color: 'black', borderRadius: '10px', padding: '15px', textTransform: 'uppercase', fontSize: '0.9rem'
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
                                    <td key={index}
                                        onClick={() => handleCellClick(day, heure)} // AJOUT DU CLIC
                                        style={{
                                            backgroundColor: '#334155', height: '60px', borderRadius: '8px', border: '1px solid #475569', cursor: 'pointer'
                                        }}
                                    >
                                        {/* Affichage fictif pour l'exemple */}
                                        {heure === 9 && index === 0 && (
                                            <div style={{ backgroundColor: '#94a3b8', color: 'black', fontSize: '0.7rem', padding: '5px', borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                                                <strong>{user?.lastname?.toUpperCase()} {user?.firstname}</strong>
                                                <span>Réunion projet</span>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODALE DE RÉSERVATION */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '15px', border: '2px solid #2dd4bf', width: '400px', color: 'white' }}>
                        <h2 style={{ color: '#2dd4bf' }}>Nouvelle Réservation</h2>
                        <p>Le <strong>{selectedSlot.dateAffichee}</strong> à <strong>{selectedSlot.heure}h00</strong></p>

                        <div style={{ margin: '20px 0' }}>
                            <label>Objet de la réunion :</label>
                            <input
                                type="text"
                                value={objet}
                                onChange={(e) => setObjet(e.target.value)}
                                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: 'none', color: 'white' }}
                                placeholder="Ex: Point projet"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid white', background: 'none', color: 'white' }}>Annuler</button>
                            <button onClick={handleConfirmBooking} style={{ padding: '10px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#2dd4bf', fontWeight: 'bold' }}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;