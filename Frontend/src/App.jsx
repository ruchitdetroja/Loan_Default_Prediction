import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Dashboard from './pages/Dashboard';
import ModelInsights from './pages/ModelInsights';
import DataExplorer from './pages/DataExplorer';
import About from './pages/About';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/model" element={<ModelInsights />} />
          <Route path="/data" element={<DataExplorer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
