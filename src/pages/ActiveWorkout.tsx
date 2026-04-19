import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Check, Info, X } from 'lucide-react';
import { cn } from '../components/Navigation';

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const [sets, setSets] = useState([
    { reps: 10, load: 30, completed: true },
    { reps: 10, load: 30, completed: false },
    { reps: 0, load: 0, completed: false },
    { reps: 0, load: 0, completed: false },
  ]);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const int = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(int);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const ss = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  const toggleSet = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
  };

  const finishWorkout = () => {
    // Navigate home assuming finished
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative flex flex-col">
      {/* Heavy Header, tracking style */}
      <header className="px-6 pt-12 pb-6 bg-surface-container-lowest border-b border-surface-variant flex items-center justify-between z-10 sticky top-0">
         <div>
            <span className="font-body font-bold text-[10px] text-surface-variant tracking-[0.2em] uppercase mb-1 block">Tempo de Treino</span>
            <div className="font-headline font-bold text-3xl text-primary font-mono tracking-tighter">
              {formatTime(timer)}
            </div>
         </div>
         <button onClick={finishWorkout} className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant text-white active:scale-95 transition-transform">
           <X className="w-6 h-6" />
         </button>
      </header>

      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="flex items-end justify-between mb-2">
           <span className="font-headline font-bold text-surface-variant/40 text-sm tracking-widest uppercase">Exercício 2/8</span>
           <button className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
             <Info className="w-3 h-3" />
             Detalhes
           </button>
        </div>
        
        <h1 className="font-headline font-black text-4xl text-white tracking-tighter uppercase leading-none mb-2">
          Supino Reto<br/><span className="text-surface-variant">Halteres</span>
        </h1>
        <p className="font-body text-surface-variant text-sm mb-10">Meta: 4 Séries x 8-12 Repetições</p>

        {/* Suggestion Card */}
        <div className="bg-surface-container rounded-2xl border border-primary/20 p-4 flex gap-4 items-center mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
             <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
          </div>
          <div>
             <h4 className="font-headline font-bold text-white text-sm mb-0.5">Progressão Sugerida</h4>
             <p className="font-body text-xs text-surface-variant leading-tight">Último treino: 28kg x 10. Tente <span className="text-primary font-bold">30kg</span> hoje.</p>
          </div>
        </div>

        {/* Sets Input Grid */}
        <div className="space-y-4">
           {/* Header row */}
           <div className="flex gap-4 px-4">
              <div className="w-8"></div>
              <div className="flex-1 text-center font-body text-[10px] font-bold text-surface-variant uppercase tracking-widest">Carga (KG)</div>
              <div className="flex-1 text-center font-body text-[10px] font-bold text-surface-variant uppercase tracking-widest">Reps</div>
              <div className="w-12 text-center font-body text-[10px] font-bold text-surface-variant uppercase tracking-widest">Ok</div>
           </div>

           {sets.map((set, i) => (
             <motion.div 
               key={i}
               initial={false}
               animate={{ backgroundColor: set.completed ? '#00f78115' : '#1a1919' }}
               className={cn("flex items-center gap-4 rounded-[20px] p-2 border transition-colors", set.completed ? "border-primary/30" : "border-surface-variant")}
             >
               <div className="w-8 text-center font-headline font-bold text-surface-variant/50">
                 {i + 1}
               </div>
               
               <div className="flex-1 bg-surface-container-low rounded-xl h-14 flex border border-surface-variant/50 relative overflow-hidden focus-within:border-primary transition-colors">
                 <input 
                   type="number" 
                   value={set.load || ''}
                   onChange={e => {
                     const n = [...sets]; n[i].load = Number(e.target.value); setSets(n);
                   }}
                   placeholder="-"
                   className="w-full h-full bg-transparent text-center font-headline font-bold pl-0 text-xl text-white outline-none"
                   readOnly={set.completed}
                 />
               </div>
               
               <div className="flex-1 bg-surface-container-low rounded-xl h-14 flex border border-surface-variant/50 relative overflow-hidden focus-within:border-primary transition-colors">
                 <input 
                   type="number" 
                   value={set.reps || ''}
                   onChange={e => {
                     const n = [...sets]; n[i].reps = Number(e.target.value); setSets(n);
                   }}
                   placeholder="-"
                   className="w-full h-full bg-transparent text-center font-headline font-bold pl-0 text-xl text-white outline-none"
                   readOnly={set.completed}
                 />
               </div>

               <button 
                 onClick={() => toggleSet(i)}
                 className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border", set.completed ? "bg-primary border-primary text-background" : "bg-surface-container-high border-surface-variant text-surface-variant hover:border-primary/50")}
               >
                 <Check className="w-6 h-6" strokeWidth={3} />
               </button>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="px-6 py-6 border-t border-surface-variant bg-background pb-safe">
        <button onClick={() => navigate('/workouts/abc-c')} className="w-full h-16 rounded-[24px] bg-white text-background font-headline font-bold text-lg tracking-wide uppercase active:scale-[0.98] transition-transform">
          Próximo Exercício
        </button>
      </div>
    </div>
  );
};

export default ActiveWorkout;
