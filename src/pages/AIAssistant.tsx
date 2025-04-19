
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChat from '@/components/chat/AIChat';

const AIAssistant = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 max-w-7xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-alzheimer-dark mb-2">AI Assistant</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Talk to our AI assistant specialized in Alzheimer's disease research. 
            Ask questions about symptoms, treatments, prevention strategies, or latest research.
          </p>
        </div>
        <AIChat />
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
