
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrainVisualization from '../visualizations/BrainVisualization';

const Hero = () => {
  return (
    <div className="relative hero-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold tracking-tight text-alzheimer-dark sm:text-5xl md:text-6xl">
              <span className="block">Advancing Alzheimer's</span>
              <span className="block text-alzheimer-primary">Detection with AI</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto md:mx-0 text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl">
              Explore cutting-edge research, risk assessment tools, and the latest breakthroughs in early Alzheimer's detection using machine learning.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button asChild className="bg-alzheimer-primary hover:bg-alzheimer-accent px-8 py-3 text-base">
                <Link to="/assessment">
                  Risk Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary hover:bg-alzheimer-tertiary">
                <Link to="/research" className="flex items-center">
                  Explore Research <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary hover:bg-alzheimer-tertiary">
                <Link to="/ai-assistant" className="flex items-center">
                  Ask AI Assistant <Bot size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <BrainVisualization />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
