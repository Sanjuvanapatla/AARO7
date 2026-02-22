import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistantWidget from '../ui/AIAssistantWidget';
import NeuralCanvas from '../home/NeuralCanvas';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <div className="global-bg">
        <NeuralCanvas />
        <div className="global-bg__gradient"></div>
      </div>
      <Navbar />
      <main className="content-wrapper">{children}</main>
      <Footer />
      <AIAssistantWidget />
    </>
  );
};

export default Layout;
