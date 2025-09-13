
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, SendHorizontal, AlertCircle, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AIResponseCard from './AIResponseCard';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant' | 'system', content: string, timestamp?: Date }>>([
    { role: 'assistant', content: "Hello! I'm your AI assistant specialized in Alzheimer's research. How can I help you today?", timestamp: new Date() }
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
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

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
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error with AI chat:', error);
      setHasError(true);
      setChatHistory(prev => [...prev, { 
        role: 'system', 
        content: "I'm sorry, I encountered a technical issue. Please try again in a moment.",
        timestamp: new Date()
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
    <Card className="w-full max-w-5xl mx-auto shadow-lg border-0 bg-transparent">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Alzheimer's Research AI Assistant</h2>
            <p className="text-sm text-muted-foreground font-normal">Get expert insights on Alzheimer's research and care</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
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
            className="h-[600px] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          >
            {chatHistory.map((msg, index) => (
              <div key={index} className="space-y-4">
                {msg.role === 'user' && (
                  <div className="flex items-start gap-3 justify-end">
                    <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.timestamp && (
                        <p className="text-xs opacity-75 mt-2">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                {msg.role === 'assistant' && (
                  <div className="max-w-[90%]">
                    <AIResponseCard content={msg.content} timestamp={msg.timestamp} />
                  </div>
                )}
                
                {msg.role === 'system' && (
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-3 max-w-[80%]">
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="max-w-[90%]">
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        <span className="text-sm text-muted-foreground ml-2">AI is analyzing your question...</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {hasError && (
              <Button 
                variant="outline" 
                onClick={retryConnection}
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <AlertCircle className="w-4 h-4 mr-2" /> Retry Connection
              </Button>
            )}
            
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <div className="flex-grow space-y-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about Alzheimer's research, symptoms, treatments, or care strategies..."
                  className="min-h-[60px] resize-none border-2 focus:border-primary/50 rounded-xl"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !message.trim()}
                className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <SendHorizontal className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
