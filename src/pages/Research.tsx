
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, ArrowRight, Brain, BarChart2, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const Research = () => {
  const [activeTab, setActiveTab] = useState('publications');
  
  const publications = [
    {
      id: 1,
      title: "Deep Learning Approaches for Early Detection of Alzheimer's Disease",
      authors: "Chen, L., Singh, R., Patel, K., & Johnson, M.",
      journal: "Journal of Computational Neuroscience",
      year: 2025,
      abstract: "In this study, we present a novel deep learning architecture that integrates convolutional neural networks with transformer models to analyze longitudinal MRI data. Our approach achieves a 92% accuracy in detecting early signs of Alzheimer's disease, significantly outperforming traditional machine learning methods.",
      link: "#"
    },
    {
      id: 2,
      title: "Speech Pattern Analysis for Cognitive Decline Detection",
      authors: "Taylor, A., Gupta, S., & Williams, E.",
      journal: "IEEE Transactions on Biomedical Engineering",
      year: 2024,
      abstract: "We demonstrate a natural language processing framework that analyzes subtle changes in speech patterns associated with cognitive decline. By tracking linguistic features such as syntactic complexity, semantic coherence, and pause distribution, our model can identify mild cognitive impairment with 87% sensitivity and 89% specificity.",
      link: "#"
    },
    {
      id: 3,
      title: "Multimodal Biomarker Integration for Personalized Alzheimer's Risk Assessment",
      authors: "Rodriguez, J., Kim, H., & Brown, T.",
      journal: "Nature Machine Intelligence",
      year: 2024,
      abstract: "This paper presents a novel approach to Alzheimer's risk assessment that integrates imaging biomarkers, genetic profiles, clinical history, and cognitive test performance. Our hierarchical Bayesian model provides personalized risk stratification and has been validated in a prospective cohort study involving 1,200 participants.",
      link: "#"
    }
  ];
  
  const datasets = [
    {
      id: 1,
      title: "Longitudinal Brain MRI Dataset",
      description: "A collection of 5,000+ MRI scans from 1,200 patients over a 10-year period, including those who progressed from healthy to mild cognitive impairment to Alzheimer's disease.",
      size: "2.3 TB",
      samples: 5000,
      features: ["T1-weighted MRI", "T2-weighted MRI", "FLAIR sequences", "Cognitive assessment scores"],
      link: "#"
    },
    {
      id: 2,
      title: "Speech and Language Corpus",
      description: "Audio recordings and transcriptions from 800 participants performing various verbal tasks, including picture description, story recall, and spontaneous speech.",
      size: "450 GB",
      samples: 3200,
      features: ["Raw audio", "Transcriptions", "Acoustic features", "Linguistic annotations"],
      link: "#"
    },
    {
      id: 3,
      title: "Multimodal Alzheimer's Biomarker Database",
      description: "A comprehensive database combining imaging, genetic, clinical, and cognitive data from 1,500 individuals across different stages of cognitive health.",
      size: "1.8 TB",
      samples: 1500,
      features: ["MRI data", "PET scans", "Genetic profiles", "Clinical history", "Cognitive assessments"],
      link: "#"
    }
  ];
  
  const tools = [
    {
      id: 1,
      title: "BrainScan-AI",
      description: "An open-source tool for automated processing and analysis of brain MRI scans using our pre-trained deep learning models.",
      type: "Python package",
      features: ["Automated segmentation", "Feature extraction", "Anomaly detection", "Longitudinal analysis"],
      link: "#"
    },
    {
      id: 2,
      title: "CogniSpeech Analyzer",
      description: "A web-based platform for analyzing speech patterns to detect subtle signs of cognitive decline.",
      type: "Web application",
      features: ["Speech recognition", "Linguistic feature extraction", "Temporal pattern analysis", "Risk score generation"],
      link: "#"
    },
    {
      id: 3,
      title: "AlzPredict API",
      description: "A comprehensive API that integrates multiple biomarkers to provide personalized Alzheimer's risk assessment.",
      type: "REST API",
      features: ["Multimodal data integration", "Personalized risk scores", "Longitudinal tracking", "Clinical decision support"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-alzheimer-dark">Research & Resources</h1>
              <p className="mt-4 text-xl text-gray-600">
                Explore our publications, datasets, and tools advancing Alzheimer's detection through artificial intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Featured Paper */}
        <div className="bg-white py-12">
          <div className="section-container">
            <div className="bg-gradient-to-r from-alzheimer-light to-alzheimer-tertiary rounded-lg p-6 md:p-8 lg:p-10">
              <div className="md:flex items-center">
                <div className="md:w-3/4 md:pr-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-alzheimer-primary text-white rounded-full">
                      Featured Paper
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      2025
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-alzheimer-dark mb-4">
                    Comprehensive Review: AI Applications in Alzheimer's Detection and Diagnosis
                  </h2>
                  <p className="text-gray-700 mb-6">
                    This comprehensive review explores the current state of artificial intelligence applications in Alzheimer's disease detection, highlighting promising approaches, challenges, and future directions. The paper covers deep learning techniques for image analysis, speech and language processing methods, multimodal data integration, and ethical considerations.
                  </p>
                  <Button className="bg-alzheimer-primary hover:bg-alzheimer-accent flex items-center">
                    <Download size={16} className="mr-2" />
                    Download Review Paper
                  </Button>
                </div>
                <div className="md:w-1/4 mt-6 md:mt-0">
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <FileText size={48} className="text-alzheimer-primary mx-auto mb-4" />
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Published in</p>
                      <p className="font-medium text-alzheimer-dark mb-3">Nature Reviews Neuroscience</p>
                      <p className="text-sm text-gray-500 mb-1">Citation Impact</p>
                      <p className="font-medium text-alzheimer-primary">52 citations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Research Tabs */}
        <div className="section-container py-12">
          <Tabs defaultValue="publications" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="publications" className="px-6">Publications</TabsTrigger>
                <TabsTrigger value="datasets" className="px-6">Datasets</TabsTrigger>
                <TabsTrigger value="tools" className="px-6">Tools & Software</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Publications Tab */}
            <TabsContent value="publications">
              <div className="grid gap-6">
                {publications.map((pub) => (
                  <Card key={pub.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-alzheimer-dark mb-2">
                        {pub.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {pub.authors} • {pub.journal} • {pub.year}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {pub.abstract}
                      </p>
                      <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary">
                        <Link to={pub.link} className="flex items-center">
                          Read Full Paper <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Datasets Tab */}
            <TabsContent value="datasets">
              <div className="grid gap-6">
                {datasets.map((dataset) => (
                  <Card key={dataset.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="mr-6">
                          <Database className="h-8 w-8 text-alzheimer-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-alzheimer-dark mb-2">
                            {dataset.title}
                          </h3>
                          <p className="text-gray-700 mb-4">
                            {dataset.description}
                          </p>
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Size</p>
                              <p className="font-medium">{dataset.size}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Samples</p>
                              <p className="font-medium">{dataset.samples}</p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Features</p>
                            <div className="flex flex-wrap gap-2">
                              {dataset.features.map((feature, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-1 bg-alzheimer-tertiary text-alzheimer-primary text-xs font-medium rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary">
                            <Link to={dataset.link} className="flex items-center">
                              Access Dataset <ArrowRight size={16} className="ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Tools Tab */}
            <TabsContent value="tools">
              <div className="grid md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                  <Card key={tool.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-alzheimer-dark mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-alzheimer-primary text-sm mb-3">{tool.type}</p>
                      <p className="text-gray-700 mb-4">
                        {tool.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Key Features</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {tool.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <Button asChild variant="outline" className="border-alzheimer-primary text-alzheimer-primary">
                        <Link to={tool.link} className="flex items-center">
                          Explore Tool <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to Action */}
        <div className="bg-alzheimer-primary py-16">
          <div className="section-container text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Collaborate With Us</h2>
              <p className="text-white text-opacity-90 mb-6">
                We're always looking for researchers, institutions, and organizations to collaborate on advancing AI applications for Alzheimer's detection and diagnosis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-alzheimer-primary hover:bg-alzheimer-tertiary">
                  Research Opportunities
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-alzheimer-primary">
                  Contact Research Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
