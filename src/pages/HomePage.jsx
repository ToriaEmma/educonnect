import { useNavigate } from 'react-router-dom';
import {
    School,
    CheckCircle,
    Gamepad2,
    Users,
    UserCheck,
    Trophy,
    BookOpen,
    GraduationCap,
    Building2,
    TrendingUp,
    Target,
    Zap,
    Mail,
    ArrowRight,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const HomePage = () => {
    const navigate = useNavigate();

    const steps = [
        { title: "Inscription", desc: "Créez votre profil selon votre rôle (Élève, Parent, Prof, École).", icon: <UserCheck className="text-blue-600" /> },
        { title: "Création du profil", desc: "Complétez vos informations et préférences.", icon: <GraduationCap className="text-teal-600" /> },
        { title: "Mise en relation", desc: "Trouvez le partenaire idéal grâce à nos scores de compétences réels.", icon: <Users className="text-teal-600" /> },
        { title: "Suivi & Progression", desc: "Suivez les progrès en temps réel et validez les acquis.", icon: <Trophy className="text-amber-600" /> },
    ];

    const targetAudiences = [
        {
            title: "Élèves & Parents",
            icon: <BookOpen className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe5b?auto=format&fit=crop&q=80&w=800",
            benefits: [
                "Soutien scolaire personnalisé",
                "Suivi de la progression académique",
                "Communication simplifiée"
            ],
            color: "indigo"
        },
        {
            title: "Enseignants & Répétiteurs",
            icon: <GraduationCap className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
            benefits: [
                "Mise en valeur des compétences",
                "Validation par jeux pédagogiques",
                "Opportunités d'enseignement"
            ],
            color: "teal"
        },
        {
            title: "Écoles",
            icon: <Building2 className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
            benefits: [
                "Recrutement facilité",
                "Gestion des besoins pédagogiques",
                "Suivi et rapports détaillés"
            ],
            color: "slate"
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <School className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">EduConnect</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#home" className="hover:text-indigo-600 transition-colors">Accueil</a>
                        <a href="#about" className="hover:text-indigo-600 transition-colors">Élèves & Parents</a>
                        <a href="#teachers" className="hover:text-indigo-600 transition-colors">Enseignants / Répétiteurs</a>
                        <a href="#schools" className="hover:text-indigo-600 transition-colors">Écoles</a>
                        <a href="#how" className="hover:text-indigo-600 transition-colors">Comment ça marche</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost">Se connecter</Button>
                        <Button onClick={() => navigate('/student')}>S'inscrire</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="home" className="relative py-16 lg:py-24 overflow-hidden bg-slate-50">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 flex items-center">
                    <img
                        src="/hero-bg.png"
                        alt="Background"
                        className="h-[85%] w-auto object-contain -ml-12"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge color="blue">Validation par la compétence</Badge>
                        <h1 className="mt-6 text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                            EduConnect, la plateforme qui <span className="text-indigo-600">connecte</span> l'éducation par la compétence
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            Trouvez des enseignants et répétiteurs qualifiés, suivez la progression des élèves et validez les compétences par des outils pédagogiques innovants.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <Button onClick={() => navigate('/student')} className="h-10 px-5 text-base">
                                Je suis parent / élève
                            </Button>
                            <Button onClick={() => navigate('/teacher/sample')} variant="secondary" className="h-10 px-5 text-base">
                                Je suis enseignant / répétiteur
                            </Button>
                            <Button onClick={() => navigate('/school')} variant="school" className="h-10 px-5 text-base">
                                Je suis une école
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* À qui s'adresse EduConnect */}
            <section id="about" className="pt-32 pb-10 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 relative">
                        <img
                            src="/about-decoration.png"
                            alt=""
                            className="absolute top-1/2 left-[60%] -translate-y-1/2 w-64 md:w-[600px] opacity-90 hidden lg:block"
                        />
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight relative z-10">À qui s'adresse EduConnect ?</h2>
                        <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto relative z-10">Une plateforme pensée pour chaque acteur de l'éducation, avec des outils adaptés à vos besoins.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                        {targetAudiences.map((audience, idx) => (
                            <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <div className="text-slate-700">
                                        {audience.title.includes("Élèves") && <BookOpen size={28} />}
                                        {audience.title.includes("Enseignants") && <GraduationCap size={28} />}
                                        {audience.title.includes("Écoles") && <Building2 size={28} />}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{audience.title}</h3>
                                <ul className="space-y-3">
                                    {audience.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600">
                                            <div className="mt-1 p-0.5 rounded-full bg-slate-200">
                                                <CheckCircle className="w-3.5 h-3.5 text-slate-600" />
                                            </div>
                                            <span className="font-medium text-sm">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comment ça marche */}
            <section id="how" className="pt-0 pb-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <img src="/how-it-works-decoration.png" alt="" className="mx-auto w-64 md:w-[500px] mb-0 -mt-10 relative z-10" />
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">Comment ça marche ?</h2>
                        <p className="text-slate-500 mt-6 text-xl">Un parcours simplifié vers la réussite</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-1 bg-slate-100 -z-0" />

                        {steps.map((step, idx) => (
                            <div key={idx} className="relative text-center group">
                                <div className="relative z-10 bg-white border-4 border-slate-50 shadow-xl w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:border-indigo-100 group-hover:scale-110 transition-all duration-300">
                                    {step.icon}
                                </div>
                                <div className="bg-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto -mt-12 mb-6 border-4 border-white relative z-20 shadow-md">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed px-4">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Élément différenciateur clé - Bento Grid Revolution */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <Badge color="slate" className="bg-white text-slate-700 border border-slate-200 px-4 py-1.5 text-sm shadow-sm mb-8">Notre différence</Badge>
                        <h2 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight text-slate-900 text-balance">
                            La compétence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">prouvée</span>,<br /> plus seulement déclarée.
                        </h2>
                        <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed text-balance">
                            Fini le déclaratif. EduConnect utilise le <span className="font-bold text-slate-900">jeu</span> comme standard de validation, garantissant une <span className="font-bold text-slate-900">transparence absolue</span> sur les compétences réelles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(200px,auto)]">
                        {/* Hero Card - Validation par le jeu */}
                        <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
                                        <Gamepad2 className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">Validation par le jeu</h3>
                                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                        Les enseignants démontrent leurs compétences à travers des jeux et défis pédagogiques standardisés.
                                    </p>
                                </div>
                                <div className="mt-10 flex items-center gap-4 text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                    <span>Découvrir la méthode</span>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - Preuves concrètes */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                                <Zap className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Preuves concrètes</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Les parents et les écoles accèdent à des preuves concrètes de compétences, au-delà des simples CV.
                            </p>
                        </div>

                        {/* Card 3 - Décisions rapides */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                                <TrendingUp className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Décisions rapides</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Les décisions de recrutement et de choix sont plus rapides, plus objectives et basées sur la data.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Focus Enseignants */}
            <section id="teachers" className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <Badge color="blue" className="mb-6">Focus Enseignants / Répétiteurs</Badge>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                Pourquoi puis-je faire confiance à cet enseignant ?
                            </h2>
                            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 mb-10 bg-white p-6 rounded-r-xl shadow-sm">
                                <p className="text-slate-700 text-lg italic font-medium">
                                    "Les diplômes disent ce que vous avez étudié, nos jeux disent ce que vous savez faire."
                                </p>
                            </blockquote>
                            <ul className="space-y-6 mb-10">
                                {[
                                    "Compétences enseignées clairement affichées",
                                    "Scores et badges issus des jeux pédagogiques",
                                    "Disponibilités en temps réel",
                                    "Avis et évaluations vérifiés"
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-slate-700 font-medium text-lg">
                                        <div className="bg-white p-1 rounded-full shadow-sm">
                                            <CheckCircle className="text-indigo-600" size={20} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button onClick={() => navigate('/teacher/sample')} className="h-14 px-8 text-lg shadow-lg shadow-indigo-200">
                                Voir un profil enseignant
                            </Button>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-indigo-100 rounded-[2rem] -rotate-2 -z-10" />
                            <Card className="p-0 overflow-hidden border-0 shadow-2xl rounded-[2rem]">
                                <div className="bg-slate-900 p-8 text-white">
                                    <h4 className="font-bold text-xl">Aperçu Scoring Jeu</h4>
                                    <p className="text-slate-400 text-sm mt-1">Validation en temps réel des compétences</p>
                                </div>
                                <div className="p-8 space-y-6 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-slate-700 text-lg">Didactique des Maths</span>
                                        <span className="text-indigo-600 font-black text-2xl">92%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full w-[92%] rounded-full shadow-lg" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Badge color="blue">Expert</Badge>
                                        <Badge color="green">Top 10%</Badge>
                                        <Badge color="amber">986 pts</Badge>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section >

            {/* Focus Écoles */}
            < section id="schools" className="py-32 bg-white" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                        <div className="lg:w-1/2">
                            <Badge color="blue" className="mb-6">Focus Écoles</Badge>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                Un espace dédié aux établissements scolaires
                            </h2>
                            <p className="text-slate-600 text-xl mb-10 leading-relaxed">
                                Gérez vos besoins de recrutement, suivez les performances et collaborez avec des enseignants certifiés en toute simplicité.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                {[
                                    { icon: <Users size={20} />, text: "Publication d'offres" },
                                    { icon: <CheckCircle size={20} />, text: "Gestion candidatures" },
                                    { icon: <TrendingUp size={20} />, text: "Suivi collaborations" },
                                    { icon: <Mail size={20} />, text: "Messagerie intégrée" },
                                    { icon: <Trophy size={20} />, text: "Rapports pédagogiques" },
                                    { icon: <Zap size={20} />, text: "Facturation simplifiée" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg">
                                        <div className="text-indigo-600 bg-white p-2 rounded-md shadow-sm">{item.icon}</div>
                                        <span className="font-bold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => navigate('/school')} variant="school" className="h-14 px-8 text-lg shadow-xl shadow-slate-200">
                                Créer un compte école
                            </Button>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-slate-100 rounded-[2rem] rotate-2 -z-10" />
                            <Card className="bg-slate-900 text-white border-slate-800 shadow-2xl rounded-[2rem] p-8">
                                <h4 className="font-bold text-xl mb-8 flex items-center gap-3">
                                    <div className="bg-indigo-500 p-2 rounded-lg">
                                        <Building2 className="text-white" size={24} />
                                    </div>
                                    Tableau de bord École
                                </h4>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                        <p className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Équipe active</p>
                                        <p className="text-4xl font-bold">24</p>
                                    </div>
                                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                        <p className="text-slate-400 text-xs font-bold uppercase mb-2 tracking-wider">Offres en cours</p>
                                        <p className="text-4xl font-bold">3</p>
                                    </div>
                                </div>
                                <div className="bg-indigo-600/20 border border-indigo-500/30 p-6 rounded-2xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm text-indigo-200 font-medium">Candidature récente</p>
                                        <Badge color="green" className="text-[10px]">Nouveau</Badge>
                                    </div>
                                    <p className="font-bold text-lg">Professeur de SVT</p>
                                    <p className="text-sm text-slate-400 mt-1">Score: 89/100 • Il y a 2h</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section >

            {/* Appel à l'action final */}
            < section className="py-24 bg-indigo-600" >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Rejoignez EduConnect et transformez la manière dont l'éducation se connecte
                    </h2>
                    <p className="text-xl text-indigo-100 mb-10">
                        Inscrivez-vous gratuitement et découvrez une nouvelle façon de connecter talents et opportunités
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            onClick={() => navigate('/student')}
                            className="h-14 px-8 text-lg bg-white text-indigo-600 hover:bg-slate-100"
                        >
                            S'inscrire gratuitement
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10"
                        >
                            Nous contacter
                        </Button>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-slate-900 text-slate-400" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Logo et description */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-indigo-600 p-2 rounded-lg">
                                    <School className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold text-white">EduConnect</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                La plateforme qui connecte l'éducation par la compétence
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Navigation</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#home" className="hover:text-white transition-colors">Accueil</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors">Élèves & Parents</a></li>
                                <li><a href="#teachers" className="hover:text-white transition-colors">Enseignants</a></li>
                                <li><a href="#schools" className="hover:text-white transition-colors">Écoles</a></li>
                                <li><a href="#how" className="hover:text-white transition-colors">Comment ça marche</a></li>
                            </ul>
                        </div>

                        {/* Légal */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Légal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Réseaux sociaux */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Suivez-nous</h4>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                    <Facebook size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-slate-800 pt-8 text-center text-sm">
                        <p>© 2025 EduConnect. Tous droits réservés.</p>
                    </div>
                </div>
            </footer >
        </div >
    );
};
