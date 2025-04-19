
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, SendHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: { message: userMessage }
      });

      if (error) throw error;

      const aiResponse = data.response;
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
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
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
