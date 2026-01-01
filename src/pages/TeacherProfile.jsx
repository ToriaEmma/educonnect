import { useNavigate } from 'react-router-dom';
import {
    Star,
    CheckCircle,
    ShieldCheck,
    Gamepad2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const TeacherProfile = () => {
    const navigate = useNavigate();

    const reviews = [
        { name: "Famille Diop", date: "Il y a 2 semaines", text: "Dr. Sarah est très patiente. Mon fils a remonté sa moyenne de 4 points.", rating: 5 },
        { name: "Lycée Saint-Paul", date: "Il y a 1 mois", text: "Intervention brillante en classe de terminale.", rating: 5 }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="h-48 bg-indigo-700" />
            <div className="max-w-5xl mx-auto px-4 -mt-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="text-center overflow-visible pt-0">
                            <div className="relative -mt-16 mb-4 inline-block">
                                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=400&fit=crop" className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover mx-auto" alt="Teacher" />
                                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Dr. Sarah Koné</h2>
                            <p className="text-indigo-600 font-medium">Enseignante Expérimentée</p>
                            <div className="mt-8 space-y-3">
                                <Button className="w-full h-12">Recruter Sarah</Button>
                                <Button variant="outline" className="w-full h-12">Inviter dans mon établissement</Button>
                                <Button variant="ghost" className="w-full">Envoyer un message</Button>
                            </div>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-slate-900 mb-4">Vérifications</h4>
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500" /> Diplômes vérifiés</div>
                                <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-indigo-500" /> Identité certifiée</div>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <h3 className="text-xl font-bold mb-4">Expérience & Vision</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Avec plus de 8 ans d'expérience dans l'enseignement public et privé, ma vision est de transformer l'apprentissage des mathématiques en une aventure logique et ludique. J'ai accompagné plus de 200 élèves vers la réussite au baccalauréat.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <span className="text-xs text-slate-400 font-bold uppercase">Primaire / Collège</span>
                                    <p className="font-bold text-indigo-700">Maîtrise totale</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <span className="text-xs text-slate-400 font-bold uppercase">Lycée / Prépa</span>
                                    <p className="font-bold text-indigo-700">Expertise avancée</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-2 border-indigo-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2"><Gamepad2 className="text-indigo-600" /> Preuves de compétences</h3>
                                <Badge color="green">Top 5% National</Badge>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold">Le Maître de l'Algèbre</h4>
                                        <span className="text-indigo-700 font-black">986 pts</span>
                                    </div>
                                    <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-indigo-100">
                                        <div className="bg-indigo-600 h-full w-[98%]" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold mb-6">Avis & Évaluations</h3>
                            <div className="space-y-6">
                                {reviews.map((rev, i) => (
                                    <div key={i} className="border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-900">{rev.name}</span>
                                            <div className="flex text-amber-400">
                                                {[...Array(rev.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm italic">"{rev.text}"</p>
                                        <span className="text-[10px] text-slate-400 font-medium uppercase mt-2 block">{rev.date}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Navigation Button */}
                <div className="mt-8">
                    <Button variant="outline" onClick={() => navigate('/')}>← Retour à l'accueil</Button>
                </div>
            </div>
        </div>
    );
};
