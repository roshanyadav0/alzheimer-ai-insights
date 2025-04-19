
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Bot, SendHorizontal } from 'lucide-react';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: "Hello! I'm your AI assistant specialized in Alzheimer's research. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Simulate AI response - In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a response based on the user's query
      let aiResponse = "";
      const query = userMessage.toLowerCase();
      
      if (query.includes("what is alzheimer")) {
        aiResponse = "Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. It's the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently.";
      } else if (query.includes("symptom")) {
        aiResponse = "Early symptoms of Alzheimer's disease include memory problems, particularly remembering recent events, confusion, disorientation, trouble with speech, difficulty performing familiar tasks, and changes in personality or mood.";
      } else if (query.includes("treatment") || query.includes("cure")) {
        aiResponse = "While there's no cure for Alzheimer's disease yet, several medications can help manage symptoms. These include cholinesterase inhibitors like donepezil, rivastigmine, and galantamine, and memantine. Researchers are actively working on developing more effective treatments.";
      } else if (query.includes("prevention") || query.includes("reduce risk")) {
        aiResponse = "You may help reduce your risk of Alzheimer's by exercising regularly, eating a diet rich in fruits and vegetables, maintaining social connections, keeping your mind active, managing cardiovascular health, and getting quality sleep.";
      } else if (query.includes("research") || query.includes("study")) {
        aiResponse = "Current Alzheimer's research focuses on early detection through biomarkers, understanding genetic risk factors, exploring the role of inflammation and the immune system, investigating tau and amyloid proteins, and testing potential new treatments including immunotherapies.";
      } else {
        aiResponse = "I'm an AI assistant specialized in Alzheimer's research. I can help answer questions about symptoms, diagnosis, treatments, prevention strategies, and current research. Could you please provide more specific details about what you'd like to know?";
      }
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-alzheimer-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-alzheimer-primary" />
          Alzheimer's Research AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div 
            ref={chatContainerRef}
            className="h-[400px] overflow-y-auto p-4 space-y-4 mb-4 border rounded-lg bg-gray-50"
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-alzheimer-primary/10 ml-auto max-w-[80%] text-right'
                    : 'bg-white mr-auto max-w-[80%] border shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white p-3 rounded-lg mr-auto max-w-[80%] border shadow-sm">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-alzheimer-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-alzheimer-primary rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-alzheimer-primary rounded-full animate-pulse delay-150"></div>
                  <span className="text-sm text-gray-500">AI is typing...</span>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about Alzheimer's..."
              className="flex-grow resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-alzheimer-primary hover:bg-alzheimer-accent self-end"
            >
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 text-center">
            This is a simulated AI assistant. In a production environment, 
            this would be connected to a real AI service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
