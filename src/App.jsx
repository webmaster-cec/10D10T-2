import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Landing = lazy(() => import('./pages/Landing'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
import LoaderHelix from './components/LoaderHelix';

import LoadingScreen from './components/LoadingScreen';
import ScrollIndicator from './components/ScrollIndicator';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/tasks' || pathname === '/leaderboard') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ScrollIndicator />
      <div className="flex flex-col min-h-screen overflow-x-hidden w-full relative">
        <Navbar />
        <main className="grow">
          <Suspense fallback={<div className="flex h-[50vh] w-full items-center justify-center"><LoaderHelix /></div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

