
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
}

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <Card className="border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
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
  );
};

export default NewsCard;
