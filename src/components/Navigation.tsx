import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const Navigation = () => {
  const location = useLocation();

  // Hide navigation on active workout
  if (location.pathname === '/active') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full glass-card border-t border-white/5 pb-safe pt-2 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 mb-2">
        <NavLink to="/" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-primary" : "text-surface-variant")}>
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Home</span>
        </NavLink>
        
        <NavLink to="/workouts" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-primary" : "text-surface-variant")}>
          <Dumbbell className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Treinos</span>
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-primary" : "text-surface-variant")}>
          <User className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Perfil</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
