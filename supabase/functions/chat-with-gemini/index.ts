
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

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
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    
    const { message } = await req.json();
    
    console.log('Sending message to Gemini API:', message.substring(0, 50) + '...');
    
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    // Updated to use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are an AI assistant specialized in Alzheimer's research. Always provide accurate, helpful, and empathetic responses about Alzheimer's disease, its research, treatments, and related topics." }]
        },
        {
          role: "model",
          parts: [{ text: "I understand that I am an AI assistant specialized in Alzheimer's research. I will provide accurate, up-to-date, and empathetic information about Alzheimer's disease, including research developments, treatment options, prevention strategies, and support resources. I will ensure my responses are helpful while maintaining sensitivity to the challenging nature of this topic." }]
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage([{ text: message }]);
    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini API');

    return new Response(JSON.stringify({ response: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm sorry, I encountered an issue connecting to the Alzheimer's research knowledge base. Please try again in a moment." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
