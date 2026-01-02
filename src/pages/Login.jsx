import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, ArrowRight, Mail, Lock, Quote, User, GraduationCap, Building2, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/firebaseService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const successMessage = location.state?.message;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await loginUser(formData.email, formData.password);
            
            if (!result.userData) {
                throw new Error('Utilisateur non trouvé');
            }

            login(result.userData, result.user.uid);

            // Redirection basée sur le rôle
            const userRole = result.userData.role;
            if (userRole === 'student') navigate('/student');
            else if (userRole === 'teacher') navigate('/teacher-dashboard');
            else if (userRole === 'school') navigate('/school');
            else if (userRole === 'parent') navigate('/parent');
            else navigate('/');
        } catch (err) {
            console.error('Erreur connexion:', err);
            setError('Email ou mot de passe incorrect');
            
            // Si utilisateur n'existe pas, rediriger vers inscription après 3 secondes
            if (err.message.includes('user-not-found') || err.message.includes('invalid-credential')) {
                setTimeout(() => {
                    navigate('/register', { state: { message: 'Aucun compte trouvé. Veuillez vous inscrire.' } });
                }, 3000);
            }
        } finally {
            setLoading(false);
        }
    };

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
                        <img src="/educo.png" alt="EduConnect" className="h-20 w-auto" />
                    </div>

                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">Bon retour !</h1>
                        <p className="text-slate-500 text-lg">
                            Choisissez votre espace de connexion.
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-green-700">{successMessage}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

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

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="exemple@educonnect.com"
                            icon={Mail}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <div className="relative">
                            <Input
                                label="Mot de passe"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-12 shadow-xl shadow-primary/20" disabled={loading}>
                            {loading ? 'Connexion...' : 'Se connecter'} {!loading && <ArrowRight size={18} className="ml-2" />}
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
