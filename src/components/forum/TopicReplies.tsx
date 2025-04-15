
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Reply } from '@/types/forum';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TopicRepliesProps {
  topicId: string;
}

export function TopicReplies({ topicId }: TopicRepliesProps) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadReplies();
    setupRealtimeSubscription();
    checkUser();
  }, [topicId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous'
      });
    }
  };

  const loadReplies = async () => {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading replies:', error);
      return;
    }

    setReplies(data || []);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('forum_replies_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'forum_replies',
          filter: `topic_id=eq.${topicId}`
        }, 
        (payload) => {
          loadReplies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmitReply = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to reply",
        variant: "destructive",
      });
      return;
    }

    if (!newReply.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          topic_id: topicId,
          content: newReply.trim(),
          author_id: user.id,
          author_name: user.name,
        });

      if (error) throw error;

      setNewReply('');
      toast({
        title: "Success",
        description: "Your reply has been posted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Replies</h3>
      
      <div className="space-y-4">
        {replies.map((reply) => (
          <Card key={reply.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{reply.author_name}</span>
              <span className="text-sm text-gray-500">
                {new Date(reply.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{reply.content}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Write your reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          rows={4}
        />
        <Button 
          onClick={handleSubmitReply}
          className="w-full md:w-auto"
        >
          Post Reply
        </Button>
      </div>
    </div>
  );
}
