import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { cn } from '../components/Navigation';

const WORKOUTS = [
  { id: 'abc-a', class: 'Classe A', level: 'Intermediário', name: 'Empurrar', desc: 'Peito, Ombro e Tríceps', duration: 60, intensity: 'Alta', color: 'primary' },
  { id: 'abc-b', class: 'Classe B', level: 'Intermediário', name: 'Puxar', desc: 'Costas e Bíceps', duration: 55, intensity: 'Média', color: 'secondary' },
  { id: 'abc-c', class: 'Classe C', level: 'Avançado', name: 'Pernas', desc: 'Quadríceps, Posterior e Core', duration: 65, intensity: 'Muito Alta', color: 'tertiary' },
  { id: 'full-body', class: 'Full Body', level: 'Iniciante', name: 'Adaptação', desc: 'Treino de adaptação corpo todo', duration: 40, intensity: 'Baixa', color: 'primary' },
  { id: 'hiit-1', class: 'Cardio', level: 'Avançado', name: 'HIIT', desc: 'Treino intervalado alta intensidade', duration: 20, intensity: 'Muito Alta', color: 'secondary' },
  { id: 'core-1', class: 'Core', level: 'Iniciante', name: 'Abdômen', desc: 'Estabilização e core', duration: 30, intensity: 'Média', color: 'tertiary' },
];

const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
      active 
        ? "bg-primary border-primary text-background" 
        : "bg-surface-container border-surface-variant text-surface-variant hover:border-primary/50"
    )}
  >
    {label}
  </button>
);

const WorkoutLibrary = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('Todos');
  const [filterDuration, setFilterDuration] = useState<string>('Todos');
  const [filterIntensity, setFilterIntensity] = useState<string>('Todos');

  const filteredWorkouts = WORKOUTS.filter(wk => {
    // Level
    if (filterLevel !== 'Todos' && wk.level !== filterLevel) return false;
    
    // Intensity
    if (filterIntensity !== 'Todos' && wk.intensity !== filterIntensity) return false;

    // Duration
    if (filterDuration !== 'Todos') {
      if (filterDuration === 'Até 30m' && wk.duration > 30) return false;
      if (filterDuration === '31m - 60m' && (wk.duration <= 30 || wk.duration > 60)) return false;
      if (filterDuration === '+ de 60m' && wk.duration <= 60) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background text-on-background px-4 pt-12 pb-24 flex flex-col">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-start"
      >
        <h1 className="font-headline font-black text-4xl text-white tracking-tight uppercase leading-none">
          Modelos<br/>
          <span className="text-surface-variant font-light">de Treino</span>
        </h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "w-12 h-12 rounded-full border flex items-center justify-center transition-colors shadow-lg active:scale-95",
            showFilters ? "bg-primary border-primary text-background" : "bg-surface-container border-surface-variant text-white"
          )}
        >
          {showFilters ? <X className="w-5 h-5" strokeWidth={2.5} /> : <Filter className="w-5 h-5" />}
        </button>
      </motion.header>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-surface-container-low border border-surface-variant rounded-2xl p-4 space-y-5 shadow-2xl">
              
              <div>
                <span className="block text-[10px] font-bold text-surface-variant uppercase tracking-widest mb-3">Nível de Experiência</span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['Todos', 'Iniciante', 'Intermediário', 'Avançado'].map(level => (
                    <FilterPill key={level} label={level} active={filterLevel === level} onClick={() => setFilterLevel(level)} />
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-bold text-surface-variant uppercase tracking-widest mb-3">Duração Estimada</span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['Todos', 'Até 30m', '31m - 60m', '+ de 60m'].map(dur => (
                    <FilterPill key={dur} label={dur} active={filterDuration === dur} onClick={() => setFilterDuration(dur)} />
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-[10px] font-bold text-surface-variant uppercase tracking-widest mb-3">Intensidade</span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['Todos', 'Baixa', 'Média', 'Alta', 'Muito Alta'].map(int => (
                    <FilterPill key={int} label={int} active={filterIntensity === int} onClick={() => setFilterIntensity(int)} />
                  ))}
                </div>
              </div>

              {(filterLevel !== 'Todos' || filterDuration !== 'Todos' || filterIntensity !== 'Todos') && (
                <div className="pt-2">
                  <button 
                    onClick={() => {
                       setFilterLevel('Todos');
                       setFilterDuration('Todos');
                       setFilterIntensity('Todos');
                    }}
                    className="w-full text-center text-xs font-bold uppercase tracking-widest text-surface-variant hover:text-white transition-colors py-2"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4">
        {filteredWorkouts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12"
          >
             <span className="material-symbols-outlined text-4xl text-surface-variant mb-4">search_off</span>
             <p className="font-body text-surface-variant font-medium">Nenhum treino encontrado com estes filtros.</p>
          </motion.div>
        ) : (
          filteredWorkouts.map((wk, index) => {
            const colorClass = wk.color === 'primary' ? 'bg-primary/10 text-primary' : 
                               wk.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 
                               'bg-tertiary/10 text-tertiary';
            
            return (
              <motion.div
                key={wk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/workouts/${wk.id}`}
                  className="block bg-surface-container rounded-[28px] border border-surface-variant p-6 relative overflow-hidden group hover:border-surface-variant/80 transition-colors"
                >
                  <div className={`absolute -right-8 -top-8 w-32 h-32 blur-[50px] rounded-full opacity-10 group-hover:opacity-20 transition-opacity bg-${wk.color}`} />
                  
                  <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-3">
                    <span className={`inline-block px-3 py-1 font-bold text-[10px] uppercase tracking-wider rounded-lg ${colorClass}`}>
                      {wk.class}
                    </span>
                    <span className="font-body text-[10px] font-bold text-surface-variant uppercase tracking-widest">
                      {wk.level}
                    </span>
                  </div>
                  
                  <h3 className="font-headline font-bold text-2xl text-white mb-2 leading-tight">{wk.name}</h3>
                  <p className="font-body text-surface-variant text-sm mb-5">{wk.desc}</p>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{wk.duration} MIN</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{wk.intensity}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorkoutLibrary;
