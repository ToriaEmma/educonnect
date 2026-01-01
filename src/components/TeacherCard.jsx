import { Star, ChevronRight } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export const TeacherCard = ({ teacher, onSelect }) => (
    <Card className="hover:border-indigo-300 transition-all group cursor-pointer" onClick={onSelect}>
        <div className="flex gap-4">
            <img src={teacher.img} className="w-16 h-16 rounded-xl object-cover" alt={teacher.name} />
            <div className="flex-grow">
                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{teacher.name}</h4>
                <p className="text-xs text-slate-500">{teacher.role}</p>
                <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span className="text-sm font-bold">{teacher.rating}</span>
                    <span className="text-xs text-slate-400">({teacher.reviews} avis)</span>
                </div>
            </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {teacher.subjects.map(s => <Badge key={s} color="blue">{s}</Badge>)}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">{teacher.price} / h</span>
            <button className="text-indigo-600 font-bold flex items-center gap-1">
                Voir profil <ChevronRight size={16} />
            </button>
        </div>
    </Card>
);
