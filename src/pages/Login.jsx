import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, Mail, Lock, Quote, User, GraduationCap, Building2, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';

export const Login = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState('student'); // student, teacher, school, parent

    return (
        <div className="min-h-screen bg-white flex relative overflow-hidden">

            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <School className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">EduConnect</span>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">Bon retour !</h1>
                        <p className="text-slate-500 text-lg">
                            Choisissez votre espace de connexion.
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
                                className={`p-2 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1 ${role === item.id
                                    ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary ring-opacity-50'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                <item.icon size={18} className={role === item.id ? 'text-primary' : 'text-slate-400'} />
                                <span className="font-semibold text-[10px] sm:text-xs uppercase tracking-wide">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        if (role === 'student') navigate('/student');
                        else if (role === 'parent') navigate('/parent');
                        else if (role === 'teacher') navigate('/teacher-dashboard');
                        else if (role === 'school') navigate('/school');
                    }}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="exemple@educonnect.com"
                            icon={Mail}
                        />

                        <div className="relative">
                            <Input
                                label="Mot de passe"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                            />
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 shadow-xl shadow-primary/20">
                            Se connecter <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500">
                            Pas encore de compte ?{' '}
                            <button onClick={() => navigate('/register')} className="text-primary font-bold hover:underline">
                                Créer un compte gratuitement
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-slate-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-lg px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl"
                    >
                        <Quote className="text-secondary w-12 h-12 mb-6 opacity-80" />
                        <p className="text-2xl font-medium text-white leading-relaxed mb-6">
                            "EduConnect a transformé ma façon d'apprendre. La validation par le jeu rend chaque progrès gratifiant."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-0.5">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Student" className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Sarah L.</p>
                                <p className="text-white/60 text-sm">Étudiante en Design</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
