
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Activity, Search } from 'lucide-react';

const features = [
  {
    name: 'Understanding Alzheimer\'s',
    description: 'Learn about the causes, symptoms, and progression of Alzheimer\'s disease through comprehensive resources.',
    icon: Brain,
  },
  {
    name: 'AI Detection Methods',
    description: 'Explore how artificial intelligence and machine learning are revolutionizing early detection and diagnosis.',
    icon: Activity,
  },
  {
    name: 'Research Breakthroughs',
    description: 'Stay updated on the latest scientific discoveries and research advancements in Alzheimer\'s treatment.',
    icon: Search,
  },
];

const InfoSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-alzheimer-dark">Advancing Our Understanding</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore how technology is transforming Alzheimer's research and detection
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.name} className="border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-md bg-alzheimer-tertiary flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-alzheimer-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-alzheimer-dark">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
