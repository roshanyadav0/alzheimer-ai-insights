import React from 'react';
import { Brain, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {/* Animated Brain Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          {/* Rotating loader ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary/30 border-r-secondary/30 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading message */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{message}</h3>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Please wait...</span>
          </div>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;