// pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">

            <span className="bg-teal-400/10 text-teal-400 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-[0.2em] border border-teal-400/20">
                Planning v1.0
            </span>

            <h1 className="text-white text-5xl md:text-5xl font-black mb-4 tracking-wider">
                RÉSERVEZ LA SALLE.
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
                Une interface moderne pour gérer vos créneaux en équipe.
                Simple, rapide et efficace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center">
                {isAuthenticated ? (
                    <Link
                        to="/dashboard"
                        className="bg-teal-400 text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                    >
                        ACCÉDER AU PLANNING
                    </Link>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="bg-teal-400 text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-teal-300 transition-all shadow-lg"
                        >
                            COMMENCER
                        </Link>
                        <Link
                            to="/login"
                            className="bg-slate-800 text-white border-2 border-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all shadow-lg"
                        >
                            SE CONNECTER
                        </Link>
                    </>
                )}
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500 text-sm uppercase font-bold tracking-widest">
                <div>REACT JS</div>
                <div>NODE JS</div>
                <div>MYSQL</div>
            </div>
        </div>
    );
}

export default Home;