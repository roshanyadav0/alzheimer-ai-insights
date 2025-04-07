
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Topic } from '@/types/forum';
import { useToast } from '@/hooks/use-toast';

interface CreateTopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTopic: (topic: Topic) => void;
}

const CreateTopicDialog: React.FC<CreateTopicDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateTopic 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'research' | 'discussion' | 'support' | 'news'>('discussion');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Get user info from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUsername(user.name || user.email.split('@')[0]);
      setUserId(user.email);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic title",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your topic",
        variant: "destructive",
      });
      return;
    }

    const newTopic: Topic = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      author: username,
      authorId: userId,
      category: category,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      replies: 0,
      views: 0
    };

    onCreateTopic(newTopic);
    resetForm();
    
    toast({
      title: "Success",
      description: "Your topic has been created",
    });
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('discussion');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter topic title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={(value: 'research' | 'discussion' | 'support' | 'news') => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="discussion">General Discussion</SelectItem>
                <SelectItem value="support">Support & Resources</SelectItem>
                <SelectItem value="news">News & Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or insights..."
              rows={6}
            />
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-alzheimer-primary hover:bg-alzheimer-accent">
              Create Topic
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
