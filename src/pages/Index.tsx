
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import InfoSection from '@/components/home/InfoSection';
import ResearchHighlights from '@/components/home/ResearchHighlights';
import AssessmentCTA from '@/components/home/AssessmentCTA';
import LatestNews from '@/components/home/LatestNews';
import StatisticsSection from '@/components/home/StatisticsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <StatisticsSection />
        <ResearchHighlights />
        <AssessmentCTA />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
