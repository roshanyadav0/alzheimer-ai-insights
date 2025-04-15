
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';
import TopicList from './TopicList';
import CreateTopicDialog from './CreateTopicDialog';
import { Topic } from '@/types/forum';
import { supabase } from '@/integrations/supabase/client';

const ForumContent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial load of topics
    loadTopics();
    setupRealtimeSubscription();
    
    // Check authentication status on component mount
    const checkInitialSession = async () => {
      try {
        console.log('Initial session check...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session result:', !!session?.user);
        setIsLoggedIn(!!session?.user);
      } catch (error) {
        console.error('Error checking initial session:', error);
      } finally {
        setIsAuthChecked(true);
      }
    };
    
    checkInitialSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, !!session?.user);
      setIsLoggedIn(!!session?.user);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadTopics = async () => {
    const { data, error } = await supabase
      .from('forum_topics')
      .select('*')
      .order('last_activity', { ascending: false });

    if (error) {
      console.error('Error loading topics:', error);
      return;
    }

    setTopics(data as Topic[] || []);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('forum_topics_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'forum_topics'
        }, 
        (payload) => {
          loadTopics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleCreateTopic = async (newTopic: Topic) => {
    setIsDialogOpen(false);
    await loadTopics();
  };

  const handleLoginPrompt = () => {
    navigate('/login', { state: { returnTo: '/forum' } });
  };

  // Debug rendering to help troubleshoot
  console.log('Rendering ForumContent, isLoggedIn:', isLoggedIn, 'isAuthChecked:', isAuthChecked);

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-alzheimer-dark mb-2">Alzheimer&apos;s Research Forum</h1>
          <p className="text-gray-600">Connect with researchers and community members to discuss the latest in Alzheimer&apos;s research</p>
        </div>
        {isLoggedIn ? (
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
          >
            <Plus size={18} className="mr-2" />
            New Topic
          </Button>
        ) : (
          <Button onClick={handleLoginPrompt}>
            Log in to participate
          </Button>
        )}
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <MessageSquare size={16} />
              All Topics
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Research Discussions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <TopicList topics={topics} />
          </TabsContent>
          
          <TabsContent value="research">
            <TopicList topics={topics.filter(topic => topic.category === 'research')} />
          </TabsContent>
        </Tabs>
      </Card>

      <CreateTopicDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onCreateTopic={handleCreateTopic} 
      />
    </div>
  );
};

export default ForumContent;
