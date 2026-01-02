import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    School, BookOpen, MessageSquare, LineChart, Search,
    Bell, LogOut, Calendar, TrendingUp, FileText,
    CheckCircle, ArrowRight, Filter, PlusCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TeacherCard } from '../components/TeacherCard';
import { motion } from 'framer-motion';

export const StudentDashboard = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';
    const setActiveTab = (tab) => {
        setSearchParams({ tab });
    };

    const [searchQuery, setSearchQuery] = useState('');

    const teachers = [
        { name: "Dr. Sarah Koné", role: "Enseignante Mathématiques", rating: 4.9, reviews: 124, subjects: ["Algèbre", "Géométrie"], price: "15.000 F", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop" },
        { name: "M. Marc Traoré", role: "Répétiteur Physique", rating: 4.7, reviews: 89, subjects: ["Physique", "Chimie"], price: "12.000 F", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
        { name: "Mme. Elise Diallo", role: "Étudiante Master Anglais", rating: 4.5, reviews: 34, subjects: ["Anglais", "Oral"], price: "8.000 F", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    ];

    const menuItems = [
        { id: 'overview', label: 'Tableau de bord', icon: LineChart },
        { id: 'teachers', label: 'Trouver un répétiteur', icon: Search },
        { id: 'subjects', label: 'Mes Matières', icon: BookOpen },
        { id: 'qa', label: 'Q&A Scolaire', icon: MessageSquare }, // Added Q&A Tab
        { id: 'messages', label: 'Messagerie', icon: MessageSquare },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed h-full z-20">
                <div className="p-8 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <School className="text-primary w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">Edu<span className="text-primary">Connect</span></span>
                </div>

                <nav className="px-4 space-y-2 flex-grow">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-4 transition-all duration-200 group ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors'} />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <TrendingUp className="text-amber-600 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Niveau</p>
                                <p className="text-slate-900 font-bold">Terminale S</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[70%]"></div>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => navigate('/')}>
                        <LogOut size={20} className="mr-2" /> Déconnexion
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 lg:p-10 lg:ml-72 max-w-[1600px] mx-auto w-full relative">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
                        >
                            {activeTab === 'overview' ? 'Bonjour, Marc ! 👋' : 'Trouvez votre mentor'}
                        </motion.h2>
                        <p className="text-slate-500 mt-2 font-medium">
                            {activeTab === 'overview' ? 'Prêt à apprendre quelque chose de nouveau aujourd\'hui ?' : 'Connectez-vous avec des experts validés.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                            <Bell size={24} />
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-slate-50 rounded-full animate-pulse" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-900">Marc Anderson</p>
                                <p className="text-xs text-slate-500">Étudiant Premium</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg">
                                MA
                            </div>
                        </div>
                    </div>
                </header>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Q&A Section */}
                            <Card className="lg:col-span-2 !p-0 overflow-hidden border-0 shadow-lg ring-1 ring-slate-100">
                                <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><MessageSquare size={20} /></div>
                                        Q&A Scolaire
                                    </h3>
                                    <Badge color="green" className="bg-green-100 text-green-700 border-transparent">En direct</Badge>
                                </div>
                                <div className="p-6 bg-slate-50/50">
                                    <div className="relative mb-8 group">
                                        <input
                                            type="text"
                                            placeholder="Posez votre question (ex: Comment factoriser un polynôme ?)"
                                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 pr-14 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
                                        />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                                            <Search size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="flex justify-between items-start mb-3">
                                                <Badge color="blue">Mathématiques</Badge>
                                                <span className="text-xs text-slate-400 font-medium">Il y a 2h</span>
                                            </div>
                                            <p className="font-bold text-slate-800 text-lg mb-4">C'est quoi la différence entre mitose et méiose ?</p>
                                            <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold bg-emerald-50 w-fit px-3 py-1 rounded-full">
                                                <CheckCircle size={16} /> 3 Réponses vérifiées
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Schedule / Next Sessions */}
                            <Card className="lg:col-span-1 border-0 shadow-lg ring-1 ring-slate-100 h-fit">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Calendar size={20} /></div>
                                    Agenda
                                </h3>
                                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100 text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Calendar className="text-amber-500" size={24} />
                                    </div>
                                    <p className="text-amber-900 font-bold text-lg mb-2">Aucune séance prévue</p>
                                    <p className="text-amber-700/80 text-sm mb-6">Planifiez votre premier cours dès maintenant.</p>
                                    <Button onClick={() => setActiveTab('teachers')} variant="secondary" className="w-full justify-center">
                                        Trouver un prof
                                    </Button>
                                </div>
                            </Card>

                            {/* Stats */}
                            <Card className="lg:col-span-2 border-0 shadow-lg ring-1 ring-slate-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><TrendingUp size={20} /></div>
                                        Progression
                                    </h3>
                                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm font-medium text-slate-600 outline-none">
                                        <option>Cette année</option>
                                        <option>Moyenne générale</option>
                                    </select>
                                </div>

                                <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4">
                                    {[45, 60, 50, 75, 65, 85].map((h, i) => (
                                        <div key={i} className="w-full flex flex-col justify-end h-full gap-2 group cursor-pointer">
                                            <div className="w-full bg-slate-100 rounded-xl relative overflow-hidden h-full flex items-end">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{ duration: 1, type: "spring" }}
                                                    className="w-full bg-primary/80 group-hover:bg-primary transition-colors relative"
                                                >
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded transition-opacity whitespace-nowrap z-10">
                                                        {h}/100
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 text-center uppercase">{['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Assignments */}
                            <Card className="lg:col-span-1 border-0 shadow-lg ring-1 ring-slate-100">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><FileText size={20} /></div>
                                    À faire
                                </h3>
                                <div className="space-y-4">
                                    {["Exercice de Math", "Révision Anglais", "Lecture suivie"].map((task, i) => (
                                        <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${i === 1 ? 'bg-primary border-primary text-white' : 'border-slate-300 group-hover:border-primary'}`}>
                                                {i === 1 && <CheckCircle size={14} />}
                                            </div>
                                            <span className={`font-medium transition-colors ${i === 1 ? 'line-through text-slate-400' : 'text-slate-700 group-hover:text-slate-900'}`}>{task}</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full mt-6 text-slate-500">Voir tout</Button>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'teachers' && (
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
                                <div className="flex-grow relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                                    <input
                                        type="text"
                                        placeholder="Que voulez-vous apprendre aujourd'hui ?"
                                        className="w-full pl-16 pr-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-slate-400 font-medium"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" className="px-8 h-auto rounded-2xl border-slate-200 hover:border-slate-300">
                                    <Filter size={20} className="mr-2" /> Filtres
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {teachers.map((t, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <TeacherCard teacher={t} onSelect={() => navigate('/teacher/sample')} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'subjects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: "Mathématiques", progress: 75, next: "Devoir Mardi", color: "bg-blue-500", icon: "📐" },
                                { name: "Physique-Chimie", progress: 60, next: "TP Jeudi", color: "bg-purple-500", icon: "🧪" },
                                { name: "SVT", progress: 85, next: "Exposé le 12/11", color: "bg-green-500", icon: "🌿" },
                                { name: "Français", progress: 90, next: "Lecture suivie", color: "bg-yellow-500", icon: "📚" },
                                { name: "Anglais", progress: 50, next: "Verbes irréguliers", color: "bg-red-500", icon: "🇬🇧" },
                                { name: "Histoire-Géo", progress: 70, next: "Carte à rendre", color: "bg-amber-600", icon: "🌍" },
                            ].map((subject, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Card className="h-full border-0 shadow-md ring-1 ring-slate-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-14 h-14 rounded-2xl ${subject.color} bg-opacity-10 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform`}>
                                                    {subject.icon}
                                                </div>
                                                <Badge variant="outline" className="bg-slate-50">{subject.next}</Badge>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{subject.name}</h3>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex justify-between text-sm font-bold">
                                                    <span className="text-slate-500">Maîtrise</span>
                                                    <span className={subject.progress < 60 ? "text-amber-500" : "text-green-500"}>{subject.progress}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${subject.progress}%` }}
                                                        transition={{ duration: 1, delay: 0.2 }}
                                                        className={`h-full ${subject.color}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Ressources
                                                </Button>
                                                <Button size="sm" className="w-full bg-slate-900 text-white hover:bg-slate-800 border-0">
                                                    Trouver prof
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[250px]"
                            >
                                <div className="p-4 bg-slate-100 rounded-full mb-4 group-hover:bg-white transition-colors">
                                    <PlusCircle size={32} />
                                </div>
                                <span className="font-bold">Ajouter une matière</span>
                            </motion.div>
                        </div>
                    )}

                    {activeTab === 'qa' && (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-3 space-y-6">
                                <Card className="bg-gradient-to-r from-primary to-indigo-600 text-white border-0 shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-2">Q&A Scolaire</h2>
                                    <p className="opacity-90 mb-6">Posez vos questions, obtenez des réponses certifiées de professeurs et d'élèves.</p>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Quelle est votre question ?"
                                            className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30 transition-all font-medium"
                                        />
                                        <Button className="absolute right-1 top-1 bg-white text-primary hover:bg-slate-100 border-0 h-auto py-2">
                                            Poser
                                        </Button>
                                    </div>
                                </Card>

                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {["Tout", "Mathématiques", "Physique", "SVT", "Français", "Anglais"].map((tag, i) => (
                                        <Badge key={i} className={`cursor-pointer ${i === 0 ? 'bg-primary text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { title: "Limite finie en l'infini", subject: "Mathématiques", answers: 5, time: "2h", verified: true },
                                        { title: "Comment équilibrer une équation redox ?", subject: "Physique-Chimie", answers: 2, time: "45min", verified: false },
                                        { title: "Analyse du poème 'Demain, dès l'aube'", subject: "Français", answers: 8, time: "Hier", verified: true },
                                    ].map((q, idx) => (
                                        <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-slate-500 border-slate-200">{q.subject}</Badge>
                                                        <span className="text-xs text-slate-400">Il y a {q.time}</span>
                                                    </div>
                                                    {q.verified && (
                                                        <Badge color="green" className="bg-emerald-50 text-emerald-600 border-emerald-100 flex items-center gap-1">
                                                            <CheckCircle size={12} /> Résolu
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-lg text-slate-900 mb-2">{q.title}</h3>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                                        <span className="flex items-center gap-1"><MessageSquare size={16} /> {q.answers} réponses</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-primary font-bold">Voir la discussion</Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-0 shadow-md ring-1 ring-slate-100">
                                    <div className="p-6">
                                        <h3 className="font-bold text-slate-900 mb-4">Top Contributeurs</h3>
                                        <div className="space-y-4">
                                            {["Dr. Koné", "M. Traoré", "Sophie L."].map((name, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">{name.charAt(0)}</div>
                                                    <div className="flex-grow">
                                                        <div className="text-sm font-bold text-slate-900">{name}</div>
                                                        <div className="text-xs text-slate-400">145 points</div>
                                                    </div>
                                                    {i === 0 && <Badge color="amber" className="bg-amber-100 text-amber-700">🥇</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <Card className="h-[calc(100vh-140px)] border-0 shadow-lg ring-1 ring-slate-100 overflow-hidden flex">
                            {/* Conversations List */}
                            <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col hidden md:flex">
                                <div className="p-4 border-b border-slate-100">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Rechercher..." />
                                    </div>
                                </div>
                                <div className="flex-grow overflow-y-auto p-2 space-y-1">
                                    {[
                                        { name: "Dr. Sarah Koné", msg: "N'oublie pas de réviser le chapitre 3...", time: "10:30", active: true },
                                        { name: "M. Marc Traoré", msg: "Le cours est confirmé pour demain.", time: "Hier", active: false },
                                        { name: "Support EduConnect", msg: "Bienvenue sur la plateforme !", time: "Mar", active: false, badge: true },
                                    ].map((chat, i) => (
                                        <div key={i} className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${chat.active ? 'bg-white shadow-sm border border-slate-100' : 'hover:bg-slate-100'}`}>
                                            <div className="relative">
                                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                                    {chat.name.charAt(0)}
                                                </div>
                                                {i === 0 && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                                            </div>
                                            <div className="flex-grow overflow-hidden">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <span className={`text-sm font-bold ${chat.active ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</span>
                                                    <span className="text-xs text-slate-400">{chat.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 truncate">{chat.msg}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Window */}
                            <div className="flex-grow flex flex-col bg-white">
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">D</div>
                                        <div>
                                            <div className="font-bold text-slate-900">Dr. Sarah Koné</div>
                                            <div className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En ligne</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon"><Filter size={20} /></Button>
                                </div>

                                <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
                                    <div className="flex justify-center"><span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">Aujourd'hui</span></div>
                                    <div className="flex gap-4 max-w-[80%]">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 mt-1"></div>
                                        <div>
                                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                                                Bonjour Marc ! As-tu pu regarder les exercices de factorisation ?
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1 block">10:30 by Dr. Sarah Koné</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">MA</div>
                                        <div>
                                            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md shadow-primary/20">
                                                Oui, j'ai fini les 3 premiers, mais je bloque sur le dernier... 😕
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1 block text-right">10:32 by Vous</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 max-w-[80%]">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 mt-1"></div>
                                        <div>
                                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                                                Pas de souci, on regardera ça ensemble lors de la séance de 14h. N'oublie pas de réviser le chapitre 3 aussi !
                                            </div>
                                            <span className="text-xs text-slate-400 mt-1 block">10:33 by Dr. Sarah Koné</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white border-t border-slate-100">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Écrivez votre message..."
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </motion.div>
            </main>
        </div>
    );
};
