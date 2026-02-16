// pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { reservationService } from '../services/api.js';

function Profile() {
    const { user } = useAuth();
    const [myReservations, setMyReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingResa, setEditingResa] = useState(null);
    const [editObjet, setEditObjet] = useState('');
    const [editHeureFin, setEditHeureFin] = useState('');

    const [allReservations, setAllReservations] = useState([]);



    useEffect(() => {
        loadMyReservations();
    }, []);

    const loadMyReservations = async () => {
        try {
            const data = await reservationService.getPlanning();
            setAllReservations(data);
            // on ne garde que les réservations de l'utilisateur connecté
            const filtered = data.filter(r => Number(r.user_id) === Number(user.id));
            // on trie par date la plus proche
            const sorted = filtered.sort((a, b) => new Date(a.date_resa) - new Date(b.date_resa));
            setMyReservations(sorted);
        } catch (err) {
            console.error("Erreur chargement profil", err);
        } finally {
            setLoading(false);
        }
    };

    //fonction pour pour ouvrir la modale
    const openEditModal = (resa) => {
        setEditingResa(resa);
        setEditObjet(resa.objet);
        setEditHeureFin(parseInt(resa.heure_fin.split(':')[0]));
        setIsEditModalOpen(true);
    };

    // fonction pour enregistrer
    const handleUpdate = async () => {

        //pour éviter que 2 réunions se chevauchent
        const isCollision = allReservations.some(resa => {
            if (resa.id === editingResa.id) return false;

            // formatage de la date de la réservation existante (YYYY-MM-DD)
            const d = new Date(resa.date_resa);
            const dateLocaleBDD = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

            // formatage de la date de la réservation qu'on modifie
            const de = new Date(editingResa.date_resa);
            const dateEditing = `${de.getFullYear()}-${String(de.getMonth() + 1).padStart(2, '0')}-${String(de.getDate()).padStart(2, '0')}`;

            if (dateLocaleBDD !== dateEditing) return false;

            const hStartExistante = parseInt(resa.heure_debut.split(':')[0]);
            const hEndExistante = parseInt(resa.heure_fin.split(':')[0]);

            const hStartSaisie = parseInt(editingResa.heure_debut.split(':')[0]);
            const hEndSaisie = editHeureFin;

            return hStartSaisie < hEndExistante && hEndSaisie > hStartExistante;
        });

        if (isCollision) {
            alert("Impossible : Cette modification empiète sur une autre réservation !");
            return;
        }

        try {
            await reservationService.update(editingResa.id, {
                objet: editObjet,
                heure_fin: `${editHeureFin}:00:00`
            });
            setIsEditModalOpen(false);
            loadMyReservations(); // On rafraîchit la liste
        } catch (err) {
            alert("Erreur lors de la modification");
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
                                            onClick={() => openEditModal(res)}
                                            className="px-4 py-2 bg-slate-700 text-white rounded-lg text-xs font-bold uppercase hover:bg-teal-400 hover:text-black transition-all"
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
            {/* MODALE DE MODIFICATION */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-400 w-full max-w-md shadow-2xl text-white">
                        <h2 className="text-teal-400 text-2xl font-black mb-4 uppercase italic">Modifier la réunion</h2>

                        <div className="mb-6">
                            <label className="block text-teal-400 text-xs font-bold mb-2 uppercase">Objet de la réunion</label>
                            <input
                                type="text"
                                value={editObjet}
                                onChange={(e) => setEditObjet(e.target.value)}
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none focus:border-teal-400 text-white font-medium"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-teal-400 text-xs font-bold mb-2 uppercase">Heure de fin</label>
                            <select
                                value={editHeureFin}
                                onChange={(e) => setEditHeureFin(parseInt(e.target.value))}
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400"
                            >
                                {/* on génère les heures de fin possibles (après l'heure de début actuelle) */}
                                {Array.from({ length: 12 }, (_, i) => i + 8)
                                    .filter(h => h > parseInt(editingResa?.heure_debut.split(':')[0]))
                                    .map(h => (
                                        <option key={h} value={h}>{h}h00</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-6 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white transition-all text-xs font-bold uppercase"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2 rounded-lg bg-teal-400 text-black font-black hover:bg-teal-300 transition-all shadow-lg text-xs font-bold uppercase"
                            >
                                Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;