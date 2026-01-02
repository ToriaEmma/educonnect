import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    School, PlusCircle, ChevronRight, LayoutDashboard,
    Users, MessageSquare, Settings, Bell, Briefcase, Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

export const SchoolSpace = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeView = searchParams.get('view') || 'dashboard';

    const setActiveView = (view) => {
        setSearchParams({ view });
    };
    const [activeConversation, setActiveConversation] = useState(0);
    const [candidates, setCandidates] = useState([
        { id: 1, name: "Amadou Sylla", role: "Prof. Espagnol", exp: "5 ans", score: 89, time: "Il y a 2h", status: "Nouveau" },
        { id: 2, name: "Julie Bertin", role: "Prof. SVT", exp: "3 ans", score: 92, time: "Hier", status: "Nouveau" },
        { id: 3, name: "Marc K.", role: "Répétiteur Maths", exp: "1 an", score: 78, time: "Hier", status: "Nouveau" },
    ]);
    const [offers, setOffers] = useState([
        { id: 1, title: "Professeur de SVT - Lycée", candidates: 12, status: "Active", posted: "Il y a 2 jours" },
        { id: 2, title: "Répétiteur Mathématiques - Collège", candidates: 5, status: "Active", posted: "Il y a 5 jours" },
        { id: 3, title: "Surveillant Général (H/F)", candidates: 28, status: "Clôturée", posted: "Il y a 2 semaines" },
    ]);

    const handleCandidateAction = (id, action) => {
        setCandidates(candidates.map(c =>
            c.id === id ? { ...c, status: action === 'interview' ? 'Entretien' : 'Validé' } : c
        ));
    };

    const handleCreateOffer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newOffer = {
            id: offers.length + 1,
            title: formData.get('title'),
            candidates: 0,
            status: "Active",
            posted: "À l'instant"
        };
        setOffers([newOffer, ...offers]);
        setActiveView('offers');
    };

    const navItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { id: 'recruitment', label: 'Recrutement', icon: Users },
        { id: 'offers', label: 'Offres', icon: Briefcase },
        { id: 'messages', label: 'Messagerie', icon: MessageSquare },
        { id: 'settings', label: 'Paramètres', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Top Navigation Bar - Corporate/Clean Style */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-lg">
                            <School className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-slate-900 leading-none">EduConnect</span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Entreprise</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-xl">
                        {navItems.slice(0, 4).map(item => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-lg shadow-slate-900/20">
                            LE
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Lycée International Excellence</h1>
                        <p className="text-slate-500 mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            En ligne • Gestion et recrutement
                        </p>
                    </div>
                    <Button onClick={() => setActiveView('create-offer')} variant="primary" className="shadow-xl shadow-primary/20">
                        <PlusCircle size={20} className="mr-2" />
                        Nouvelle offre d'emploi
                    </Button>
                </div>

                <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeView === 'dashboard' ? (
                        <div className="space-y-8">
                            {/* KPI Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Équipe Active", value: "24", sub: "Enseignants", color: "bg-blue-500", icon: Users },
                                    { label: "Offres en cours", value: "3", sub: "12 Candidatures", color: "bg-indigo-500", icon: Briefcase },
                                    { label: "Rétention", value: "98%", sub: "+2% ce mois", color: "bg-emerald-500", icon: School },
                                    { label: "Messages", value: "5", sub: "Non lus", color: "bg-amber-500", icon: MessageSquare }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
                                        <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4 text-${stat.color.split('-')[1]}-600`}>
                                            <stat.icon size={24} className={`text-${stat.color.split('-')[1]}-600`} />
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                                        <p className="text-xs text-slate-400 mt-2 font-medium bg-slate-50 inline-block px-2 py-1 rounded-lg">{stat.sub}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-0 shadow-lg ring-1 ring-slate-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-900">Derniers rapports</h3>
                                        <Button variant="ghost" size="sm">Voir tout</Button>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="group p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex justify-between items-center cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                                        MT
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">Rapport Hebdomadaire - Term S</p>
                                                        <p className="text-xs text-slate-500">Par M. Traoré • Hier à 14:00</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="bg-white text-slate-900 border border-slate-200 shadow-xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 opacity-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-6 text-slate-900">Prochains paiements</h3>
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                                            <p className="text-slate-500 text-sm mb-1 uppercase tracking-wide font-bold">Total Prestations (Mai)</p>
                                            <p className="text-4xl font-extrabold text-indigo-600">1.250.000 F</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                                                <span className="text-slate-500 font-medium">Professeurs Titulaires</span>
                                                <span className="font-bold text-slate-900">850.000 F</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pb-2">
                                                <span className="text-slate-500 font-medium">Vacataires / Répétiteurs</span>
                                                <span className="font-bold text-slate-900">400.000 F</span>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setActiveView('billing')}
                                            className="w-full mt-8 bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10"
                                        >
                                            Gérer la facturation
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : null}

                    {activeView === 'recruitment' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Recrutement Enseignants</h2>
                                    <p className="text-slate-500">Gérez les candidatures et chassez les meilleurs talents.</p>
                                </div>
                                <Button className="bg-slate-900 text-white" onClick={() => setActiveView('talent-search')}>
                                    <PlusCircle size={18} className="mr-2" /> Chasser un talent
                                </Button>
                            </div>

                            <Card className="border-0 shadow-md ring-1 ring-slate-100 p-0 overflow-hidden">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4 overflow-x-auto">
                                    {['À valider (5)', 'Entretiens (2)', 'Validés', 'Refusés'].map((tab, i) => (
                                        <button key={i} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:bg-white/50'}`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {candidates.map((c, i) => (
                                        <div key={i} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                                    {c.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{c.name}</h4>
                                                    <p className="text-sm text-slate-500">{c.role} • {c.exp} d'expérience</p>
                                                    {c.status !== 'Nouveau' && (
                                                        <Badge color={c.status === 'Validé' ? 'green' : 'amber'} className="mt-2">{c.status}</Badge>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-400 uppercase font-bold">Score EduConnect</p>
                                                    <p className="font-bold text-emerald-600">{c.score}/100</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost">CV</Button>
                                                    {c.status === 'Nouveau' && (
                                                        <>
                                                            <Button size="sm" variant="outline" onClick={() => handleCandidateAction(c.id, 'interview')}>Entretien</Button>
                                                            <Button size="sm" className="bg-slate-900 text-white" onClick={() => handleCandidateAction(c.id, 'validate')}>Valider</Button>
                                                        </>
                                                    )}
                                                    {c.status === 'Entretien' && (
                                                        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => handleCandidateAction(c.id, 'validate')}>Confirmer Recrutement</Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}
                    {activeView === 'offers' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Offres d'emploi</h2>
                                {offers.map((offer, i) => (
                                    <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${offer.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{offer.title}</h3>
                                                <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                                    <Calendar size={14} /> Publié {offer.posted} • {offer.status}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-slate-900">{offer.candidates}</p>
                                                <p className="text-xs text-slate-500">Candidats</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                                            <Button variant="outline" size="sm">Modifier</Button>
                                            <Button size="sm" className="bg-slate-900 text-white" onClick={() => setActiveView('recruitment')}>Voir candidats</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <div>
                                <div className="bg-indigo-600 text-white rounded-2xl shadow-xl p-8 text-center">
                                    <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <PlusCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Nouvelle Offre</h3>
                                    <p className="opacity-80 mb-6 text-sm">Créez une annonce ciblée et accédez à notre base de 500+ enseignants certifiés.</p>
                                    <Button
                                        onClick={() => setActiveView('create-offer')}
                                        variant="white"
                                        className="w-full text-indigo-600 hover:bg-slate-50 border-0"
                                    >
                                        Rédiger une offre
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'create-offer' && (
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4 mb-6">
                                <Button variant="ghost" onClick={() => setActiveView('offers')} className="text-slate-500">
                                    &larr; Retour aux offres
                                </Button>
                                <h2 className="text-2xl font-bold text-slate-900">Créer une nouvelle offre</h2>
                            </div>
                            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-100">
                                <form onSubmit={handleCreateOffer} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Titre de l'offre</label>
                                        <input required name="title" type="text" placeholder="ex: Professeur de Mathématiques - Lycée" className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Type de contrat</label>
                                            <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none">
                                                <option>CDI</option>
                                                <option>CDD</option>
                                                <option>Vacataire</option>
                                                <option>Stage</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Expérience requise</label>
                                            <select className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none">
                                                <option>Débutant accepté</option>
                                                <option>1-3 ans</option>
                                                <option>3-5 ans</option>
                                                <option>+5 ans</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Description du poste</label>
                                        <textarea required rows={6} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Décrivez les missions, le profil recherché..."></textarea>
                                    </div>

                                    <div className="pt-4 flex items-center justify-end gap-4">
                                        <Button type="button" variant="ghost" onClick={() => setActiveView('offers')}>Annuler</Button>
                                        <Button type="submit" className="bg-slate-900 text-white px-8">Publier l'offre</Button>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    )}

                    {activeView === 'talent-search' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <Button variant="ghost" onClick={() => setActiveView('recruitment')} className="text-slate-500">
                                    &larr; Retour
                                </Button>
                                <h2 className="text-2xl font-bold text-slate-900">Chasse aux Talents</h2>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <input placeholder="Matière (ex: Maths)" className="p-3 border rounded-xl bg-slate-50" />
                                    <input placeholder="Niveau (ex: Lycée)" className="p-3 border rounded-xl bg-slate-50" />
                                    <select className="p-3 border rounded-xl bg-slate-50 text-slate-500">
                                        <option>Disponibilité immédiate</option>
                                        <option>Pour la rentrée</option>
                                    </select>
                                    <Button className="bg-slate-900 text-white">Rechercher</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <Card key={i} className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 bg-slate-200 rounded-full"></div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Enseignant #{i}</h4>
                                                <p className="text-xs text-slate-500">Certifié EduConnect</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600 mb-6">
                                            <div className="flex justify-between"><span>Expérience</span> <span className="font-bold">8 ans</span></div>
                                            <div className="flex justify-between"><span>Spécialité</span> <span className="font-bold">Physique</span></div>
                                        </div>
                                        <Button variant="outline" className="w-full">Voir le profil</Button>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeView === 'messages' && (
                        <div className="h-[650px] bg-white rounded-2xl shadow-lg border border-slate-100 flex overflow-hidden">
                            {/* Sidebar Messages */}
                            <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col hidden md:flex">
                                <div className="p-4 border-b border-slate-100 font-bold text-slate-900">
                                    Discussions
                                </div>
                                <div className="flex-grow overflow-y-auto p-2 space-y-1">
                                    {[
                                        { name: "Dr. Sarah Koné", role: "Candidat", msg: "Merci pour l'entretien !", time: "10:30", active: true },
                                        { name: "Support EduConnect", role: "Support", msg: "Votre facture est dispo.", time: "Hier", active: false },
                                        { name: "Jean Dupont", role: "Prof. Maths", msg: "Je serai absent demain.", time: "Lun", active: false },
                                    ].map((chat, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActiveConversation(i)}
                                            className={`p-3 rounded-xl cursor-pointer transition-colors ${activeConversation === i ? 'bg-white shadow-sm border border-slate-100' : 'hover:bg-slate-100'}`}
                                        >
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className={`text-sm font-bold ${activeConversation === i ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</span>
                                                <span className="text-xs text-slate-400">{chat.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{chat.msg}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-grow flex flex-col bg-white">
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">S</div>
                                        <div>
                                            <div className="font-bold text-slate-900">Dr. Sarah Koné</div>
                                            <div className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En ligne</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
                                    <div className="flex justify-center"><span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">Aujourd'hui</span></div>

                                    <div className="flex gap-4 max-w-[80%]">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 mt-1"></div>
                                        <div>
                                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                                                Bonjour, merci pour l'entretien d'hier. Quand aurai-je un retour ?
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1 block">10:30</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">VS</div>
                                        <div>
                                            <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-none shadow-md">
                                                Bonjour Sarah. Nous finalisons les délibérations. Vous recevrez une réponse d'ici ce soir !
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1 block text-right">10:32</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white border-t border-slate-100">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Écrivez votre message..."
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                                            <MessageSquare size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'billing' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Facturation & Paiements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-white text-slate-900 border border-slate-200 shadow-lg p-6">
                                    <p className="text-slate-500 mb-1 uppercase tracking-wide font-bold text-xs">Solde disponible</p>
                                    <h3 className="text-3xl font-extrabold text-indigo-600">5.250.000 F</h3>
                                    <Button className="w-full mt-6 bg-slate-900 text-white hover:bg-slate-800 shadow-md">Recharger le compte</Button>
                                </Card>
                                <Card className="p-6 border-0 shadow-sm ring-1 ring-slate-100">
                                    <p className="text-slate-500 mb-1">Dépenses ce mois</p>
                                    <h3 className="text-3xl font-bold text-slate-900">1.250.000 F</h3>
                                    <p className="text-xs text-emerald-500 mt-2 font-bold">-12% vs mois dernier</p>
                                </Card>
                            </div>
                            <Card className="border-0 shadow-md ring-1 ring-slate-100">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-900">Historique des transactions</h3>
                                    <Button variant="ghost" size="sm">Exporter</Button>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {[
                                        { desc: "Paiement Salaires Enseignants", date: "28 Mai", amount: "-850.000 F" },
                                        { desc: "Prestation Service Maths", date: "25 Mai", amount: "-120.000 F" },
                                        { desc: "Rechargement Compte", date: "20 Mai", amount: "+2.000.000 F", color: "text-green-600" }
                                    ].map((t, i) => (
                                        <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                            <div>
                                                <p className="font-bold text-slate-900">{t.desc}</p>
                                                <p className="text-xs text-slate-500">{t.date}</p>
                                            </div>
                                            <p className={`font-bold ${t.color || "text-slate-900"}`}>{t.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeView === 'settings' && (
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Paramètres de l'établissement</h2>
                            <Card className="p-6 border-0 shadow-sm ring-1 ring-slate-100 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l'établissement</label>
                                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50" defaultValue="Lycée International Excellence" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email de contact</label>
                                    <input type="email" className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50" defaultValue="contact@lie-edu.com" />
                                </div>
                                <div className="pt-4">
                                    <Button className="bg-slate-900 text-white">Sauvegarder les modifications</Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};
