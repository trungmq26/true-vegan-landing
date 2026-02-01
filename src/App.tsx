import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PromotionSection from './components/PromotionSection';
import ImageSection from './components/ImageSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ExpertSection from './components/ExpertSection';
import CertificatesSection from './components/CertificatesSection';
import IngredientsSection from './components/IngredientsSection';
import FeatureSection from './components/FeatureSection';
import UsageSection from './components/UsageSection';
import PriceSection from './components/PriceSection';
import ContactSection from './components/ContactSection';
import OrderSection from './components/OrderSection';
import ConsultationSection from './components/ConsultationSection';
import Section13 from './components/Section13';
import Section14 from './components/Section14';
import OrderDetailPage from './components/OrderDetailPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import AdminOrdersPage from './components/AdminOrdersPage';
import AdminLoginPage from './components/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  position: relative;
  z-index: 1000;
`;

const MainContainer = styled.main`
  width: 100%;
  overflow: hidden;
`;

const HomePage = () => (
  <>
    <HeaderContainer>
      <Header />
    </HeaderContainer>
    <MainContainer>
      <HeroSection />
      <PromotionSection />
      <ImageSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ExpertSection />
      <CertificatesSection />
      <IngredientsSection />
      <FeatureSection />
      <UsageSection />
      <PriceSection />
      <ContactSection />
      <OrderSection />
      <ConsultationSection />
      <Section13 />
      <Section14 />
    </MainContainer>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminOrdersPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
