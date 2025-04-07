
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';

// Sample assessment questions
const questions = [
  {
    id: 1,
    question: "How often do you find yourself forgetting recently learned information?",
    options: [
      "Rarely or never",
      "Occasionally, but it doesn't affect daily life",
      "Frequently, and it sometimes disrupts daily activities",
      "Very often, and it regularly impacts daily functioning"
    ]
  },
  {
    id: 2,
    question: "Do you have difficulty completing familiar tasks at home, work, or leisure?",
    options: [
      "No difficulties with familiar tasks",
      "Occasional minor difficulty with complex tasks",
      "Regular difficulty with tasks I used to find easy",
      "Significant trouble completing previously routine activities"
    ]
  },
  {
    id: 3,
    question: "How often do you lose track of dates, seasons, or the passage of time?",
    options: [
      "Rarely or never",
      "Occasionally mix up dates but realize quickly",
      "Frequently confused about time periods",
      "Regularly disoriented about time and place"
    ]
  },
  {
    id: 4,
    question: "Have you noticed any changes in your ability to follow a conversation or find the right word?",
    options: [
      "No changes noticed",
      "Occasionally struggle to find the right word",
      "Frequently have trouble expressing thoughts clearly",
      "Regular difficulty with vocabulary and following discussions"
    ]
  },
  {
    id: 5,
    question: "How would you rate your ability to make decisions and judgments lately?",
    options: [
      "Same as always",
      "Occasional poor decisions",
      "Frequent lapses in judgment",
      "Significant decline in decision-making ability"
    ]
  }
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ risk: string; score: number; explanation: string } | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result based on answers
      calculateResult();
    }
  };

  const calculateResult = () => {
    // Simple calculation for demo purposes
    // In a real app, this would use a more sophisticated algorithm
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    let riskLevel, explanation;

    if (score <= 4) {
      riskLevel = 'Low';
      explanation = 'Your responses indicate a low risk profile. Continue to maintain brain health with regular exercise, social engagement, and cognitive activities.';
    } else if (score <= 9) {
      riskLevel = 'Moderate';
      explanation = 'Your responses suggest some risk factors may be present. Consider consulting with a healthcare professional for a more comprehensive evaluation.';
    } else {
      riskLevel = 'Higher';
      explanation = 'Your responses indicate several cognitive concerns that should be discussed with a healthcare provider for proper evaluation and guidance.';
    }

    setResult({
      risk: riskLevel,
      score: score,
      explanation: explanation
    });

    setCurrentStep('results');
  };

  const resetAssessment = () => {
    setCurrentStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-alzheimer-dark">AI-Powered Risk Assessment</h1>
              <p className="mt-4 text-xl text-gray-600">
                Answer a few questions to receive personalized insights about your cognitive health.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Content */}
        <div className="section-container py-12">
          <Card className="max-w-3xl mx-auto border border-gray-200">
            <CardContent className="p-8">
              {currentStep === 'intro' && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-alzheimer-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info size={28} className="text-alzheimer-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-alzheimer-dark mb-4">Alzheimer's Risk Assessment</h2>
                  <p className="text-gray-600 mb-6">
                    This brief assessment will ask you about memory, cognitive function, and daily activities. Your responses will be analyzed by our AI system to provide insights about potential risk factors.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <p className="text-sm text-blue-700">
                      <strong>Important:</strong> This assessment is for informational purposes only and does not provide a medical diagnosis. Please consult with a healthcare professional for proper evaluation and advice.
                    </p>
                  </div>
                  <Button onClick={handleStartAssessment} className="bg-alzheimer-primary hover:bg-alzheimer-accent">
                    Start Assessment <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              )}

              {currentStep === 'questions' && (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
                      <span className="text-sm font-medium text-alzheimer-primary">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-alzheimer-primary h-2.5 rounded-full" 
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-alzheimer-dark mb-6">
                    {questions[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        className={`w-full text-left p-4 rounded-md border border-gray-200 hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition-colors ${
                          answers[currentQuestion] === index ? 'bg-alzheimer-tertiary border-alzheimer-primary' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'results' && result && (
                <div>
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    result.risk === 'Low' ? 'bg-green-100' : 
                    result.risk === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {result.risk === 'Low' ? (
                      <CheckCircle size={36} className="text-green-600" />
                    ) : (
                      <AlertCircle size={36} className={result.risk === 'Moderate' ? 'text-yellow-600' : 'text-red-600'} />
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-center text-alzheimer-dark mb-2">
                    {result.risk} Risk Profile
                  </h2>
                  
                  <p className="text-center text-gray-600 mb-8">
                    Based on your responses to the assessment questions
                  </p>
                  
                  <div className={`p-6 rounded-md mb-6 ${
                    result.risk === 'Low' ? 'bg-green-50 border border-green-200' : 
                    result.risk === 'Moderate' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <h3 className="font-semibold mb-2 text-alzheimer-dark">What this means:</h3>
                    <p className="text-gray-700">{result.explanation}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-alzheimer-dark">Recommended Next Steps:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-alzheimer-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Maintain regular physical exercise and a balanced diet</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-alzheimer-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Stay socially active and engage in mentally stimulating activities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={18} className="text-alzheimer-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span>Track any changes in cognitive function over time</span>
                      </li>
                      {(result.risk === 'Moderate' || result.risk === 'Higher') && (
                        <li className="flex items-start">
                          <CheckCircle size={18} className="text-alzheimer-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Schedule an appointment with a healthcare professional for a comprehensive evaluation</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={resetAssessment} variant="outline" className="border-alzheimer-primary text-alzheimer-primary">
                      Retake Assessment
                    </Button>
                    <Button className="bg-alzheimer-primary hover:bg-alzheimer-accent">
                      Get Detailed Report
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-gray-500 mt-6">
                    Remember: This assessment is for informational purposes only and does not provide a medical diagnosis.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="bg-alzheimer-light py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-alzheimer-dark mb-6">About Our Assessment</h2>
              <p className="text-gray-600 mb-8">
                Our AI risk assessment tool is built on machine learning models trained with data from thousands of clinical evaluations. It analyzes patterns in cognitive function to identify potential risk factors for Alzheimer's disease.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-alzheimer-dark mb-3">Research-Backed</h3>
                  <p className="text-sm text-gray-600">
                    Developed based on peer-reviewed research and validated clinical assessment protocols
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-alzheimer-dark mb-3">Continuously Improving</h3>
                  <p className="text-sm text-gray-600">
                    Our AI models are regularly updated with the latest research findings
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-alzheimer-dark mb-3">Privacy-Focused</h3>
                  <p className="text-sm text-gray-600">
                    Your assessment data is processed securely and never shared without consent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
