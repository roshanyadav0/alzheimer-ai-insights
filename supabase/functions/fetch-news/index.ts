
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    
    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY is not set in environment variables');
    }
    
    console.log('Fetching news from News API...');
    
    const response = await fetch(
      'https://newsapi.org/v2/everything?' + new URLSearchParams({
        q: 'Alzheimer\'s research AI',
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: '100'  // Maximum allowed by the API
      }), {
        headers: {
          'X-Api-Key': newsApiKey
        }
      }
    );

    const data = await response.json();

    console.log('News API response status:', response.status);
    
    if (!response.ok) {
      console.error('News API error:', data);
      throw new Error(data.message || 'Failed to fetch news');
    }

    // Transform the news data
    const transformedNews = data.articles.map((article: any, index: number) => ({
      id: `${index + 1}`,
      title: article.title || 'Untitled',
      date: new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      excerpt: article.description || 'No description available',
      content: article.content || 'No content available',
      category: determineCategory(article.title, article.description),
      image: article.urlToImage || 'https://images.unsplash.com/photo-1576089073624-b5f95db1e0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }));

    return new Response(JSON.stringify({ news: transformedNews }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    
    const fallbackNews = getSampleNewsData();
    
    return new Response(JSON.stringify({ 
      news: fallbackNews,
      error: error.message,
      usingFallback: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function determineCategory(title: string, description: string): string {
  const text = ((title || '') + ' ' + (description || '')).toLowerCase();
  
  if (text.includes('trial') || text.includes('study')) return 'Clinical Trials';
  if (text.includes('research')) return 'Research';
  if (text.includes('fund') || text.includes('grant')) return 'Funding';
  if (text.includes('treat') || text.includes('therapy')) return 'Treatment';
  if (text.includes('tech') || text.includes('ai')) return 'Technology';
  if (text.includes('policy') || text.includes('regulation')) return 'Policy';
  if (text.includes('prevent')) return 'Prevention';
  if (text.includes('diagnos') || text.includes('detect')) return 'Diagnostics';
  
  return 'Research';
}

function getSampleNewsData() {
  const baseNews = [
    {
      id: "1",
      title: "New AI Algorithm Detects Alzheimer's 10 Years Before Symptoms Appear",
      date: "April 2, 2025",
      excerpt: "Researchers at Stanford University have developed a new AI system that can detect early signs of Alzheimer's disease up to a decade before symptoms appear.",
      content: "The revolutionary system combines advanced deep learning algorithms with a novel approach to analyzing longitudinal brain scan data.",
      category: "Research",
      image: "https://images.unsplash.com/photo-1559757175-7b21e5afae2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      title: "Blood Test for Alzheimer's Shows Promising Results in Large Trial",
      date: "March 28, 2025",
      excerpt: "A new blood test that detects biomarkers associated with Alzheimer's disease has shown 94% accuracy in a clinical trial with over 1,500 participants.",
      content: "The test identifies a unique pattern of protein fragments that appear in the bloodstream years before clinical symptoms of Alzheimer's become apparent.",
      category: "Clinical Trials",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      title: "International Consortium Launches $100M Funding for AI in Dementia Research",
      date: "March 15, 2025",
      excerpt: "A global initiative bringing together researchers, technology companies, and healthcare providers has announced major funding for AI applications in dementia research.",
      content: "The consortium aims to accelerate the development of AI tools for diagnosis, treatment, and care management of dementia patients.",
      category: "Funding",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "4",
      title: "Virtual Reality Shows Promise in Cognitive Assessment for Alzheimer's Patients",
      date: "March 10, 2025",
      excerpt: "New research shows that immersive virtual reality environments can provide more sensitive measures of spatial navigation deficits in early Alzheimer's disease.",
      content: "The study demonstrates that VR-based cognitive assessments can detect subtle navigation impairments up to three years earlier than traditional testing methods.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "5",
      title: "Machine Learning Model Predicts Drug Response in Alzheimer's Patients",
      date: "March 5, 2025",
      excerpt: "A new predictive model helps identify which patients are most likely to benefit from specific Alzheimer's medications, paving the way for personalized treatment plans.",
      content: "The model analyzes genetic markers and biomarkers to determine optimal treatment strategies for individual patients.",
      category: "Treatment",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "6",
      title: "New Study Links Gut Microbiome to Alzheimer's Risk",
      date: "February 28, 2025",
      excerpt: "Researchers have found significant correlations between gut bacteria composition and markers of Alzheimer's disease.",
      content: "The study suggests potential for microbiome-based early detection and prevention strategies.",
      category: "Research",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "7",
      title: "FDA Approves Novel Diagnostic Tool for Early Alzheimer's Detection",
      date: "February 20, 2025",
      excerpt: "A groundbreaking diagnostic tool using AI analysis of speech patterns receives FDA approval for clinical use.",
      content: "The non-invasive test can identify subtle linguistic changes associated with early cognitive decline.",
      category: "Diagnostics",
      image: "https://images.unsplash.com/photo-1576671413161-cf763bbb3d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "8",
      title: "Global Clinical Trial Launches for Promising Alzheimer's Treatment",
      date: "February 15, 2025",
      excerpt: "A multinational phase 3 trial begins for a drug targeting tau protein aggregation in Alzheimer's disease.",
      content: "The treatment showed significant reduction in cognitive decline in earlier trials.",
      category: "Clinical Trials",
      image: "https://images.unsplash.com/photo-1517120026326-d87759a7b63b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Generate 100 sample news items to ensure we have enough for pagination
  const extendedNews = [];
  for (let i = 0; i < 100; i++) {
    const baseItem = baseNews[i % baseNews.length];
    extendedNews.push({
      ...baseItem,
      id: `${i + 1}`,
      title: i > 7 ? `${baseItem.title} (${Math.floor(i/8) + 1})` : baseItem.title,
      date: new Date(2025, 3, 20 - i).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
  }

  return extendedNews;
}
