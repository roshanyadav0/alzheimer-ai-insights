
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, BarChart2, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: "Deep Learning for Early Detection",
      description: "Our convolutional neural network achieves 92% accuracy in detecting early signs of Alzheimer's from brain MRI scans, a significant improvement over traditional methods.",
      icon: <Brain className="h-8 w-8 text-alzheimer-primary" />,
      link: "/research/deep-learning"
    },
    {
      id: 2,
      title: "Speech Pattern Analysis",
      description: "Using natural language processing, we've developed algorithms that can identify subtle changes in speech patterns associated with cognitive decline.",
      icon: <BarChart2 className="h-8 w-8 text-alzheimer-primary" />,
      link: "/research/speech-analysis"
    },
    {
      id: 3,
      title: "Multi-modal Biomarker Integration",
      description: "Our research combines imaging, genetic, and clinical data to create a more comprehensive risk assessment framework for personalized medicine approaches.",
      icon: <FileText className="h-8 w-8 text-alzheimer-primary" />,
      link: "/research/biomarkers"
    }
  ];

  return (
    <div className="py-16 bg-alzheimer-light">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-alzheimer-dark">Research Highlights</h2>
          <p className="mt-4 text-xl text-gray-500">
            Exploring cutting-edge AI approaches to Alzheimer's detection and diagnosis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <Card key={item.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-alzheimer-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">
                  {item.description}
                </p>
                <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary">
                  <Link to={item.link} className="flex items-center">
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-alzheimer-primary hover:bg-alzheimer-accent">
            <Link to="/research" className="flex items-center">
              View All Research <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResearchHighlights;
