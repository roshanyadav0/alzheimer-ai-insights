
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Filter, Search, SortDesc, BookOpen } from 'lucide-react';

const Research = () => {
  // Sample research papers data
  const papers = [
    {
      id: 1,
      title: 'Deep Learning for Alzheimer\'s Detection from MRI Scans',
      authors: 'Johnson, Smith, et al.',
      journal: 'Neural Computation in Medicine',
      year: 2023,
      abstract: 'This study explores using convolutional neural networks to identify early signs of Alzheimer\'s disease from MRI brain scans with 94% accuracy. The model was trained on a dataset of over 10,000 MRI scans and validated against clinical diagnoses.',
      tags: ['Deep Learning', 'MRI', 'Early Detection'],
      citations: 87,
      category: 'Imaging Analysis'
    },
    {
      id: 2,
      title: 'Predictive Modeling for Alzheimer\'s Progression',
      authors: 'Williams, Garcia, et al.',
      journal: 'AI in Healthcare',
      year: 2023,
      abstract: 'A machine learning approach for predicting the progression of Alzheimer\'s disease across different stages using multimodal data. The model incorporates cognitive assessments, biomarkers, and imaging data to forecast disease trajectory with high precision.',
      tags: ['Machine Learning', 'Disease Progression', 'Predictive Modeling'],
      citations: 63,
      category: 'Predictive Analytics'
    },
    {
      id: 3,
      title: 'Speech Pattern Analysis for Early Detection',
      authors: 'Lee, Brown, et al.',
      journal: 'Computational Linguistics in Medicine',
      year: 2022,
      abstract: 'Analyzing linguistic patterns and speech characteristics to detect subtle cognitive changes indicative of early-stage Alzheimer\'s. This research demonstrates how natural language processing can identify cognitive decline before traditional screening methods.',
      tags: ['NLP', 'Speech Analysis', 'Early Detection'],
      citations: 42,
      category: 'Language Processing'
    },
    {
      id: 4,
      title: 'Multi-Modal Deep Learning for Alzheimer\'s Diagnosis',
      authors: 'Chen, Rodriguez, et al.',
      journal: 'Frontiers in Neural Engineering',
      year: 2023,
      abstract: 'This paper presents a novel multi-modal deep learning approach that combines imaging, genetic, and clinical data to improve diagnostic accuracy for Alzheimer\'s disease. The integrated model outperforms single-modality approaches.',
      tags: ['Multi-modal', 'Deep Learning', 'Diagnostics'],
      citations: 56,
      category: 'Integrated AI'
    },
    {
      id: 5,
      title: 'Retinal Imaging Biomarkers for Alzheimer\'s Detection',
      authors: 'Patel, Kim, et al.',
      journal: 'Digital Ophthalmology',
      year: 2023,
      abstract: 'An investigation into using retinal imaging combined with deep learning to identify early biomarkers of Alzheimer\'s disease. The study demonstrates that retinal changes can be detected and analyzed using AI to predict cognitive decline.',
      tags: ['Retinal Imaging', 'Biomarkers', 'Computer Vision'],
      citations: 29,
      category: 'Novel Biomarkers'
    },
    {
      id: 6,
      title: 'Explainable AI for Clinical Decision Support in Alzheimer\'s Care',
      authors: 'Thompson, Wilson, et al.',
      journal: 'Medical AI Ethics',
      year: 2022,
      abstract: 'Developing transparent AI models that provide clinicians with interpretable results for Alzheimer\'s diagnosis. This research focuses on making complex AI predictions understandable to healthcare providers for better clinical decision-making.',
      tags: ['Explainable AI', 'Clinical Support', 'Ethics'],
      citations: 38,
      category: 'Clinical Applications'
    }
  ];

  // Comprehensive review paper for download
  const reviewPaper = {
    title: 'Comprehensive Review: Artificial Intelligence in Alzheimer's Detection and Research (2023)',
    authors: 'AlzInsight Research Consortium',
    pages: 42,
    abstract: 'This comprehensive review examines the state-of-the-art applications of artificial intelligence in Alzheimer's disease detection, diagnosis, and research. We analyze over 200 peer-reviewed studies from the last decade, highlighting breakthrough technologies, methodological approaches, and clinical implications.'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-alzheimer-dark">Research Findings</h1>
              <p className="mt-6 text-xl text-gray-600">
                Explore cutting-edge studies on AI and ML applications in Alzheimer's detection and research.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Review Paper */}
        <div className="section-container py-12">
          <Card className="border-2 border-alzheimer-tertiary overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-alzheimer-primary to-alzheimer-secondary p-6 text-white">
                <div className="flex items-center mb-3">
                  <BookOpen className="mr-2" />
                  <span className="font-medium">Featured Review Paper</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{reviewPaper.title}</h2>
                <p className="text-sm opacity-90">{reviewPaper.authors} • {reviewPaper.pages} pages</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{reviewPaper.abstract}</p>
                <Button className="bg-alzheimer-primary hover:bg-alzheimer-accent flex items-center">
                  <Download size={16} className="mr-2" /> Download Full Paper (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Papers Section */}
        <div className="section-container py-12">
          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search research papers..."
                className="pl-10 py-2 pr-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-alzheimer-primary"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
              <Button variant="outline" className="flex items-center">
                <SortDesc size={16} className="mr-2" /> Sort by: Newest
              </Button>
            </div>
          </div>
          
          {/* Research Papers Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {papers.map((paper) => (
              <Card key={paper.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-alzheimer-dark">{paper.title}</h3>
                      <p className="text-sm text-gray-600">{paper.authors} • {paper.journal}, {paper.year}</p>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-alzheimer-tertiary text-alzheimer-primary rounded-full">
                      {paper.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{paper.abstract}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tags.map((tag, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Citations: {paper.citations}</span>
                    <Button variant="ghost" size="sm" className="flex items-center text-alzheimer-primary">
                      <Download size={16} className="mr-1" /> PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-alzheimer-primary text-white hover:bg-alzheimer-accent">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">
                8
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        </div>

        {/* Research Collaboration CTA */}
        <div className="bg-alzheimer-light py-16">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold text-alzheimer-dark mb-6">Interested in Research Collaboration?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our network of researchers and institutions working to advance Alzheimer's detection and treatment through AI and machine learning.
            </p>
            <Button className="bg-alzheimer-primary hover:bg-alzheimer-accent text-white px-8 py-3 text-base">
              Connect with Researchers
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
