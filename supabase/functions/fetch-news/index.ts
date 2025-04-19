
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    
    // Fetch from News API with focus on Alzheimer's research
    const response = await fetch(
      'https://newsapi.org/v2/everything?' + new URLSearchParams({
        q: 'Alzheimer\'s research AI',
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: '12'
      }), {
        headers: {
          'X-Api-Key': newsApiKey!
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch news');
    }

    // Transform the data to match our existing news structure
    const transformedNews = data.articles.map((article: any, index: number) => ({
      id: `${index + 1}`,
      title: article.title,
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function determineCategory(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  
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
