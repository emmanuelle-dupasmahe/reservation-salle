// pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setLoading(true);
        try {
            await register({
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-400 w-full max-w-md shadow-2xl">
                <h2 className="text-teal-400 text-3xl font-bold mb-6 text-center uppercase tracking-wider italic">
                    Créer un compte
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-teal-400 text-xs font-bold mb-1 uppercase">Prénom</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-teal-400 text-xs font-bold mb-1 uppercase">Nom</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-teal-400 text-xs font-bold mb-1 uppercase">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all"
                            placeholder="exemple@mail.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-teal-400 text-xs font-bold mb-1 uppercase">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-teal-400 text-xs font-bold mb-1 uppercase">Confirmation</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-400 text-black font-bold py-3 rounded-lg hover:bg-teal-300 transition-all transform hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'INSCRIPTION EN COURS...' : 'S\'INSCRIRE'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Déjà un compte ?
                    <Link to="/login" className="text-teal-400 hover:underline ml-2 font-bold">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;