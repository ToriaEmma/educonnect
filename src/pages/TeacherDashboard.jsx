import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    GraduationCap, Calendar, Users, DollarSign,
    MessageSquare, Settings, Bell, Check, X, Clock, FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'planning';

    const setActiveTab = (tab) => {
        setSearchParams({ tab });
    };

    const requests = [
        { id: 1, student: "Thomas A.", subject: "Physique - Terminale", message: "Besoin d'aide pour le chapitre Mécanique." },
        { id: 2, student: "Sarah L.", subject: "Maths - 3ème", message: "Préparation brevet." }
    ];

    const upcoming = [
        { id: 1, student: "Marc A.", time: "14:00 - 15:30", subject: "Mathématiques", status: "Confirmé", type: "Visio" },
        { id: 2, student: "Jean K.", time: "16:00 - 17:00", subject: "Physique", status: "En attente", type: "À domicile" }
    ];

    const menuItems = [
        { id: 'planning', label: 'Planning', icon: Calendar },
        { id: 'students', label: 'Mes Élèves', icon: Users },
        { id: 'money', label: 'Revenus', icon: DollarSign },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full z-20">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="bg-amber-500 p-2 rounded-lg">
                        <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold">Espace Prof</span>
                </div>
                <nav className="p-4 space-y-2 flex-grow">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <Icon size={20} /> {item.label}
                            </button>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
                        <Settings size={20} /> Paramètres
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 lg:p-8 md:ml-64 bg-slate-50 min-h-screen">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {activeTab === 'planning' && 'Tableau de bord'}
                            {activeTab === 'students' && 'Mes Élèves'}
                            {activeTab === 'money' && 'Suivi Financier'}
                            {activeTab === 'messages' && 'Messagerie'}
                            {activeTab === 'availability' && 'Mes Disponibilités'}
                            {activeTab === 'reports' && 'Rapports de Séance'}
                        </h1>
                        <p className="text-slate-500">
                            {activeTab === 'planning' && 'Vous avez 2 nouvelles demandes de cours.'}
                            {activeTab === 'students' && 'Gérez vos étudiants et leurs progressions.'}
                            {activeTab === 'money' && 'Visualisez vos gains mensuels.'}
                            {activeTab === 'messages' && 'Communiquez avec vos élèves et parents.'}
                            {activeTab === 'availability' && 'Gérez vos créneaux horaires.'}
                            {activeTab === 'reports' && 'Rédigez un compte-rendu pour les parents.'}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="bg-white" onClick={() => navigate('/teacher/sample')}>Voir mon profil public</Button>
                    </div>
                </header>

                {activeTab === 'planning' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats */}
                        <Card className="bg-white border-0 shadow-sm p-6 flex flex-col justify-between">
                            <div className="text-slate-500 font-medium mb-2">Revenus ce mois</div>
                            <div className="text-3xl font-bold text-slate-900">125.000 F</div>
                            <div className="text-sm text-green-500 mt-2 font-bold flex items-center gap-1"><Check size={14} /> +15% vs mois dernier</div>
                        </Card>
                        <Card className="bg-white border-0 shadow-sm p-6 flex flex-col justify-between">
                            <div className="text-slate-500 font-medium mb-2">Heures dispensées</div>
                            <div className="text-3xl font-bold text-slate-900">24h</div>
                            <div className="text-sm text-slate-400 mt-2">Objectif: 30h</div>
                        </Card>
                        <Card className="bg-white border-0 shadow-sm p-6 flex flex-col justify-between">
                            <div className="text-slate-500 font-medium mb-2">Note moyenne</div>
                            <div className="text-3xl font-bold text-amber-500 flex items-center gap-2">4.9 <span className="text-lg text-slate-300">/ 5</span></div>
                            <div className="text-sm text-slate-400 mt-2">Basé sur 45 avis</div>
                        </Card>

                        {/* Requests */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold text-slate-900">Demandes en attente</h3>
                            {requests.map(req => (
                                <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                            {req.student.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{req.student} <span className="text-slate-400 font-normal text-sm">• {req.subject}</span></h4>
                                            <p className="text-slate-500 text-sm mt-1">{req.message}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600"><X size={18} /></Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0"><Check size={18} /> Accepter</Button>
                                    </div>
                                </div>
                            ))}

                            <h3 className="text-xl font-bold text-slate-900 mt-8">Planning d'aujourd'hui</h3>
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                {upcoming.map((session, idx) => (
                                    <div key={session.id} className={`p-5 flex items-center gap-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors`}>
                                        <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                                            <Clock size={20} />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-slate-900">{session.time}</span>
                                                <Badge className={session.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>{session.status}</Badge>
                                            </div>
                                            <p className="text-sm text-slate-500">{session.student} • {session.subject} • {session.type}</p>
                                        </div>
                                        <Button variant="outline" size="sm">Détails</Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-6">
                            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 p-6">
                                <h3 className="font-bold text-lg mb-4">Passez Premium</h3>
                                <p className="text-slate-300 text-sm mb-6">Obtenez plus de visibilité et accédez aux outils pédagogiques avancés.</p>
                                <Button onClick={() => navigate('/teacher/premium')} className="w-full bg-amber-500 hover:bg-amber-600 text-white border-0">Découvrir les offres</Button>
                            </Card>

                            <Card className="border-0 shadow-sm p-6">
                                <h3 className="font-bold text-slate-900 mb-4">Outils Rapides</h3>
                                <div className="space-y-3">
                                    <Button onClick={() => setActiveTab('availability')} variant="outline" className="w-full justify-start"><Calendar className="mr-2" size={18} /> Mettre à jour dispos</Button>
                                    <Button onClick={() => setActiveTab('reports')} variant="outline" className="w-full justify-start"><FileText className="mr-2" size={18} /> Créer un rapport</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: "Marc A.", class: "Terminale S", goal: "Mention Bien", next: "Mardi 14h" },
                                { name: "Sophie B.", class: "3ème", goal: "Brevet", next: "Mercredi 10h" },
                                { name: "Lucas D.", class: "1ère", goal: "Passer en Tle", next: "Vendredi 17h" },
                            ].map((student, i) => (
                                <Card key={i} className="border-0 shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{student.name}</h3>
                                            <p className="text-slate-500">{student.class}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Objectif</span>
                                            <span className="font-bold text-slate-900">{student.goal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Prochain cours</span>
                                            <span className="font-bold text-primary">{student.next}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" size="sm">Profil</Button>
                                        <Button size="sm">Message</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'money' && (
                    <Card className="h-96 flex items-center justify-center border-0 shadow-sm bg-white">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="text-green-600" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Historique des Revenus</h2>
                            <p className="text-slate-500">Cette fonctionnalité sera disponible prochainement.</p>
                        </div>
                    </Card>
                )}

                {activeTab === 'messages' && (
                    <Card className="h-[calc(100vh-140px)] border-0 shadow-lg ring-1 ring-slate-100 overflow-hidden flex bg-white">
                        {/* Conversations List */}
                        <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col hidden md:flex">
                            <div className="p-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4">Discussions</h3>
                                <div className="space-y-1">
                                    {[
                                        { name: "Mme. Sophie L.", role: "Parent - 3ème", msg: "Merci pour le retour.", time: "10:30", active: true },
                                        { name: "Thomas A.", role: "Élève - Terminale", msg: "J'ai une question sur le devoir.", time: "Hier", active: false },
                                        { name: "Administration", role: "Support", msg: "Validation de vos heures.", time: "Lun", active: false }
                                    ].map((chat, i) => (
                                        <div key={i} className={`p-3 rounded-xl cursor-pointer transition-colors ${chat.active ? 'bg-white shadow-sm border border-slate-100' : 'hover:bg-slate-100'}`}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className={`text-sm font-bold ${chat.active ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</span>
                                                <span className="text-xs text-slate-400">{chat.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-1">{chat.role}</p>
                                            <p className="text-xs text-slate-400 truncate">{chat.msg}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-grow flex flex-col bg-white">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">S</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Mme. Sophie L.</div>
                                        <div className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En ligne</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm"><Settings size={18} /></Button>
                            </div>

                            <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
                                <div className="flex justify-center"><span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">Aujourd'hui</span></div>

                                <div className="flex gap-4 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 mt-1"></div>
                                    <div>
                                        <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                                            Bonjour M. le Professeur. Sophie a-t-elle bien progressé sur les équations ?
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1 block">10:30</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">VOUS</div>
                                    <div>
                                        <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-none shadow-md">
                                            Bonjour Mme. Oui, tout à fait ! Elle maîtrise bien la méthode du discriminant. Nous allons maintenant travailler les inéquations.
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1 block text-right">10:32</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 mt-1"></div>
                                    <div>
                                        <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                                            C'est une excellente nouvelle, merci pour votre retour !
                                        </div>
                                        <span className="text-xs text-slate-400 mt-1 block">10:35</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-white border-t border-slate-100">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Écrivez votre message..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                                        <MessageSquare size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
                {activeTab === 'availability' && (
                    <Card className="border-0 shadow-lg p-8 bg-white">
                        <h2 className="text-xl font-bold mb-6">Gérer mon emploi du temps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                                <div key={i} className="border border-slate-200 rounded-xl p-4 text-center hover:border-amber-500 transition-colors cursor-pointer bg-slate-50">
                                    <div className="font-bold text-slate-900 mb-2">{day}</div>
                                    <div className="space-y-2">
                                        <Badge className="bg-green-100 text-green-700 w-full justify-center">09h - 12h</Badge>
                                        <Badge variant="outline" className="text-slate-400 w-full justify-center border-dashed border-slate-300">+ Ajouter</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'reports' && (
                    <Card className="border-0 shadow-lg p-8 bg-white max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <FileText className="text-indigo-600" /> Nouveau Rapport de Séance
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Élève</label>
                                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <option>Sélectionner un élève...</option>
                                    <option>Marc A.</option>
                                    <option>Sophie B.</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Résumé de la séance</label>
                                <textarea rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Notions abordées, difficultés rencontrées..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Prochains objectifs</label>
                                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Ex: Maîtriser les dérivées" />
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4">Envoyer le rapport</Button>
                        </form>
                    </Card>
                )}
            </main>
        </div>
    );
};
