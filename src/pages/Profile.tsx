import React from 'react';
import { useFirebase } from '../components/FirebaseProvider';
import { signOut } from '../lib/firebase';
import { motion } from 'motion/react';
import { Settings, LogOut, Award, ChevronRight, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WEEKLY_VOLUME_DATA = [
  { day: 'Seg', volume: 2.4 },
  { day: 'Ter', volume: 3.1 },
  { day: 'Qua', volume: 0 },
  { day: 'Qui', volume: 2.8 },
  { day: 'Sex', volume: 0 },
  { day: 'Sáb', volume: 4.1 },
  { day: 'Dom', volume: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high border border-surface-variant p-2 rounded-lg shadow-xl">
        <p className="text-[10px] uppercase font-bold text-surface-variant tracking-widest mb-1">{label}</p>
        <p className="font-headline font-bold text-primary">{payload[0].value} <span className="text-white text-xs font-medium">ton</span></p>
      </div>
    );
  }
  return null;
};

const Profile = () => {
  const { user } = useFirebase();

  return (
    <div className="min-h-screen bg-background text-on-background px-4 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="font-headline font-black text-4xl text-white tracking-tight uppercase">
          Perfil<br/>
          <span className="text-surface-variant font-light">& Evolução</span>
        </h1>
        <button className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-surface-variant hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </motion.div>

      {/* User Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-surface-container rounded-[32px] border border-surface-variant p-6 mb-8 flex items-center gap-6"
      >
        <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden shrink-0">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center font-headline font-bold text-2xl text-primary">
              {user?.displayName?.[0] || 'A'}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-headline font-bold text-2xl text-white mb-1 leading-tight">{user?.displayName || 'Atleta Anônimo'}</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-variant/20 rounded border border-surface-variant/50 text-[10px] font-bold uppercase tracking-widest text-surface-variant">
            <Award className="w-3 h-3 text-secondary" />
            Nível Avançado
          </span>
        </div>
      </motion.div>

      {/* Body Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-container-low rounded-[24px] border border-surface-variant p-5">
           <span className="block text-[10px] font-bold text-surface-variant uppercase tracking-widest mb-2">Peso Corporal</span>
           <div className="flex items-end gap-1">
             <span className="font-headline font-bold text-3xl text-white leading-none">82.5</span>
             <span className="font-body font-bold text-surface-variant uppercase text-sm">kg</span>
           </div>
        </div>
        <div className="bg-surface-container-low rounded-[24px] border border-surface-variant p-5">
           <span className="block text-[10px] font-bold text-surface-variant uppercase tracking-widest mb-2">Altura</span>
           <div className="flex items-end gap-1">
             <span className="font-headline font-bold text-3xl text-white leading-none">1.84</span>
             <span className="font-body font-bold text-surface-variant uppercase text-sm">m</span>
           </div>
        </div>
      </div>

      {/* Chart Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-container rounded-[32px] border border-surface-variant p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-headline font-bold text-lg text-white">Volume Semanal</h3>
            <span className="font-body text-[10px] font-bold text-surface-variant tracking-widest uppercase">Toneladas Movidas</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
             <BarChart3 className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_VOLUME_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#777575', fontSize: 10, fontWeight: 'bold' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#777575', fontSize: 10 }}
              />
              <Tooltip cursor={{ fill: '#262626', opacity: 0.4 }} content={<CustomTooltip />} />
              <Bar dataKey="volume" radius={[4, 4, 4, 4]} maxBarSize={32}>
                {WEEKLY_VOLUME_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.volume > 0 ? '#7dffa3' : '#262626'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="space-y-4 mb-12">
        <button className="w-full bg-surface-container border border-surface-variant rounded-[24px] p-5 flex items-center justify-between group">
          <div className="flex flex-col text-left">
             <span className="font-headline font-bold text-white text-lg">Histórico de Treinos</span>
             <span className="font-body text-[10px] uppercase font-bold tracking-widest text-surface-variant mt-1">124 Sessões Registradas</span>
          </div>
          <ChevronRight className="w-6 h-6 text-surface-variant group-hover:text-primary transition-colors" />
        </button>
        <button className="w-full bg-surface-container border border-surface-variant rounded-[24px] p-5 flex items-center justify-between group">
          <div className="flex flex-col text-left">
             <span className="font-headline font-bold text-white text-lg">Medidas e Evolução</span>
             <span className="font-body text-[10px] uppercase font-bold tracking-widest text-surface-variant mt-1">Atualizado há 12 dias</span>
          </div>
          <ChevronRight className="w-6 h-6 text-surface-variant group-hover:text-primary transition-colors" />
        </button>
      </div>

      <button onClick={signOut} className="w-full h-14 rounded-full border border-red-500/20 text-red-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-red-500/10 active:scale-95 transition-all">
        <LogOut className="w-4 h-4" strokeWidth={2.5}/>
        Encerrar Sessão
      </button>
    </div>
  );
};

export default Profile;
