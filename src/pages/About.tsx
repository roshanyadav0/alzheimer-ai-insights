
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Brain, Database, PieChart, MicroscopeIcon } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-alzheimer-dark">About Alzheimer's Disease</h1>
              <p className="mt-6 text-xl text-gray-600">
                Understanding the disease, its impact, and how technology is transforming detection and research.
              </p>
            </div>
          </div>
        </div>

        {/* What is Alzheimer's */}
        <div className="section-container py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-alzheimer-dark mb-6">What is Alzheimer's Disease?</h2>
              <p className="text-gray-600 mb-4">
                Alzheimer's disease is a progressive neurological disorder that causes brain cells to degenerate and die. It's the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently.
              </p>
              <p className="text-gray-600 mb-4">
                The early signs of the disease include forgetting recent events or conversations. As the disease progresses, a person with Alzheimer's disease will develop severe memory impairment and lose the ability to carry out everyday tasks.
              </p>
              <p className="text-gray-600">
                While current Alzheimer's treatments cannot stop the progression of the disease, they can temporarily slow the worsening of symptoms and improve quality of life.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-alzheimer-primary/20 to-alzheimer-secondary/20 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Brain neural network visualization" 
                className="relative z-10 rounded-2xl shadow-lg w-full object-cover transform -rotate-3"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-alzheimer-light py-16">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-alzheimer-dark mb-12 text-center">The Impact of Alzheimer's</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-alzheimer-primary mb-2">50+</div>
                <div className="text-lg text-alzheimer-dark font-medium">Million</div>
                <div className="text-gray-500 mt-2">People worldwide living with dementia</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-alzheimer-primary mb-2">60-80%</div>
                <div className="text-lg text-alzheimer-dark font-medium">of Cases</div>
                <div className="text-gray-500 mt-2">Are caused by Alzheimer's disease</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-alzheimer-primary mb-2">$305</div>
                <div className="text-lg text-alzheimer-dark font-medium">Billion</div>
                <div className="text-gray-500 mt-2">Annual cost of care in the US alone</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-alzheimer-primary mb-2">16+</div>
                <div className="text-lg text-alzheimer-dark font-medium">Million</div>
                <div className="text-gray-500 mt-2">Family members providing unpaid care</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI & ML in Detection */}
        <div id="ai-ml" className="section-container py-16">
          <h2 className="text-3xl font-bold text-alzheimer-dark mb-12 text-center">AI & ML in Alzheimer's Detection</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold text-alzheimer-dark mb-4">Transforming Early Diagnosis</h3>
              <p className="text-gray-600 mb-4">
                Artificial Intelligence and Machine Learning are revolutionizing how we detect Alzheimer's disease, enabling diagnosis years before traditional symptoms appear. These technologies analyze patterns in data that would be impossible for humans to detect.
              </p>
              <p className="text-gray-600 mb-4">
                Early detection is critical as treatments are most effective when started before significant brain damage occurs. AI tools can identify subtle changes in brain scans, speech patterns, writing samples, and even retinal images.
              </p>
              <p className="text-gray-600">
                The application of these technologies has already demonstrated accuracy rates exceeding 90% in research settings, significantly outperforming traditional diagnostic methods.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <Brain size={280} className="mx-auto text-alzheimer-primary opacity-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-3xl font-bold text-alzheimer-primary mb-2">94%</p>
                  <p className="text-lg font-medium text-alzheimer-dark">Accuracy in early detection</p>
                  <p className="text-sm text-gray-500 mt-2">Using advanced AI algorithms</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="rounded-full bg-alzheimer-tertiary p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Database size={24} className="text-alzheimer-primary" />
              </div>
              <h4 className="text-xl font-semibold text-alzheimer-dark mb-3">Big Data Analysis</h4>
              <p className="text-gray-600">
                ML algorithms analyze vast datasets from medical records, genetic information, and imaging studies to identify patterns and biomarkers associated with Alzheimer's.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="rounded-full bg-alzheimer-tertiary p-3 w-12 h-12 flex items-center justify-center mb-4">
                <PieChart size={24} className="text-alzheimer-primary" />
              </div>
              <h4 className="text-xl font-semibold text-alzheimer-dark mb-3">Predictive Modeling</h4>
              <p className="text-gray-600">
                Advanced algorithms predict disease progression and response to treatments, helping doctors develop personalized care plans for patients.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="rounded-full bg-alzheimer-tertiary p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MicroscopeIcon size={24} className="text-alzheimer-primary" />
              </div>
              <h4 className="text-xl font-semibold text-alzheimer-dark mb-3">Research Acceleration</h4>
              <p className="text-gray-600">
                AI speeds up the research process by identifying promising drug candidates and helping scientists better understand the complex mechanisms of the disease.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-alzheimer-primary py-16">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join the Fight Against Alzheimer's</h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Help advance research and improve detection by participating in studies, supporting research initiatives, or staying informed about the latest developments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-alzheimer-primary hover:bg-alzheimer-tertiary">
                <a href="https://www.alz.org/alzheimers-dementia/research_progress/clinical-trials" target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-base">
                  Participate in Research
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="https://www.alz.org/help-support/resources/donate" target="_blank" rel="noopener noreferrer" className="px-8 py-3 text-base">
                  Support the Cause
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
