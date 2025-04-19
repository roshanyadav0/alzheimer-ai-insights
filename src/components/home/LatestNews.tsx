import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
}

const LatestNews = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-news');
      
      if (error) throw error;
      
      setNews(data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error fetching news",
        description: "Failed to load latest news. Using fallback data.",
        variant: "destructive",
      });
      // Keep using the sample data as fallback
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(news.map(item => item.category)));
  
  // Filter news based on active category
  const filteredNews = activeCategory 
    ? news.filter(item => item.category === activeCategory) 
    : news;

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="section-container">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-alzheimer-primary mx-auto" />
              <p className="mt-4 text-lg text-gray-600">Loading latest news...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-alzheimer-dark">Latest News</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Stay updated with the latest breakthroughs in Alzheimer's research
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/news" className="flex items-center">
              All News <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        {/* Category filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              className={activeCategory === null ? "bg-alzheimer-primary hover:bg-alzheimer-accent" : ""}
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                className={activeCategory === category ? "bg-alzheimer-primary hover:bg-alzheimer-accent" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredNews.map((item) => (
            <Card key={item.id} className="border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-alzheimer-tertiary text-alzheimer-primary rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <h3 className="font-semibold text-alzheimer-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
                </div>
                <Link to={`/news/${item.id}`} className="mt-4 text-sm font-medium text-alzheimer-primary flex items-center hover:underline">
                  Read more <ArrowRight size={14} className="ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
