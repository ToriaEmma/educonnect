import { useNavigate } from 'react-router-dom';
import {
    Star, CheckCircle, ShieldCheck, ArrowLeft, Calendar, MapPin, Award, BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';

export const TeacherProfile = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Simple Professional Header */}
            <div className="bg-slate-900 py-12 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <Button variant="ghost" className="text-slate-400 hover:text-white mb-8" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2" size={20} /> Retour
                    </Button>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                                alt="Teacher"
                            />
                            <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white" title="En ligne" />
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dr. Sarah Koné</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                <Badge className="bg-indigo-600 text-white border-0">Professeure Certifiée</Badge>
                                <Badge className="bg-slate-800 text-amber-500 border-slate-700"><Star size={12} className="mr-1" fill="currentColor" /> Top Mentor</Badge>
                            </div>
                            <p className="text-slate-400 max-w-xl">
                                Experte en Mathématiques et Physique-Chimie. J'aide mes élèves à retrouver confiance et à exceller.
                            </p>
                        </div>

                        <div className="md:ml-auto flex gap-4 mt-4 md:mt-0">
                            <div className="text-center px-4 border-r border-slate-700">
                                <div className="text-2xl font-bold text-white">4.9</div>
                                <div className="text-xs text-slate-500 uppercase">Note</div>
                            </div>
                            <div className="text-center px-4">
                                <div className="text-2xl font-bold text-white">8 ans</div>
                                <div className="text-xs text-slate-500 uppercase">Expérience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Actions */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-white border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Actions Rapides</h3>
                            <div className="space-y-3">
                                <Button onClick={() => navigate('/teacher-dashboard?tab=planning')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Réserver un cours
                                </Button>
                                <Button onClick={() => navigate('/teacher-dashboard?tab=messages')} variant="outline" className="w-full">
                                    Envoyer un message
                                </Button>
                            </div>
                        </Card>

                        <Card className="p-6 bg-white border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="text-emerald-600" size={18} /> Vérifications
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-sm text-slate-600">Identité vérifiée</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-sm text-slate-600">Diplôme Certifié</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-sm text-slate-600">Casier B2 Vierge</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bio Section */}
                        <Card className="p-8 bg-white border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">À propos</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                "Passionnée par l'enseignement depuis plus de 10 ans, ma mission est de réconcilier les élèves avec les mathématiques. J'utilise une méthode basée sur la compréhension intuitive et des exemples concrets, loin du par cœur. Mes élèves gagnent en moyenne 3 à 5 points dès le premier trimestre."
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                                        <BookOpen size={18} className="text-indigo-600" /> Mathématiques
                                    </div>
                                    <p className="text-sm text-slate-500">Niveau Collège & Lycée</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                                        <Award size={18} className="text-amber-500" /> Physique-Chimie
                                    </div>
                                    <p className="text-sm text-slate-500">Préparation aux examens</p>
                                </div>
                            </div>
                        </Card>

                        {/* Practical Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Calendar className="text-slate-400" size={18} /> Disponibilités
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-600">Lundi</span>
                                        <span className="font-medium text-emerald-600">14h - 18h</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-50">
                                        <span className="text-slate-600">Mercredi</span>
                                        <span className="font-medium text-emerald-600">09h - 12h</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-slate-600">Samedi</span>
                                        <span className="font-medium text-emerald-600">10h - 16h</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-white border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <MapPin className="text-slate-400" size={18} /> Zones
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">En ligne</Badge>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">À domicile (10km)</Badge>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">Bibliothèque</Badge>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
