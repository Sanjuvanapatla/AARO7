import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import ReadinessAssessmentPage from './pages/ReadinessAssessmentPage';
import ROICalculatorPage from './pages/ROICalculatorPage';
import PackagesPage from './pages/PackagesPage';
import TrustCenterPage from './pages/TrustCenterPage';
import InsightsPage from './pages/InsightsPage';
import BookCallPage from './pages/BookCallPage';
import GrowthDashboardPage from './pages/GrowthDashboardPage';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/assessment" element={<ReadinessAssessmentPage />} />
        <Route path="/roi-calculator" element={<ROICalculatorPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/trust-center" element={<TrustCenterPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/book-call" element={<BookCallPage />} />
        <Route path="/growth-dashboard" element={<GrowthDashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
