
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, SendHorizontal, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant' | 'system', content: string }>>([
    { role: 'assistant', content: "Hello! I'm your AI assistant specialized in Alzheimer's research. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
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
    setHasError(false);
    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      console.log('Sending message to Gemini API via Supabase Edge Function...');
      
      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data || !data.response) {
        console.error('Invalid response format:', data);
        throw new Error('Received invalid response format from the AI service');
      }

      const aiResponse = data.response;
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error with AI chat:', error);
      setHasError(true);
      setChatHistory(prev => [...prev, { 
        role: 'system', 
        content: "I'm sorry, I encountered a technical issue. Please try again in a moment." 
      }]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to the AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const retryConnection = () => {
    // Remove the error message
    setChatHistory(prev => prev.filter(msg => msg.role !== 'system'));
    setHasError(false);
    toast({
      title: "Reconnecting",
      description: "Attempting to reconnect to the AI service...",
      variant: "default",
    });
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
          {hasError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Connection to AI service failed. Please check your internet connection and try again.
              </AlertDescription>
            </Alert>
          )}
          
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
                    : msg.role === 'system'
                    ? 'bg-red-50 border-red-200 border text-red-800 mr-auto max-w-[80%] flex items-center'
                    : 'bg-white mr-auto max-w-[80%] border shadow-sm'
                }`}
              >
                {msg.role === 'system' && (
                  <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                )}
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
          {hasError && (
            <Button 
              variant="outline" 
              onClick={retryConnection}
              className="w-full mb-2 border-red-300 text-red-700 hover:bg-red-50"
            >
              <AlertCircle className="w-4 h-4 mr-2" /> Retry Connection
            </Button>
          )}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
