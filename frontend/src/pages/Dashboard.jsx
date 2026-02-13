import { useAuth } from '../hooks/useAuth.js';
import { useState, useEffect } from 'react';
import { reservationService } from '../services/api.js';

function Dashboard() {
    const { user, logout } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({ date: '', dateAffichee: '', heure: '' });
    const [objet, setObjet] = useState('');

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const prevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const loadPlanning = async () => {
        try {
            const data = await reservationService.getPlanning();
            setReservations(data);
        } catch (err) {
            console.error("Erreur chargement planning:", err);
        }
    };

    useEffect(() => {
        loadPlanning();
    }, []);

    const getWeekDays = (date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 5; i++) {
            const nextDay = new Date(startOfWeek);
            nextDay.setDate(startOfWeek.getDate() + i);
            const y = nextDay.getFullYear();
            const m = String(nextDay.getMonth() + 1).padStart(2, '0');
            const d = String(nextDay.getDate()).padStart(2, '0');

            days.push({
                nom: nextDay.toLocaleDateString('fr-FR', { weekday: 'long' }),
                dateAffichee: nextDay.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
                dateISO: `${y}-${m}-${d}`
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
            setIsModalOpen(false);
            setObjet('');
            loadPlanning();
        } catch (err) {
            alert(err.message || "Erreur lors de la réservation");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <header className="bg-teal-400 p-5 text-black flex justify-between items-center shadow-lg font-bold">
                <span>Planning Salles</span>
                <button onClick={logout} className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition-all">
                    Déconnexion ({user?.firstname})
                </button>
            </header>

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={prevWeek} className="bg-teal-400 text-black w-10 h-10 rounded-full font-bold">◀</button>
                    <h2 className="text-2xl text-teal-400 font-bold italic">
                        Semaine du {weekDays[0].dateAffichee}
                    </h2>
                    <button onClick={nextWeek} className="bg-teal-400 text-black w-10 h-10 rounded-full font-bold">▶</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th className="w-16"></th>
                                {weekDays.map((day, idx) => (
                                    <th key={idx} className="bg-teal-400 text-black p-3 rounded-xl uppercase text-xs">
                                        {day.nom} <br /> {day.dateAffichee}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {heures.map(heure => (
                                <tr key={heure}>
                                    <td className="text-teal-400 font-bold text-right pr-4">{heure}h</td>
                                    {weekDays.map((day, idx) => {
                                        // Recherche de la réservation 
                                        const resa = reservations.find(r => {
                                            const d = new Date(r.date_resa);
                                            const y = d.getFullYear();
                                            const m = String(d.getMonth() + 1).padStart(2, '0');
                                            const dayNum = String(d.getDate()).padStart(2, '0');
                                            const dateLocaleBDD = `${y}-${m}-${dayNum}`;
                                            const hStart = parseInt(r.heure_debut.split(':')[0]);
                                            return dateLocaleBDD === day.dateISO && hStart === heure;
                                        });

                                        // couleur des cellules
                                        let cellClass = "bg-slate-700 hover:bg-slate-600 cursor-pointer";
                                        if (resa) {
                                            const todayStr = new Date().toLocaleDateString('en-CA');
                                            const dateResaStr = day.dateISO;

                                            if (dateResaStr < todayStr) {
                                                cellClass = "bg-slate-500 opacity-50 cursor-default"; // GRIS pour dates passées
                                            } else if (Number(resa.user_id) === Number(user.id)) {
                                                cellClass = "bg-yellow-400 text-black font-bold shadow-inner"; // JAUNE pour moi
                                            } else {
                                                cellClass = "bg-red-500 text-black font-bold"; // ROUGE pour les autres
                                            }
                                        }

                                        return (
                                            <td key={idx}
                                                onClick={() => !resa && handleCellClick(day, heure)}
                                                className={`${cellClass} h-16 rounded-lg transition-all p-2 border-2 border-transparent`}
                                            >
                                                {resa && (
                                                    <div className="text-[10px] text-center uppercase leading-tight">
                                                        <p className="font-black">{resa.lastname}</p>
                                                        <p className="font-normal lowercase italic truncate">{resa.objet}</p>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-400 w-full max-w-md shadow-2xl text-white">
                        <h2 className="text-teal-400 text-2xl font-bold mb-4 uppercase">Réservation</h2>
                        <p className="mb-6">Le <strong>{selectedSlot.dateAffichee}</strong> à <strong>{selectedSlot.heure}h00</strong></p>
                        <div className="mb-6">
                            <label className="block mb-2">Objet :</label>
                            <input
                                type="text"
                                value={objet}
                                onChange={(e) => setObjet(e.target.value)}
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-teal-400 text-white"
                                placeholder="Titre de la réunion..."
                            />
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-white">Annuler</button>
                            <button onClick={handleConfirmBooking} className="px-6 py-2 rounded-lg bg-teal-400 text-black font-bold">Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;