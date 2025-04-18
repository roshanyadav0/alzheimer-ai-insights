
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Loader2, User } from 'lucide-react';
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

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      
      try {
        // For a real implementation, fetch specific article from the API
        // Example: const response = await fetch(`https://your-api.com/articles/${id}`);
        
        // For now, we'll use sample data and filter by ID
        const sampleData = getSampleNewsData();
        const foundArticle = sampleData.find(item => item.id === id);
        
        if (!foundArticle) {
          throw new Error('Article not found');
        }
        
        setArticle(foundArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
        toast({
          title: "Failed to load article",
          description: "The article could not be found or loaded.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, toast]);

  // Sample data for fallback/testing
  const getSampleNewsData = (): NewsArticle[] => {
    return [
      {
        id: "1",
        title: "New AI Algorithm Detects Alzheimer's 10 Years Before Symptoms Appear",
        date: "April 2, 2025",
        author: "Dr. Sarah Chen",
        excerpt: "Researchers at Stanford University have developed a new AI system that can detect early signs of Alzheimer's disease up to a decade before symptoms appear.",
        content: "The revolutionary system, developed by a team led by Dr. James Harrison, combines advanced deep learning algorithms with a novel approach to analyzing longitudinal brain scan data. \"What makes our system unique is its ability to detect minute changes over time that are invisible to the naked eye,\" explains Dr. Harrison.\n\nThe AI model was trained on over 50,000 brain scans from patients who were eventually diagnosed with Alzheimer's, as well as those who remained cognitively healthy. In validation studies, the system demonstrated 94% accuracy in predicting which patients would develop the disease within the next decade.\n\n\"Early detection is crucial for Alzheimer's disease,\" says Dr. Harrison. \"Most treatments work best in the earliest stages, before significant brain damage occurs. Our AI system could give patients and doctors a decade-long head start.\"\n\nThe technology uses a combination of convolutional neural networks and recurrent neural networks to analyze patterns in brain scans over time. It can identify subtle changes in brain structure and activity that human radiologists cannot detect.\n\nThe team is now planning a large-scale clinical trial in partnership with several major medical centers. If successful, they hope to obtain FDA approval within the next three years.\n\n\"The potential impact is enormous,\" says Dr. Chen, co-author of the study. \"This could transform how we screen for Alzheimer's disease and ultimately lead to better outcomes for millions of patients worldwide.\"",
        category: "Research",
        image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "2",
        title: "Blood Test for Alzheimer's Shows Promising Results in Large Trial",
        date: "March 28, 2025",
        excerpt: "A new blood test that detects biomarkers associated with Alzheimer's disease has shown 94% accuracy in a clinical trial with over 1,500 participants.",
        author: "Dr. Michael Rodriguez",
        content: "The test, developed by NeuroDiagnostics Inc., identifies a unique pattern of protein fragments that appear in the bloodstream years before clinical symptoms of Alzheimer's become apparent. This non-invasive test could revolutionize early detection and intervention strategies.\n\nIn a clinical trial involving 1,587 participants across 12 medical centers, the blood test correctly identified 94% of patients who later developed Alzheimer's disease. The test measures the levels of specific proteins and peptides in the blood that are associated with the development of amyloid plaques and tau tangles in the brain.\n\n\"This represents a significant breakthrough in Alzheimer's diagnostics,\" said Dr. Rodriguez, lead investigator for the trial. \"Currently, definitive diagnosis requires expensive brain imaging or invasive spinal taps. A simple blood test would make screening more accessible and affordable.\"\n\nThe test is particularly effective at detecting changes 3-5 years before symptoms appear, providing a critical window for intervention. Several pharmaceutical companies are already exploring how this test could be used to identify candidates for clinical trials of drugs designed to slow or stop disease progression.\n\n\"Early intervention is key to managing Alzheimer's,\" explains Dr. Elena Patel, a neurologist not involved in the study. \"Having a reliable blood test would allow us to identify at-risk patients sooner and implement treatments or lifestyle changes that could significantly alter disease trajectory.\"\n\nThe FDA is currently reviewing the test for approval, with a decision expected by the end of the year. If approved, it could become part of routine screening for adults over 65 or those with family history of the disease.",
        category: "Clinical Trials",
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "3",
        title: "International Consortium Launches $100M Funding for AI in Dementia Research",
        date: "March 15, 2025",
        excerpt: "A global initiative bringing together researchers, technology companies, and healthcare providers has announced major funding for AI applications in dementia research.",
        author: "Emma Wilson",
        content: "The consortium, led by the Global Neuroscience Alliance, aims to accelerate the development of AI tools for diagnosis, treatment, and care management of dementia patients. Projects will focus on predictive analytics, personalized treatment plans, and assistive technologies.\n\nThe initiative represents an unprecedented collaboration between academic institutions, technology companies, and healthcare providers across North America, Europe, and Asia. Major contributors include the Alzheimer's Research Foundation, TechFuture Inc., and the International Healthcare Consortium.\n\n\"This funding will catalyze innovation at the intersection of AI and dementia care,\" says Dr. Jonathan Winters, director of the Global Neuroscience Alliance. \"We're looking to support projects that can translate quickly from research to clinical application.\"\n\nGrants will be awarded in three main categories:\n\n1. Diagnostic tools using AI to detect early signs of various forms of dementia\n2. Treatment optimization systems that use machine learning to personalize care plans\n3. AI-powered assistive technologies to support patients and caregivers in daily life\n\nThe consortium has established an ambitious five-year timeline, with the goal of bringing at least three new AI applications to market within that period. A scientific advisory board comprising leading experts in neurology, geriatrics, and artificial intelligence will oversee the selection and evaluation of projects.\n\n\"What makes this initiative unique is its global scope and emphasis on practical applications,\" explains Emma Wilson, spokesperson for the consortium. \"We're not just funding basic research—we're accelerating the development of tools that can make an immediate difference in people's lives.\"",
        category: "Funding",
        image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "4",
        title: "Virtual Reality Shows Promise in Cognitive Assessment for Alzheimer's Patients",
        date: "March 10, 2025",
        excerpt: "New research shows that immersive virtual reality environments can provide more sensitive measures of spatial navigation deficits in early Alzheimer's disease.",
        author: "Dr. Lisa Patel",
        content: "The study, published in Nature Neuroscience, demonstrates that VR-based cognitive assessments can detect subtle navigation impairments up to three years earlier than traditional testing methods. Patients navigate through virtual environments while researchers track performance metrics that correlate with early hippocampal damage.\n\nThe research team, led by Dr. Lisa Patel at the University of California, developed a virtual reality assessment that places patients in realistic scenarios requiring spatial navigation—a cognitive skill that relies heavily on the hippocampus, one of the first brain regions affected by Alzheimer's disease.\n\n\"Traditional cognitive tests often miss subtle deficits in spatial navigation,\" explains Dr. Patel. \"Our VR assessment creates immersive environments that challenge the exact cognitive systems that show the earliest signs of decline.\"\n\nIn the study, 312 participants aged 55-75 were asked to navigate through virtual neighborhoods, shopping centers, and parks. The system tracked numerous performance metrics including hesitation patterns, wrong turns, and inefficient route selection.\n\nParticipants who showed impaired performance on the VR assessment but normal results on standard cognitive tests were followed for five years. Among this group, 78% developed clinical symptoms of mild cognitive impairment or Alzheimer's disease within three years—significantly earlier than detection through conventional methods.\n\n\"The ability to detect cognitive changes years before clinical symptoms appear opens up new possibilities for early intervention,\" says Dr. Mark Johnson, a neurologist not involved in the study. \"This could be a game-changer for how we approach Alzheimer's diagnosis and treatment.\"\n\nThe technology is now being adapted for use in clinical settings, with a simplified version that can be administered in under 15 minutes using commercially available VR headsets.",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "5",
        title: "Machine Learning Model Predicts Drug Response in Alzheimer's Patients",
        date: "March 5, 2025",
        excerpt: "A new predictive model helps identify which patients are most likely to benefit from specific Alzheimer's medications, paving the way for personalized treatment plans.",
        author: "Dr. James Thompson",
        content: "By analyzing genetic markers, brain scan data, and clinical history, the ML model can predict with 83% accuracy whether a patient will respond positively to a specific class of Alzheimer's drugs. This could dramatically improve treatment outcomes and reduce unnecessary medication trials.\n\nThe model, developed by researchers at Mayo Clinic and MIT, analyzes over 150 variables from a patient's medical profile to generate personalized treatment recommendations. Key factors include specific genetic variants, patterns of brain atrophy visible on MRI scans, age of symptom onset, and comorbid conditions.\n\n\"Not all Alzheimer's medications work for all patients,\" explains Dr. Thompson, lead author of the study published in JAMA Neurology. \"By matching patients with the treatments most likely to benefit them, we can improve outcomes and reduce the time spent on ineffective therapies.\"\n\nThe research team trained their algorithm using data from over 10,000 Alzheimer's patients who had participated in various clinical trials and treatment programs. The system learned to identify patterns associated with positive responses to five major classes of medications currently used to treat the disease.\n\nIn validation testing, the model correctly predicted treatment response in 83% of cases—significantly better than the current trial-and-error approach used by many clinicians.\n\n\"This represents a major step toward precision medicine for Alzheimer's disease,\" says Dr. Thompson. \"Eventually, we hope to expand the model to include emerging therapies as they become available.\"\n\nThe team has developed a web-based interface that allows physicians to input patient data and receive treatment recommendations. A pilot program implementing the system is currently underway at five major medical centers across the United States.",
        category: "Treatment",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "6",
        title: "Voice Analysis App Can Detect Cognitive Decline, Study Finds",
        date: "February 28, 2025",
        excerpt: "Researchers have developed a smartphone application that analyzes speech patterns to identify early signs of cognitive decline with 88% accuracy.",
        author: "Dr. Anna Kim",
        content: "The app, developed at MIT's Media Lab, uses natural language processing to detect subtle changes in vocabulary, grammatical complexity, and speech rhythm that may indicate early cognitive decline. Users complete a 3-minute speaking task three times per week, providing longitudinal data that can alert healthcare providers to significant changes.\n\n\"Speech is a complex cognitive task that engages multiple brain regions,\" explains Dr. Kim, lead researcher on the project. \"Our algorithm can detect subtle changes in linguistic patterns that often precede noticeable memory problems by 12-18 months.\"\n\nThe app, called CogniVoice, prompts users to describe a recent event or respond to a simple question for three minutes. The recording is then analyzed for over 30 linguistic markers including vocabulary diversity, hesitation patterns, grammatical complexity, and semantic coherence.\n\nIn a clinical validation study involving 2,500 older adults followed over three years, the app detected cognitive decline with 88% accuracy compared to formal neuropsychological testing.\n\n\"What makes this technology powerful is its ability to establish a personalized baseline for each user,\" says Dr. Kim. \"The algorithm looks for changes relative to your own previous patterns, not comparison to population averages.\"\n\nThe non-invasive, low-cost nature of the technology makes it particularly valuable for widespread screening, especially in underserved communities with limited access to specialized healthcare.\n\nThe app is currently available for research purposes, with FDA approval for clinical use expected later this year. The team is also developing versions in multiple languages to enable global deployment.",
        category: "Mobile Health",
        image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "7",
        title: "New Guidelines for AI Implementation in Alzheimer's Diagnostics Released",
        date: "February 20, 2025",
        excerpt: "Leading health organizations have published comprehensive guidelines for the responsible implementation of AI tools in clinical settings for Alzheimer's diagnosis.",
        author: "Dr. Robert Chen",
        content: "The guidelines address key concerns including algorithm validation, integration with clinical workflows, ethical considerations, and requirements for ongoing performance monitoring. They represent a consensus view from neurologists, AI ethicists, and patient advocacy groups on how to safely incorporate AI into clinical practice.\n\nDeveloped by a joint task force that included representatives from the Alzheimer's Association, the American Academy of Neurology, and the International Society for AI in Healthcare, the guidelines establish standards for both developers and clinical adopters of AI diagnostic technologies.\n\n\"As AI tools become increasingly available for Alzheimer's diagnosis, we needed a framework to ensure they're implemented responsibly,\" explains Dr. Chen, chair of the task force. \"These guidelines help bridge the gap between technical innovation and clinical practice.\"\n\nKey recommendations include:\n\n1. Minimum requirements for algorithm validation, including diverse representation in training data\n2. Standards for explainability of AI decision-making processes\n3. Protocols for integration with existing clinical workflows\n4. Requirements for ongoing performance monitoring and quality assurance\n5. Ethical guidelines for patient consent and data privacy\n6. Approaches to address potential algorithmic bias\n\n\"These guidelines emphasize that AI should augment, not replace, clinical judgment,\" notes Dr. Chen. \"The human element remains essential in diagnosis and care planning.\"\n\nThe document also addresses practical considerations such as reimbursement models, liability frameworks, and training requirements for healthcare professionals working with AI systems.\n\nSeveral major hospital systems have already announced plans to implement the guidelines as they integrate AI diagnostic tools into their neurology and memory clinic services.",
        category: "Policy",
        image: "https://images.unsplash.com/photo-1576089073624-b5f95db1e0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "8",
        title: "Retinal Scan AI Detects Alzheimer's Biomarkers with High Accuracy",
        date: "February 15, 2025",
        excerpt: "A non-invasive retinal imaging technique combined with artificial intelligence can identify Alzheimer's biomarkers years before cognitive symptoms emerge.",
        author: "Dr. Sarah Williams",
        content: "The technology, developed by researchers at Johns Hopkins University, detects subtle changes in the retinal microvasculature and nerve fiber layer that correlate with beta-amyloid deposits in the brain. The 5-minute scan could become a routine screening tool for adults over 50.\n\n\"The retina is essentially an extension of the brain and shares many similarities in terms of tissue structure and blood supply,\" explains Dr. Williams, principal investigator for the study. \"Changes in the retina often mirror changes occurring in the brain.\"\n\nThe system combines high-resolution imaging of the retina with an AI algorithm trained to identify specific patterns associated with early Alzheimer's pathology. In a study of 3,200 adults aged 50-75, the technology identified 91% of participants who had abnormal levels of beta-amyloid in their brains, as confirmed by PET scans.\n\nImportantly, the retinal changes were detectable up to six years before participants showed any cognitive symptoms, providing a crucial window for potential intervention.\n\n\"Current methods for detecting beta-amyloid in the brain, such as PET scans, are expensive and not widely available,\" notes Dr. Williams. \"A simple retinal scan that can be performed during a routine eye exam could transform our ability to screen for early Alzheimer's pathology.\"\n\nThe technology requires only a specialized camera attachment that can be added to equipment already present in most optometrists' and ophthalmologists' offices. This makes widespread implementation feasible even in areas with limited access to advanced medical facilities.\n\nA larger validation study is currently underway at 20 sites across North America, with FDA approval potentially coming within the next two years.",
        category: "Diagnostics",
        image: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-alzheimer-primary mx-auto" />
            <p className="mt-4 text-lg">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow section-container py-16 text-center">
          <h2 className="text-2xl font-bold text-alzheimer-dark mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-8">The article you are looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/news" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Back to News
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Article Header */}
        <div className="bg-alzheimer-tertiary">
          <div className="section-container py-8 md:py-12">
            <Button asChild variant="outline" className="mb-6">
              <Link to="/news" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" /> Back to All News
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-alzheimer-dark mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full max-h-[500px] overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full object-cover h-full"
          />
        </div>

        {/* Article Content */}
        <article className="section-container py-12">
          <div className="max-w-4xl mx-auto prose lg:prose-xl">
            <p className="lead text-xl text-gray-700 font-medium mb-6">{article.excerpt}</p>
            
            {/* Render article content with paragraphs */}
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>

        {/* Related Articles - placeholder for future implementation */}
        <div className="bg-gray-50 py-12">
          <div className="section-container">
            <h2 className="text-2xl font-bold text-alzheimer-dark mb-6">Related Articles</h2>
            <p className="text-gray-500">Feature coming soon.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
