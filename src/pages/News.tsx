
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define news article interface
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

const News = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  
  const categories = [
    'All Categories', 'Research', 'Clinical Trials', 'Technology', 
    'Treatment', 'Policy', 'Funding', 'Prevention', 'Diagnostics'
  ];
  
  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Sample news API URL - replace with actual API when available
        const response = await fetch('https://newsapi.org/v2/everything?q=alzheimers+AI&apiKey=YOUR_API_KEY&pageSize=12');
        const data = await response.json();
        
        if (data.status !== 'ok') {
          throw new Error(data.message || 'Failed to fetch news');
        }
        
        // Transform the API data to match our interface
        const transformedArticles: NewsArticle[] = data.articles.map((article: any, index: number) => ({
          id: `${index + 1}`, // Generate IDs since NewsAPI doesn't provide them
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          author: article.author || 'Unknown',
          excerpt: article.description || 'No description available',
          content: article.content || 'No content available',
          category: getCategoryFromArticle(article),
          image: article.urlToImage || 'https://images.unsplash.com/photo-1576089073624-b5f95db1e0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }));
        
        // Set featured article to be the first one with an image
        const featured = transformedArticles.find(article => article.image) || transformedArticles[0];
        
        setFeaturedNews(featured);
        setArticles(transformedArticles.filter(article => article.id !== featured.id));
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Failed to load news",
          description: "Using sample data instead.",
          variant: "destructive"
        });
        
        // Fallback to sample data in case the API fails
        const sampleData = getSampleNewsData();
        setFeaturedNews(sampleData.featuredNews);
        setArticles(sampleData.newsItems);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [toast]);
  
  // Helper function to assign a category based on article content
  const getCategoryFromArticle = (article: any): string => {
    const title = (article.title || '').toLowerCase();
    const description = (article.description || '').toLowerCase();
    
    if (title.includes('trial') || description.includes('trial')) return 'Clinical Trials';
    if (title.includes('research') || description.includes('research')) return 'Research';
    if (title.includes('fund') || description.includes('fund') || 
        title.includes('grant') || description.includes('grant')) return 'Funding';
    if (title.includes('treat') || description.includes('treat') || 
        title.includes('therapy') || description.includes('therapy')) return 'Treatment';
    if (title.includes('tech') || description.includes('tech') || 
        title.includes('ai') || description.includes('ai')) return 'Technology';
    if (title.includes('policy') || description.includes('policy') || 
        title.includes('regulation') || description.includes('regulation')) return 'Policy';
    if (title.includes('prevent') || description.includes('prevent')) return 'Prevention';
    if (title.includes('diagnos') || description.includes('diagnos') || 
        title.includes('detect') || description.includes('detect')) return 'Diagnostics';
    
    return 'Research'; // Default category
  };
  
  // Filter articles by selected category
  const filteredArticles = activeCategory === 'All Categories' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  
  // Sample data for fallback
  const getSampleNewsData = () => {
    return {
      featuredNews: {
        id: "1",
        title: "New AI Algorithm Detects Alzheimer's 10 Years Before Symptoms Appear",
        date: "April 2, 2025",
        author: "Dr. Sarah Chen",
        excerpt: "Researchers at Stanford University have developed a new AI system that can detect early signs of Alzheimer's disease up to a decade before symptoms appear. The groundbreaking technology analyzes subtle patterns in brain imaging data that would be imperceptible to human observers.",
        content: "The revolutionary system, developed by a team led by Dr. James Harrison, combines advanced deep learning algorithms with a novel approach to analyzing longitudinal brain scan data. \"What makes our system unique is its ability to detect minute changes over time that are invisible to the naked eye,\" explains Dr. Harrison. The AI model was trained on over 50,000 brain scans from patients who were eventually diagnosed with Alzheimer's, as well as those who remained cognitively healthy. In validation studies, the system demonstrated 94% accuracy in predicting which patients would develop the disease within the next decade.",
        category: "Research",
        image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      newsItems: [
        {
          id: "2",
          title: "Blood Test for Alzheimer's Shows Promising Results in Large Trial",
          date: "March 28, 2025",
          excerpt: "A new blood test that detects biomarkers associated with Alzheimer's disease has shown 94% accuracy in a clinical trial with over 1,500 participants.",
          author: "Dr. Michael Rodriguez",
          content: "The test, developed by NeuroDiagnostics Inc., identifies a unique pattern of protein fragments that appear in the bloodstream years before clinical symptoms of Alzheimer's become apparent. This non-invasive test could revolutionize early detection and intervention strategies.",
          category: "Clinical Trials",
          image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "3",
          title: "International Consortium Launches $100M Funding for AI in Dementia Research",
          date: "March 15, 2025",
          excerpt: "A global initiative bringing together researchers, technology companies, and healthcare providers has announced major funding for AI applications in dementia research.",
          author: "Emma Wilson",
          content: "The consortium, led by the Global Neuroscience Alliance, aims to accelerate the development of AI tools for diagnosis, treatment, and care management of dementia patients. Projects will focus on predictive analytics, personalized treatment plans, and assistive technologies.",
          category: "Funding",
          image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "4",
          title: "Virtual Reality Shows Promise in Cognitive Assessment for Alzheimer's Patients",
          date: "March 10, 2025",
          excerpt: "New research shows that immersive virtual reality environments can provide more sensitive measures of spatial navigation deficits in early Alzheimer's disease.",
          author: "Dr. Lisa Patel",
          content: "The study, published in Nature Neuroscience, demonstrates that VR-based cognitive assessments can detect subtle navigation impairments up to three years earlier than traditional testing methods. Patients navigate through virtual environments while researchers track performance metrics that correlate with early hippocampal damage.",
          category: "Technology",
          image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "5",
          title: "Machine Learning Model Predicts Drug Response in Alzheimer's Patients",
          date: "March 5, 2025",
          excerpt: "A new predictive model helps identify which patients are most likely to benefit from specific Alzheimer's medications, paving the way for personalized treatment plans.",
          author: "Dr. James Thompson",
          content: "By analyzing genetic markers, brain scan data, and clinical history, the ML model can predict with 83% accuracy whether a patient will respond positively to a specific class of Alzheimer's drugs. This could dramatically improve treatment outcomes and reduce unnecessary medication trials.",
          category: "Treatment",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "6",
          title: "Voice Analysis App Can Detect Cognitive Decline, Study Finds",
          date: "February 28, 2025",
          excerpt: "Researchers have developed a smartphone application that analyzes speech patterns to identify early signs of cognitive decline with 88% accuracy.",
          author: "Dr. Anna Kim",
          content: "The app, developed at MIT's Media Lab, uses natural language processing to detect subtle changes in vocabulary, grammatical complexity, and speech rhythm that may indicate early cognitive decline. Users complete a 3-minute speaking task three times per week, providing longitudinal data that can alert healthcare providers to significant changes.",
          category: "Mobile Health",
          image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "7",
          title: "New Guidelines for AI Implementation in Alzheimer's Diagnostics Released",
          date: "February 20, 2025",
          excerpt: "Leading health organizations have published comprehensive guidelines for the responsible implementation of AI tools in clinical settings for Alzheimer's diagnosis.",
          author: "Dr. Robert Chen",
          content: "The guidelines address key concerns including algorithm validation, integration with clinical workflows, ethical considerations, and requirements for ongoing performance monitoring. They represent a consensus view from neurologists, AI ethicists, and patient advocacy groups on how to safely incorporate AI into clinical practice.",
          category: "Policy",
          image: "https://images.unsplash.com/photo-1576089073624-b5f95db1e0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "8",
          title: "Retinal Scan AI Detects Alzheimer's Biomarkers with High Accuracy",
          date: "February 15, 2025",
          excerpt: "A non-invasive retinal imaging technique combined with artificial intelligence can identify Alzheimer's biomarkers years before cognitive symptoms emerge.",
          author: "Dr. Sarah Williams",
          content: "The technology, developed by researchers at Johns Hopkins University, detects subtle changes in the retinal microvasculature and nerve fiber layer that correlate with beta-amyloid deposits in the brain. The 5-minute scan could become a routine screening tool for adults over 50.",
          category: "Diagnostics",
          image: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-alzheimer-dark">Latest News</h1>
              <p className="mt-4 text-xl text-gray-600">
                Stay updated with breakthroughs in Alzheimer's research and AI applications
              </p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="section-container py-12 flex justify-center items-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-alzheimer-primary mx-auto" />
              <p className="mt-4 text-lg">Loading latest news...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredNews && (
              <div className="section-container py-12">
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-5">
                      <div className="md:col-span-3 order-2 md:order-1">
                        <div className="p-6 md:p-8 lg:p-10">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-alzheimer-tertiary text-alzheimer-primary rounded-full">
                              Featured
                            </span>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                              {featuredNews.category}
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-alzheimer-dark mb-3">
                            {featuredNews.title}
                          </h2>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar size={14} className="mr-1" />
                            <span>{featuredNews.date}</span>
                            <span className="mx-2">•</span>
                            <span>{featuredNews.author}</span>
                          </div>
                          <p className="text-gray-600 mb-6">
                            {featuredNews.excerpt}
                          </p>
                          <p className="text-gray-600 mb-6">
                            {featuredNews.content.substring(0, 200)}...
                          </p>
                          <Button asChild className="bg-alzheimer-primary hover:bg-alzheimer-accent">
                            <Link to={`/news/${featuredNews.id}`} className="flex items-center">
                              Read Full Article <ArrowRight size={16} className="ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="md:col-span-2 order-1 md:order-2">
                        <img 
                          src={featuredNews.image} 
                          alt={featuredNews.title} 
                          className="w-full h-full object-cover aspect-[3/2] md:aspect-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Category Filters */}
            <div className="bg-white border-y border-gray-200">
              <div className="section-container py-4">
                <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                  <div className="flex space-x-2">
                    {categories.map((category, index) => (
                      <Button 
                        key={index}
                        variant={category === activeCategory ? "default" : "outline"}
                        size="sm"
                        className={category === activeCategory ? "bg-alzheimer-primary hover:bg-alzheimer-accent" : ""}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="section-container py-12">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">No articles found in this category.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredArticles.map((item) => (
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
              )}

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-alzheimer-primary text-white hover:bg-alzheimer-accent">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">
                    10
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </nav>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-alzheimer-tertiary py-16">
              <div className="section-container text-center">
                <div className="max-w-2xl mx-auto">
                  <BookOpen size={32} className="text-alzheimer-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-alzheimer-dark mb-4">Stay Informed</h2>
                  <p className="text-gray-600 mb-6">
                    Subscribe to our newsletter to receive the latest news and research updates on Alzheimer's detection and AI advancements
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-alzheimer-primary"
                    />
                    <Button className="bg-alzheimer-primary hover:bg-alzheimer-accent whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default News;
