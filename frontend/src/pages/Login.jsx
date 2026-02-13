// pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-teal-400 w-full max-w-md shadow-2xl transition-all">
                <h2 className="text-teal-400 text-3xl font-bold mb-6 text-center uppercase tracking-wider italic">
                    Connexion
                </h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-teal-400 text-xs font-bold mb-1 uppercase tracking-widest">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all placeholder:text-slate-500"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-teal-400 text-xs font-bold mb-1 uppercase tracking-widest">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-teal-400 transition-all placeholder:text-slate-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-400 text-black font-bold py-3 rounded-lg hover:bg-teal-300 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'CONNEXION...' : 'SE CONNECTER'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Pas de compte ?
                    <Link to="/register" className="text-teal-400 hover:underline ml-2 font-bold uppercase tracking-tighter">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;