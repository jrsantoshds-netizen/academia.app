import React from 'react';
import { useFirebase } from '../components/FirebaseProvider';
import { motion } from 'motion/react';
import { Activity, Flame, TrendingUp, CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STREAK = 5;
const WEEK_DATA = [true, true, false, true, false, false, false]; // M T W T F S S

const Dashboard = () => {
  const { user } = useFirebase();
  const userName = user?.displayName ? user.displayName.split(' ')[0] : 'Atleta';

  return (
    <div className="min-h-screen bg-background text-on-background px-4 pt-12 pb-24">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h2 className="font-body text-surface-variant text-xs uppercase tracking-widest mb-1">
            JORGE<span className="text-primary">FIT</span>
          </h2>
          <h1 className="font-headline font-bold text-3xl tracking-tight text-white">
            Olá, <span className="text-primary">{userName}</span>
          </h1>
        </div>
        <Link to="/profile" className="w-12 h-12 rounded-full border border-surface-variant overflow-hidden p-0.5">
          <div className="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="font-headline font-bold text-primary">{userName[0]}</span>
            )}
          </div>
        </Link>
      </motion.header>

      {/* Hero / Next Workout */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex justify-between items-end mb-3">
          <h3 className="font-headline font-semibold text-lg text-white">Meu Próximo Treino</h3>
        </div>
        <Link to="/workouts/abc-c" className="block relative overflow-hidden rounded-[32px] bg-surface-container p-6 border border-surface-variant kinetic-border group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
             <span className="material-symbols-outlined text-8xl text-primary transform rotate-12">fitness_center</span>
          </div>
          
          <div className="relative z-10 w-3/4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-wider rounded-lg mb-3">
               Classe C
            </span>
            <h4 className="font-headline font-bold text-3xl text-white mb-1 leading-tight">Pernas & Core</h4>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-1.5 text-surface-variant">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-xs font-semibold uppercase tracking-wider">45 MIN</span>
              </div>
              <div className="flex items-center gap-1.5 text-surface-variant">
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Alta</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </div>
          </div>
        </Link>
      </motion.section>

      {/* Quick Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-surface-container-low rounded-[24px] p-5 border border-surface-variant">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
             <Flame className="w-4 h-4 text-secondary" strokeWidth={2.5}/>
          </div>
          <p className="font-body text-surface-variant text-[10px] uppercase font-bold tracking-wider mb-1">Streak</p>
          <p className="font-headline text-2xl font-bold text-white">{STREAK} <span className="text-sm font-medium text-surface-variant">dias</span></p>
        </div>
        
        <div className="bg-surface-container-low rounded-[24px] p-5 border border-surface-variant">
          <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center mb-3">
             <Activity className="w-4 h-4 text-tertiary" strokeWidth={2.5}/>
          </div>
          <p className="font-body text-surface-variant text-[10px] uppercase font-bold tracking-wider mb-1">Volume</p>
          <p className="font-headline text-2xl font-bold text-white">12.4 <span className="text-sm font-medium text-surface-variant">ton</span></p>
        </div>
      </motion.div>

      {/* Weekly Frequency */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-headline font-semibold text-lg text-white mb-4">Frequência Semanal</h3>
        <div className="bg-surface-container rounded-[24px] p-6 border border-surface-variant">
           <div className="flex justify-between items-end gap-2">
             {['S','T','Q','Q','S','S','D'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-full max-w-[24px] aspect-square rounded-full flex items-center justify-center ${WEEK_DATA[i] ? 'bg-primary text-background' : 'bg-surface-container-high'}`}>
                    {WEEK_DATA[i] && <span className="material-symbols-outlined text-sm font-bold">check</span>}
                  </div>
                  <span className="font-body text-[10px] font-bold text-surface-variant uppercase">{day}</span>
                </div>
             ))}
           </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Dashboard;
