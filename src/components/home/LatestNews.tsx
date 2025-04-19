
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import NewsCard from './NewsCard';
import CategoryFilter from './CategoryFilter';
import NewsLoadingState from './NewsLoadingState';

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
      console.log('Fetching news via Supabase Edge Function...');
      
      const { data, error } = await supabase.functions.invoke('fetch-news');
      
      if (error) {
        throw error;
      }
      
      if (data.usingFallback) {
        console.log('Using fallback data due to API issue:', data.error);
        toast({
          title: "Using sample news data",
          description: "Could not connect to news service. Using fallback data instead.",
          variant: "warning",
        });
      }
      
      setNews(data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error fetching news",
        description: "Failed to load latest news. Using fallback data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(news.map(item => item.category)));
  const filteredNews = activeCategory 
    ? news.filter(item => item.category === activeCategory) 
    : news;

  if (isLoading) {
    return <NewsLoadingState />;
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
        
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredNews.slice(0, 4).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
