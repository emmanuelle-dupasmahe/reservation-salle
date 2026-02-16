// pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { reservationService } from '../services/api.js';

function Profile() {
    const { user } = useAuth();
    const [myReservations, setMyReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMyReservations();
    }, []);

    const loadMyReservations = async () => {
        try {
            const data = await reservationService.getPlanning();
            // On ne garde que les réservations de l'utilisateur connecté
            const filtered = data.filter(r => Number(r.user_id) === Number(user.id));
            // On trie par date la plus proche
            const sorted = filtered.sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            setMyReservations(sorted);
        } catch (err) {
            console.error("Erreur chargement profil", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette réservation ?")) {
            await reservationService.delete(id);
            loadMyReservations();
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-teal-400 text-3xl font-black italic uppercase tracking-tighter">
                        Mon Profil
                    </h1>
                    <p className="text-slate-400">Bienvenue, {user?.firstname} {user?.lastname}</p>
                </header>

                <section className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                        <h2 className="text-white font-bold uppercase tracking-widest text-sm">Mes Réservations</h2>
                    </div>

                    <div className="divide-y divide-slate-700">
                        {myReservations.length > 0 ? (
                            myReservations.map(res => (
                                <div key={res.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-700/30 transition-all">
                                    <div>
                                        <p className="text-teal-400 font-bold">{new Date(res.date_resa).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                        <p className="text-white text-lg font-medium">{res.objet || "Sans titre"}</p>
                                        <p className="text-slate-500 text-sm">
                                            {res.heure_debut.slice(0, 5)} - {res.heure_fin.slice(0, 5)}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => alert('Fonction modifier à lier ici')}
                                            className="px-4 py-2 bg-slate-700 text-white rounded-lg text-xs font-bold uppercase hover:bg-slate-600 transition-all"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(res.id)}
                                            className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-slate-500 italic">
                                Aucune réservation trouvée.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;