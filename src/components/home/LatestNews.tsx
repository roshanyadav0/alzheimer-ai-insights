
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const news = [
    {
      id: 1,
      title: 'New AI Algorithm Detects Alzheimer's 10 Years Before Symptoms Appear',
      date: 'April 2, 2025',
      excerpt: 'Researchers at Stanford University have developed a new AI system that can detect early signs of Alzheimer\'s disease up to a decade before symptoms appear.',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Blood Test for Alzheimer's Shows Promising Results in Large Trial',
      date: 'March 28, 2025',
      excerpt: 'A new blood test that detects biomarkers associated with Alzheimer\'s disease has shown 94% accuracy in a clinical trial with over 1,500 participants.',
      category: 'Clinical Trials',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'International Consortium Launches $100M Funding for AI in Dementia Research',
      date: 'March 15, 2025',
      excerpt: 'A global initiative bringing together researchers, technology companies, and healthcare providers has announced major funding for AI applications in dementia research.',
      category: 'Funding',
      image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Virtual Reality Shows Promise in Cognitive Assessment for Alzheimer's Patients',
      date: 'March 10, 2025',
      excerpt: 'New research shows that immersive virtual reality environments can provide more sensitive measures of spatial navigation deficits in early Alzheimer\'s disease.',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <Card key={item.id} className="border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
              <div className="h-40 overflow-hidden">
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
