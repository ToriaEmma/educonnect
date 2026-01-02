import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, User, Users, Mail, Lock, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';

export const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student'); // student, teacher, school

    return (
        <div className="min-h-screen bg-white flex relative overflow-hidden">

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-20 relative z-10 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg mx-auto"
                >
                    <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <School className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">EduConnect</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-3">Créez votre compte</h1>
                        <p className="text-slate-500">
                            Rejoignez la communauté et commencez à apprendre ou enseigner dès aujourd'hui.
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {[
                            { id: 'student', label: 'Élève', icon: User },
                            { id: 'teacher', label: 'Prof', icon: GraduationCap },
                            { id: 'school', label: 'École', icon: Building2 },
                            { id: 'parent', label: 'Parent', icon: Users },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setRole(item.id)}
                                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2 ${role === item.id
                                    ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary ring-opacity-50'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                <item.icon size={20} className={role === item.id ? 'text-primary' : 'text-slate-400'} />
                                <span className="font-semibold text-xs sm:text-sm">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <form className="space-y-5" onSubmit={(e) => {
                        e.preventDefault();
                        if (role === 'student') navigate('/student');
                        else if (role === 'parent') navigate('/parent');
                        else if (role === 'teacher') navigate('/teacher-dashboard');
                        else if (role === 'school') navigate('/school');
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Prénom" placeholder="Jean" icon={User} />
                            <Input label="Nom" placeholder="Dupont" />
                        </div>

                        <Input label="Email" type="email" placeholder="jean.dupont@exemple.com" icon={Mail} />
                        <Input label="Mot de passe" type="password" placeholder="Minimum 8 caractères" icon={Lock} />

                        {role === 'teacher' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Input label="Spécialité" placeholder="Ex: Mathématiques" icon={GraduationCap} />
                            </motion.div>
                        )}

                        <div className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" id="terms" />
                            <label htmlFor="terms" className="text-sm text-slate-500 cursor-pointer select-none">
                                J'accepte les <a href="#" className="text-primary hover:underline font-medium">CGU</a> et la <a href="#" className="text-primary hover:underline font-medium">Politique de Confidentialité</a>.
                            </label>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-12 shadow-xl shadow-primary/20">
                            S'inscrire <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Déjà inscrit ?{' '}
                        <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline">
                            Se connecter
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-black opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                {/* Decorative Blobs */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative z-10 max-w-md px-8">
                    <h2 className="text-3xl font-bold text-white mb-8">Pourquoi nous rejoindre ?</h2>
                    <div className="space-y-6">
                        {[
                            "Accès illimité à des milliers de ressources",
                            "Professeurs certifiés et validés",
                            "Communauté d'entraide active 24/7",
                            "Suivi de progression personnalisé par IA"
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
                            >
                                <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                                    <CheckCircle size={20} />
                                </div>
                                <span className="text-white font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
