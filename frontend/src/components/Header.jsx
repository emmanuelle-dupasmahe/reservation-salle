// components/Header.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-black italic tracking-tighter text-white">
                    TechSpace Solutions
                </Link>

                {/* Navigation principale */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`
                        }
                    >
                        Accueil
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`
                            }
                        >
                            Planning
                        </NavLink>
                    )}
                </nav>

                {/* Boutons Action */}
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 text-sm hidden sm:inline">
                                Hello, <span className="text-white font-bold">{user?.firstname}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-slate-800 text-white border border-slate-700 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-slate-400 hover:text-white text-sm font-bold transition-all px-4">
                                Connexion
                            </Link>
                            <Link to="/register" className="bg-teal-400 text-black px-5 py-2 rounded-lg text-sm font-black uppercase hover:bg-teal-300 transition-all shadow-lg">
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;