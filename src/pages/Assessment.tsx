
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, AlertCircle, Info, Download, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// Sample data for brain visualization
const brainActivityData = [
  { name: 'Region 1', normal: 85, user: 78 },
  { name: 'Region 2', normal: 90, user: 85 },
  { name: 'Region 3', normal: 88, user: 75 },
  { name: 'Region 4', normal: 92, user: 72 },
  { name: 'Region 5', normal: 86, user: 69 },
  { name: 'Region 6', normal: 90, user: 65 },
  { name: 'Region 7', normal: 94, user: 80 },
];

// Sample cognitive decline trend data
const cognitiveDeclineData = [
  { age: '50', normal: 95, mild: 90, moderate: 85, severe: 75 },
  { age: '55', normal: 92, mild: 87, moderate: 80, severe: 70 },
  { age: '60', normal: 90, mild: 82, moderate: 75, severe: 65 },
  { age: '65', normal: 87, mild: 77, moderate: 70, severe: 60 },
  { age: '70', normal: 85, mild: 72, moderate: 65, severe: 55 },
  { age: '75', normal: 82, mild: 67, moderate: 60, severe: 50 },
  { age: '80', normal: 80, mild: 62, moderate: 55, severe: 45 },
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ risk: string; score: number; explanation: string } | null>(null);
  const [showDetailedReport, setShowDetailedReport] = useState(false);

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

  const handleOpenDetailedReport = () => {
    setShowDetailedReport(true);
  };

  const handleCloseDetailedReport = () => {
    setShowDetailedReport(false);
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    alert("In a production environment, this would download a detailed PDF report of your assessment results.");
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
                    <Button onClick={handleOpenDetailedReport} className="bg-alzheimer-primary hover:bg-alzheimer-accent">
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

        {/* Detailed Report Dialog */}
        <Dialog open={showDetailedReport} onOpenChange={handleCloseDetailedReport}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-background to-muted/20">
            <DialogHeader className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border pb-6 z-10">
              <DialogTitle className="text-4xl font-bold text-foreground flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Comprehensive Assessment Report</h1>
                  <p className="text-base text-muted-foreground font-normal mt-1">
                    Detailed analysis and personalized insights for your cognitive health
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-8 space-y-10 pb-8">
              {/* Risk Assessment Summary */}
              <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Risk Assessment Summary</h2>
                </div>
                
                {result && (
                  <div className={`p-8 rounded-2xl border-2 backdrop-blur-sm ${
                    result.risk === 'Low' ? 'bg-green-50/80 border-green-200' : 
                    result.risk === 'Moderate' ? 'bg-yellow-50/80 border-yellow-200' : 'bg-red-50/80 border-red-200'
                  }`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          result.risk === 'Low' ? 'bg-green-100' : 
                          result.risk === 'Moderate' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {result.risk === 'Low' ? (
                            <CheckCircle size={32} className="text-green-600" />
                          ) : (
                            <AlertCircle size={32} className={`${result.risk === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{result.risk} Risk Profile</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Assessment Score: <strong>{result.score}/{questions.length * 3}</strong></span>
                            <span>•</span>
                            <span>Completed: <strong>{new Date().toLocaleDateString()}</strong></span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-6 py-3 rounded-full text-lg font-bold shadow-sm ${
                        result.risk === 'Low' ? 'bg-green-100 text-green-800 border border-green-300' : 
                        result.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {result.risk} Risk
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Clinical Interpretation:</h4>
                      <p className="text-gray-700 leading-relaxed text-base">{result.explanation}</p>
                    </div>
                  </div>
                )}
              </section>
              
              {/* Brain Activity Visualization */}
              <section className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Brain Activity Analysis</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    This visualization compares your estimated brain activity patterns based on assessment responses to typical baseline activity levels across different cognitive regions.
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="bg-muted/30 rounded-xl p-6 mb-8 border border-border">
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">Typical Activity Range</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">Your Estimated Activity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-96 w-full bg-gradient-to-t from-muted/10 to-transparent rounded-xl p-4">
                    <ChartContainer 
                      config={{
                        normal: { label: "Typical Activity", color: "#8B5CF6" },
                        user: { label: "Your Estimated Activity", color: "#F97316" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={brainActivityData}
                          margin={{ top: 30, right: 40, left: 30, bottom: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.6} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#6B7280"
                            fontSize={14}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="#6B7280"
                            fontSize={14}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="normal" 
                            stroke="#8B5CF6" 
                            fill="#8B5CF6" 
                            fillOpacity={0.3}
                            strokeWidth={3}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="user" 
                            stroke="#F97316" 
                            fill="#F97316" 
                            fillOpacity={0.3}
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </section>
              
              {/* Cognitive Decline Trajectory */}
              <section className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-8 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Cognitive Health Trajectory</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    This predictive model shows potential cognitive health trajectories over time based on different risk profiles and current assessment patterns.
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="bg-muted/30 rounded-xl p-6 mb-8 border border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">No Risk</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">Low Risk</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">Moderate Risk</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-foreground">High Risk</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-96 w-full bg-gradient-to-t from-muted/10 to-transparent rounded-xl p-4">
                    <ChartContainer 
                      config={{
                        normal: { label: "No Risk", color: "#22C55E" },
                        mild: { label: "Low Risk", color: "#3B82F6" },
                        moderate: { label: "Moderate Risk", color: "#F59E0B" },
                        severe: { label: "High Risk", color: "#EF4444" },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={cognitiveDeclineData}
                          margin={{ top: 30, right: 40, left: 30, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.6} />
                          <XAxis 
                            dataKey="age" 
                            stroke="#6B7280"
                            fontSize={14}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Age', position: 'insideBottom', offset: -15, style: { fontSize: '14px', fontWeight: '600' } }}
                          />
                          <YAxis 
                            stroke="#6B7280"
                            fontSize={14}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Cognitive Function (%)', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fontWeight: '600' } }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          />
                          <Area type="monotone" dataKey="normal" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} strokeWidth={3} />
                          <Area type="monotone" dataKey="mild" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={3} />
                          <Area type="monotone" dataKey="moderate" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} strokeWidth={3} />
                          <Area type="monotone" dataKey="severe" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </section>
              
              {/* Personalized Recommendations */}
              <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Personalized Recommendations</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-4 flex-shrink-0 shadow-lg">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Cognitive Exercise</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Engage in brain-stimulating activities like puzzles, learning a new language, or playing musical instruments for at least 30 minutes daily. Consider apps like Lumosity or Peak for structured cognitive training.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 flex-shrink-0 shadow-lg">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Diet & Nutrition</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Maintain a Mediterranean-style diet rich in fruits, vegetables, whole grains, fish, and olive oil. Limit processed foods and sugar. Consider omega-3 supplements after consulting your doctor.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 flex-shrink-0 shadow-lg">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Physical Activity</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Aim for at least 150 minutes of moderate aerobic exercise weekly, complemented by strength training and balance exercises. Activities like walking, swimming, and yoga are particularly beneficial.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 flex-shrink-0 shadow-lg">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Social Engagement</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Maintain active social connections through group activities, volunteering, or regular interactions with friends and family. Consider joining clubs or community groups that align with your interests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 border-t border-border">
                <Button 
                  onClick={handleDownloadReport} 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <Download size={24} />
                  Download Complete Report
                </Button>
                <Button 
                  onClick={resetAssessment} 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary/10 px-10 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
                >
                  Take Assessment Again
                </Button>
              </div>
              
              <div className="bg-blue-50/80 border-l-4 border-blue-400 p-6 rounded-r-xl backdrop-blur-sm">
                <p className="text-blue-700 leading-relaxed">
                  <strong>Disclaimer:</strong> This assessment is for informational purposes only and does not constitute medical advice. Please consult with a qualified healthcare professional for proper evaluation, diagnosis, and treatment recommendations.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
