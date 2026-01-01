import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    School,
    PlusCircle,
    ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const SchoolSpace = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1.5 rounded-lg"><School className="text-slate-900 w-5 h-5" /></div>
                        <span className="text-xl font-bold">EduConnect <span className="text-indigo-400">École</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-4 text-slate-400 text-sm">
                            <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'text-white' : ''}>Tableau de bord</button>
                            <button onClick={() => setActiveView('recruitment')} className={activeView === 'recruitment' ? 'text-white' : ''}>Recrutement</button>
                            <span>Messagerie</span>
                        </div>
                        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" onClick={() => navigate('/')}>Retour</Button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-10">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold">Lycée International Excellence</h2>
                        <p className="text-slate-400 mt-2">Gestion et recrutement d'enseignants certifiés</p>
                    </div>
                    <Button variant="primary" className="bg-indigo-500 hover:bg-indigo-600"><PlusCircle size={20} /> Nouvelle offre</Button>
                </div>

                {activeView === 'dashboard' ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Équipe active</p>
                                <h3 className="text-3xl font-bold mt-2">24 Profs</h3>
                                <div className="mt-4 flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-600" />)}
                                </div>
                            </Card>
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Offres en cours</p>
                                <h3 className="text-3xl font-bold mt-2">3</h3>
                                <p className="text-indigo-400 text-xs mt-2 font-medium">12 candidatures à trier</p>
                            </Card>
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Taux de rétention</p>
                                <h3 className="text-3xl font-bold mt-2">98%</h3>
                            </Card>
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Messagerie</p>
                                <h3 className="text-3xl font-bold mt-2">5 Nouveaux</h3>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <h3 className="text-xl font-bold mb-6">Derniers rapports pédagogiques</h3>
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold">Rapport Hebdomadaire - Term S</p>
                                                <p className="text-xs text-slate-500">Par M. Traoré • Hier à 14:00</p>
                                            </div>
                                            <button className="text-indigo-400 hover:text-indigo-300"><ChevronRight /></button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <h3 className="text-xl font-bold mb-6">Prochains paiements</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Total Prestations Mai</span>
                                        <span className="font-bold text-xl">1.250.000 F</span>
                                    </div>
                                    <Button variant="primary" className="w-full bg-slate-700 hover:bg-slate-600 border-0">Gérer la facturation</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold">Candidatures reçues</h3>
                            {[1, 2].map(i => (
                                <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-indigo-900 rounded-2xl flex items-center justify-center font-bold text-2xl text-indigo-300">AS</div>
                                        <div>
                                            <h4 className="font-bold text-lg">Amadou Sylla</h4>
                                            <p className="text-slate-400 text-sm">Professeur d'Espagnol • 5 ans d'exp.</p>
                                            <div className="mt-2 flex gap-2"><Badge color="blue">Score Jeu: 89/100</Badge></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" className="text-slate-400">Décliner</Button>
                                        <Button className="bg-indigo-600">Entretien</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Card className="bg-slate-800 border-slate-700 text-white">
                                <h3 className="font-bold mb-4">Mes Offres Actives</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-900 rounded-xl border-l-4 border-green-500">
                                        <p className="font-bold">Professeur de SVT (Lycée)</p>
                                        <p className="text-xs text-slate-500 mt-1">Publié il y a 3j • 8 vues</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
