
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Users } from 'lucide-react';
import TopicList from './TopicList';
import CreateTopicDialog from './CreateTopicDialog';
import { Topic } from '@/types/forum';

const ForumContent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Load topics from localStorage
    const storedTopics = localStorage.getItem('forumTopics');
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics));
    } else {
      // Set some sample topics if none exist
      const sampleTopics: Topic[] = [
        {
          id: '1',
          title: 'Latest advancements in Alzheimer\'s detection using AI',
          author: 'Dr. Smith',
          authorId: 'admin',
          category: 'research',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          replies: 12,
          views: 145,
          content: 'I\'d like to discuss the recent paper on using convolutional neural networks for early Alzheimer\'s detection through brain imaging. Has anyone implemented similar models?',
          lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Genetic markers and their role in predicting Alzheimer\'s risk',
          author: 'ResearcherX',
          authorId: 'researcher1',
          category: 'discussion',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          replies: 8,
          views: 94,
          content: 'Recent studies have identified several genetic markers strongly associated with Alzheimer\'s risk. Let\'s discuss how these findings could be integrated into our predictive models.',
          lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          title: 'Patient experiences with early intervention programs',
          author: 'CaregiverSupport',
          authorId: 'caregiver1',
          category: 'support',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          replies: 15,
          views: 203,
          content: 'I\'m interested in hearing about experiences with early intervention programs following an Alzheimer\'s diagnosis. What approaches have shown the most promise for quality of life improvements?',
          lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setTopics(sampleTopics);
      localStorage.setItem('forumTopics', JSON.stringify(sampleTopics));
    }
  }, []);

  const handleCreateTopic = (newTopic: Topic) => {
    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics);
    localStorage.setItem('forumTopics', JSON.stringify(updatedTopics));
    setIsDialogOpen(false);
  };

  const handleLoginPrompt = () => {
    navigate('/login', { state: { returnTo: '/forum' } });
  };

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
              <Users size={16} />
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
