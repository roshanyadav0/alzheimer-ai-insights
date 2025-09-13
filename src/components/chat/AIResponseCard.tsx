import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, Info, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface AIResponseCardProps {
  content: string;
  timestamp?: Date;
}

const AIResponseCard = ({ content, timestamp }: AIResponseCardProps) => {
  // Parse content to identify different types of information
  const parseContent = (text: string) => {
    const sections = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentSection = { type: 'general', content: [] as string[] };
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check for section headers
      if (trimmedLine.match(/^(symptoms?|treatment|prevention|research|risk|diagnosis|medication)/i)) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { 
          type: trimmedLine.toLowerCase().includes('symptom') ? 'symptoms' :
                trimmedLine.toLowerCase().includes('treatment') ? 'treatment' :
                trimmedLine.toLowerCase().includes('prevention') ? 'prevention' :
                trimmedLine.toLowerCase().includes('research') ? 'research' :
                trimmedLine.toLowerCase().includes('risk') ? 'risk' :
                trimmedLine.toLowerCase().includes('diagnosis') ? 'diagnosis' :
                trimmedLine.toLowerCase().includes('medication') ? 'medication' : 'general',
          content: [trimmedLine]
        };
      } else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.match(/^\d+\./)) {
        // List items
        currentSection.content.push(trimmedLine);
      } else if (trimmedLine.length > 0) {
        currentSection.content.push(trimmedLine);
      }
    }
    
    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }
    
    return sections.length > 0 ? sections : [{ type: 'general', content: [text] }];
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'symptoms': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'treatment': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'prevention': return <Lightbulb className="w-5 h-5 text-blue-500" />;
      case 'research': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'risk': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'diagnosis': return <Info className="w-5 h-5 text-indigo-500" />;
      case 'medication': return <CheckCircle className="w-5 h-5 text-teal-500" />;
      default: return <Bot className="w-5 h-5 text-primary" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'symptoms': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'treatment': return 'bg-green-100 text-green-800 border-green-200';
      case 'prevention': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'risk': return 'bg-red-100 text-red-800 border-red-200';
      case 'diagnosis': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'medication': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sections = parseContent(content);

  return (
    <Card className="w-full max-w-none bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sm text-primary">AI Assistant</span>
          </div>
          {timestamp && (
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString()}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="space-y-2">
            {section.type !== 'general' && (
              <div className="flex items-center gap-2 mb-2">
                {getIconForType(section.type)}
                <Badge 
                  variant="outline" 
                  className={`text-xs font-medium ${getBadgeColor(section.type)}`}
                >
                  {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                </Badge>
              </div>
            )}
            
            <div className="space-y-2">
              {section.content.map((item, itemIndex) => {
                const isListItem = item.startsWith('•') || item.startsWith('-') || item.match(/^\d+\./);
                
                return (
                  <div 
                    key={itemIndex}
                    className={`${isListItem ? 'ml-4' : ''} text-sm leading-relaxed text-foreground/90`}
                  >
                    {isListItem ? (
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item.replace(/^[•\-]|\d+\./, '').trim()}</span>
                      </div>
                    ) : itemIndex === 0 && section.type !== 'general' ? (
                      <h4 className="font-semibold text-foreground mb-1">{item}</h4>
                    ) : (
                      <p className="text-foreground/90">{item}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIResponseCard;