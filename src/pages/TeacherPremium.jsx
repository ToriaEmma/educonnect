import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

export const TeacherPremium = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Standard",
            price: "Gratuit",
            color: "slate",
            features: [
                "Profil public basique",
                "Gestion des élèves",
                "Messagerie standard",
                "Paiements sécurisés"
            ],
            cta: "Actuel",
            current: true
        },
        {
            name: "Gold Mentor",
            price: "4.900 F / mois",
            color: "amber",
            popular: true,
            features: [
                "Tout du Standard",
                "Badge 'Vérifié' & 'Gold'",
                "Priorité dans les recherches",
                "Outils pédagogiques avancés",
                "Statistiques détaillées"
            ],
            cta: "Passer Gold"
        },
        {
            name: "Diamond Elite",
            price: "9.900 F / mois",
            color: "indigo",
            features: [
                "Tout du Gold",
                "Badge 'Diamond'",
                "Mise en avant sur la page d'accueil",
                "Support dédié 24/7",
                "Formation continue offerte",
                "Commissions réduites"
            ],
            cta: "Devenir Elite"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans relative">
            {/* Clean Professional Hero */}
            <div className="bg-slate-900 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10 text-center">
                    <Button variant="ghost" className="absolute top-4 left-4 text-slate-400 hover:text-white" onClick={() => navigate('/teacher-dashboard')}>
                        <ArrowLeft className="mr-2" size={20} /> Retour
                    </Button>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Offres Enseignants
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Des outils professionnels pour développer votre activité pédagogique.
                    </p>
                </div>
            </div>

            {/* Content Section - Aligned, No Overlay */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`
                                flex flex-col p-8 border 
                                ${plan.popular ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-200'}
                                bg-white shadow-sm hover:shadow-md transition-shadow
                            `}
                        >
                            <div className="mb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-xl font-bold ${plan.popular ? 'text-amber-600' : 'text-slate-900'}`}>
                                        {plan.name}
                                    </h3>
                                    {plan.popular && (
                                        <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Recommandé</Badge>
                                    )}
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                                    {plan.price !== "Gratuit" && <span className="text-slate-500 text-sm">/mois</span>}
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-amber-500' : 'text-green-500'}`} />
                                        <span className="leading-snug">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${plan.current
                                    ? 'bg-slate-900 text-white border border-slate-900 cursor-default hover:bg-slate-800'
                                    : plan.popular
                                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                                    }`}
                            >
                                {plan.current ? (
                                    <span className="flex items-center justify-center gap-2"><Check size={16} /> Offre Actuelle</span>
                                ) : plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center border-t border-slate-200 pt-8">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        <Shield size={16} /> Garantie satisfait ou remboursé sous 14 jours pour toute nouvelle souscription.
                    </p>
                </div>
            </div>
        </div>
    );
};
