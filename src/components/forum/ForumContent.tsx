
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Send } from 'lucide-react';
import TopicList from './TopicList';
import CreateTopicDialog from './CreateTopicDialog';
import { Topic } from '@/types/forum';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ForumContent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string, name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initial load of topics
    loadTopics();
    setupRealtimeSubscription();
    
    // Check authentication status on component mount
    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          setCurrentUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User'
          });
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
        toast({
          title: "Authentication Error",
          description: "Could not verify user session",
          variant: "destructive"
        });
      } finally {
        setIsAuthChecked(true);
      }
    };
    
    checkInitialSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Navbar: Auth state changed:', event);
      if (session?.user) {
        setIsLoggedIn(true);
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User'
        });
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadTopics = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('forum_topics')
      .select('*')
      .order('last_activity', { ascending: false });

    if (error) {
      console.error('Error loading topics:', error);
      toast({
        title: "Error",
        description: "Could not load forum topics",
        variant: "destructive"
      });
      return;
    }

    setTopics(data as Topic[] || []);
    setIsLoading(false);
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
        () => {
          loadTopics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleCreateTopic = async () => {
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
            size="lg"
          >
            <Plus size={18} className="mr-2" />
            Create New Topic
          </Button>
        ) : (
          <Button onClick={handleLoginPrompt} size="lg">
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
            {isLoading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-alzheimer-primary mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading topics...</p>
              </div>
            ) : topics.length > 0 ? (
              <TopicList topics={topics} />
            ) : (
              <div className="text-center py-10">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500">No topics yet</p>
                {isLoggedIn && (
                  <Button 
                    onClick={() => setIsDialogOpen(true)} 
                    className="mt-4 bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
                  >
                    <Send size={16} className="mr-2" />
                    Start the conversation
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="research">
            {isLoading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-alzheimer-primary mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading topics...</p>
              </div>
            ) : topics.filter(topic => topic.category === 'research').length > 0 ? (
              <TopicList topics={topics.filter(topic => topic.category === 'research')} />
            ) : (
              <div className="text-center py-10">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500">No research topics yet</p>
                {isLoggedIn && (
                  <Button 
                    onClick={() => setIsDialogOpen(true)} 
                    className="mt-4 bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
                  >
                    <Send size={16} className="mr-2" />
                    Start a research discussion
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {isLoggedIn && (
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              className="bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
              size="lg"
            >
              <Plus size={18} className="mr-2" />
              Create New Topic
            </Button>
          </div>
        )}
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
