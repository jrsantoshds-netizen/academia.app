import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useFirebase } from './components/FirebaseProvider';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WorkoutLibrary from './pages/WorkoutLibrary';
import WorkoutDetail from './pages/WorkoutDetail';
import ActiveWorkout from './pages/ActiveWorkout';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useFirebase();
  if (loading) return <div className="h-screen w-screen bg-background flex justify-center items-center text-primary"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppMode = () => {
  const { user } = useFirebase();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative pb-20 scrollbar-hide">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<WorkoutLibrary />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} />
          <Route path="/active" element={<ActiveWorkout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AppMode />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
