
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssessmentCTA = () => {
  return (
    <div className="py-16 bg-white">
      <div className="section-container">
        <div className="bg-gradient-to-r from-alzheimer-primary to-alzheimer-secondary rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold text-white">Take the AI-Powered Risk Assessment</h2>
              <p className="mt-4 text-lg text-white opacity-90">
                Our cutting-edge assessment tool evaluates multiple risk factors to provide personalized insights about your cognitive health.
              </p>
              
              <ul className="mt-6 space-y-2">
                {['Powered by advanced AI algorithms', 'Takes only 5 minutes to complete', 'Provides personalized recommendations'].map((item, index) => (
                  <li key={index} className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 mr-2 text-alzheimer-tertiary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild className="mt-8 bg-white text-alzheimer-primary hover:bg-alzheimer-tertiary">
                <Link to="/assessment">
                  Start Assessment
                </Link>
              </Button>
              
              <p className="mt-4 text-sm text-white opacity-75">
                Note: This assessment is for informational purposes only and does not constitute medical advice.
              </p>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Doctor with patient" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg max-w-xs">
                  <p className="text-alzheimer-dark text-sm md:text-base font-medium">
                    "Early detection can make a significant difference in managing Alzheimer's disease and planning for the future."
                  </p>
                  <p className="mt-2 text-alzheimer-primary text-xs md:text-sm font-semibold">
                    - National Institute on Aging
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCTA;
