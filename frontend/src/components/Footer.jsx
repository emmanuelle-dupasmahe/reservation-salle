import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo avec lien vers l'accueil */}
                <Link
                    to="/"
                    className="text-white font-black italic tracking-tighter text-xl flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                    Tech<span className="text-teal-400">Space</span>
                    <span className="hidden sm:inline"> Solutions</span>
                </Link>

                {/* Texte de copyright */}
                <p className="text-slate-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-center">
                    Réservation Salle &copy; {new Date().getFullYear()} — Tous droits réservés
                </p>

                {/* Indicateurs visuels */}
                <div className="flex gap-6 items-center">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;