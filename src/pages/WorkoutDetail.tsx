import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';

const EXERCISES = [
  { name: 'Supino Reto com Barra', sets: '4x', reps: '8-10', target: 'Peitoral Maior' },
  { name: 'Supino Inclinado com Halteres', sets: '3x', reps: '10-12', target: 'Peitoral Superior' },
  { name: 'Crucifixo Máquina', sets: '3x', reps: '12-15', target: 'Peitoral Isolado' },
  { name: 'Elevação Lateral', sets: '4x', reps: '12-15', target: 'Deltóide Lateral' },
  { name: 'Tríceps Corda', sets: '3x', reps: '10-12', target: 'Tríceps Isolado' }
];

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Usually fetch from id, just mocking
  
  return (
    <div className="min-h-screen bg-background text-on-background relative pb-32">
      {/* Heavy Hero Image Area */}
      <div className="relative h-72 w-full bg-surface-container overflow-hidden rounded-b-[40px] border-b border-surface-variant">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Top bar back button */}
        <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center justify-between z-20">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white border border-white/10 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-20">
           <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-bold text-[10px] uppercase tracking-wider rounded border border-primary/20 mb-2 backdrop-blur-md">
              Classe A
            </span>
           <h1 className="font-headline font-black text-5xl text-white tracking-tighter uppercase mb-2">
             Empurrar
           </h1>
           <p className="font-body text-surface-variant font-medium">Foco em Hipertrofia do Peitoral e Ombros</p>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        <div className="flex gap-4 mb-8 bg-surface-container-low p-4 rounded-3xl border border-surface-variant shadow-2xl">
          <div className="flex-1 text-center border-r border-surface-variant">
             <span className="block text-[10px] font-bold text-surface-variant tracking-widest uppercase mb-1">Duração</span>
             <span className="block font-headline font-bold text-xl text-white">60m</span>
          </div>
          <div className="flex-1 text-center border-r border-surface-variant">
             <span className="block text-[10px] font-bold text-surface-variant tracking-widest uppercase mb-1">Volume</span>
             <span className="block font-headline font-bold text-xl text-white">18 Séries</span>
          </div>
          <div className="flex-1 text-center">
             <span className="block text-[10px] font-bold text-surface-variant tracking-widest uppercase mb-1">Dificuldade</span>
             <span className="block font-headline font-bold text-xl text-white">Alta</span>
          </div>
        </div>

        <h3 className="font-headline font-bold text-lg text-white mb-4">Exercícios ({EXERCISES.length})</h3>
        
        <div className="space-y-3 pb-8">
          {EXERCISES.map((ex, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-surface-container border border-surface-container-high">
               <div className="font-headline font-bold text-2xl text-surface-variant/30 italic w-8 text-right">
                 {i + 1}
               </div>
               <div className="flex-1">
                 <h4 className="font-headline font-bold text-white mb-0.5">{ex.name}</h4>
                 <p className="font-body text-xs text-surface-variant">{ex.target}</p>
               </div>
               <div className="text-right">
                 <span className="block font-headline font-bold text-white">{ex.sets}</span>
                 <span className="block font-body text-[10px] text-surface-variant uppercase tracking-widest font-bold">{ex.reps} rep</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Floating Button */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-40">
         <Link to="/active" className="w-full h-16 rounded-[28px] bg-primary text-background font-headline font-black text-xl uppercase tracking-widest flex items-center justify-center gap-2 editorial-shadow active:scale-[0.98] transition-transform">
           <Play className="w-6 h-6 fill-current" />
           Iniciar Treino
         </Link>
      </div>
    </div>
  );
};

export default WorkoutDetail;
