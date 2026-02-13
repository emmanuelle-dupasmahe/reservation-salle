// components/Footer.jsx
function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-white font-black italic tracking-tighter text-xl">
                    TechSpace Solutions
                </div>

                <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
                    Réservation Salle &copy; {new Date().getFullYear()} — Tous droits réservés
                </p>

                <div className="flex gap-6">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;