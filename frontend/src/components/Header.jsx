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
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

                {/* Logo : Taille réduite sur mobile */}
                <Link to="/" className="text-lg md:text-2xl font-black italic tracking-tighter text-white flex-shrink-0">
                    Tech<span className="text-teal-400">Space</span>
                    <span className="hidden xs:inline"> Solutions</span>
                </Link>

                {/* Navigation : On remplace hidden par un affichage flex discret sur mobile */}
                <nav className="flex items-center gap-3 md:gap-8">
                    {isAuthenticated && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`
                                }
                            >
                                Planning
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`
                                }
                            >
                                Profil
                            </NavLink>
                        </>
                    )}
                </nav>

                {/* Boutons Action */}
                <div className="flex items-center gap-2 md:gap-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Hello user : caché sur tout petit mobile pour gagner de la place */}
                            <Link to="/profile" className="hidden sm:inline text-slate-400 text-sm hover:text-white transition-colors">
                                Hello, <span className="text-white font-bold">{user?.firstname}</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-slate-800 text-white border border-slate-700 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                            >
                                <span className="md:hidden">Sortir</span>
                                <span className="hidden md:inline">Déconnexion</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="text-slate-400 hover:text-white text-[10px] md:text-sm font-bold transition-all px-2">
                                Login
                            </Link>
                            <Link to="/register" className="bg-teal-400 text-black px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-[10px] md:text-sm font-black uppercase hover:bg-teal-300 transition-all shadow-lg">
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