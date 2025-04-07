
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchHighlights = () => {
  const papers = [
    {
      id: 1,
      title: 'Deep Learning for Alzheimer's Detection from MRI Scans',
      authors: 'Johnson, Smith, et al.',
      journal: 'Neural Computation in Medicine',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      summary: 'This study explores using convolutional neural networks to identify early signs of Alzheimer\'s disease from MRI brain scans with 94% accuracy.'
    },
    {
      id: 2,
      title: 'Predictive Modeling for Alzheimer's Progression',
      authors: 'Williams, Garcia, et al.',
      journal: 'AI in Healthcare',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      summary: 'A machine learning approach for predicting the progression of Alzheimer\'s disease across different stages using multimodal data.'
    },
    {
      id: 3,
      title: 'Speech Pattern Analysis for Early Detection',
      authors: 'Lee, Brown, et al.',
      journal: 'Computational Linguistics in Medicine',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1522152302542-71a8e5172aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      summary: 'Analyzing linguistic patterns and speech characteristics to detect subtle cognitive changes indicative of early-stage Alzheimer\'s.'
    }
  ];

  return (
    <div className="py-16 bg-alzheimer-light">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-alzheimer-dark">Featured Research</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Highlighting groundbreaking studies in Alzheimer's detection using AI
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/research" className="flex items-center">
              View All Research
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {papers.map((paper) => (
            <Card key={paper.id} className="border border-gray-200 overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={paper.image} 
                  alt={paper.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-sm text-alzheimer-secondary font-medium">
                    {paper.journal} • {paper.year}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-alzheimer-dark">{paper.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{paper.authors}</p>
                  <p className="mt-3 text-sm text-gray-500">{paper.summary}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">DOI: 10.1234/alz.2023.{paper.id}</span>
                  <Button variant="ghost" size="sm" className="flex items-center text-alzheimer-primary">
                    <Download size={16} className="mr-1" /> PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchHighlights;
