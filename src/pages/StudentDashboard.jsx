import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    School,
    BookOpen,
    MessageSquare,
    LineChart,
    Search,
    Bell,
    LogOut,
    Calendar,
    TrendingUp,
    FileText,
    CheckCircle,
    ArrowRight,
    Filter
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TeacherCard } from '../components/TeacherCard';

export const StudentDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');

    const teachers = [
        { name: "Dr. Sarah Koné", role: "Enseignante Mathématiques", rating: 4.9, reviews: 124, subjects: ["Algèbre", "Géométrie"], price: "15.000 F", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop" },
        { name: "M. Marc Traoré", role: "Répétiteur Physique", rating: 4.7, reviews: 89, subjects: ["Physique", "Chimie"], price: "12.000 F", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
        { name: "Mme. Elise Diallo", role: "Étudiante Master Anglais", rating: 4.5, reviews: 34, subjects: ["Anglais", "Oral"], price: "8.000 F", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
                <div className="p-6 flex items-center gap-2 border-b border-slate-100">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <School className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">EduConnect</span>
                </div>
                <nav className="p-4 space-y-2 flex-grow">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                    >
                        <LineChart size={20} /> Tableau de bord
                    </button>
                    <button
                        onClick={() => setActiveTab('teachers')}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'teachers' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                    >
                        <Search size={20} /> Trouver un répétiteur
                    </button>
                    <div className="text-slate-600 hover:bg-slate-50 px-4 py-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer font-medium">
                        <BookOpen size={20} /> Mes Matières
                    </div>
                    <div className="text-slate-600 hover:bg-slate-50 px-4 py-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer font-medium">
                        <MessageSquare size={20} /> Messagerie
                    </div>
                </nav>
                <div className="p-4 border-t border-slate-100">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50" onClick={() => navigate('/')}>
                        <LogOut size={20} /> Déconnexion
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 lg:p-10 max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            {activeTab === 'overview' ? 'Bonjour, Marc ! 👋' : 'Trouvez votre répétiteur'}
                        </h2>
                        <p className="text-slate-500 mt-1">
                            {activeTab === 'overview' ? 'Élève en Terminale S - Lycée Jean Rostand' : 'Parcourez les profils certifiés par EduConnect'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600">
                            <Bell size={24} />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
                        </button>
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">MA</div>
                    </div>
                </header>

                {activeTab === 'overview' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="text-indigo-600" /> Q&A Scolaire</h3>
                                <Badge color="green">Gratuit</Badge>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Posez votre question (ex: Comment factoriser un polynôme ?)"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg"><Search size={20} /></button>
                            </div>
                            <div className="p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Mathématiques</span>
                                    <span className="text-xs text-slate-500">Il y a 2h</span>
                                </div>
                                <p className="font-semibold text-slate-800">C'est quoi la différence entre mitose et méiose ?</p>
                                <div className="mt-3 flex items-center gap-2 text-sm text-teal-600 font-medium">
                                    <CheckCircle size={16} /> Réponse disponible
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FileText className="text-amber-600" /> Mes devoirs</h3>
                            <div className="space-y-3">
                                {["Exercice de Math", "Révision Anglais", "Lecture suivie"].map((task, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                                        <div className={`w-6 h-6 rounded-md border-2 ${i === 1 ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`} />
                                        <span className={i === 1 ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>{task}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="lg:col-span-1">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Calendar className="text-indigo-600" /> Prochaines séances</h3>
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                <p className="text-amber-800 font-medium text-sm">Vous n'avez pas de répétiteur actif.</p>
                                <button onClick={() => setActiveTab('teachers')} className="mt-2 text-amber-900 font-bold flex items-center gap-1 text-sm">Trouver un répétiteur <ArrowRight size={14} /></button>
                            </div>
                        </Card>

                        <Card className="lg:col-span-2">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-teal-600" /> Progrès globaux</h3>
                            <div className="h-48 flex items-end justify-between gap-2 px-4">
                                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                    <div key={i} className="bg-indigo-100 w-full rounded-t-lg relative group transition-all" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Score: {h}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase">
                                <span>Jan</span><span>Fev</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-grow relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher par matière ou nom..."
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="px-6 h-[58px]">
                                <Filter size={20} /> Filtres
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teachers.map((t, idx) => (
                                <TeacherCard key={idx} teacher={t} onSelect={() => navigate('/teacher/sample')} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
