
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  id: string;
  name: string;
  email: string;
  bio?: string;
  interests?: string[];
  researchExperience?: string;
}

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  bio: z.string().optional(),
  researchExperience: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in with Supabase
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          toast.error('Please login to view your profile');
          navigate('/login', { state: { returnTo: '/profile' } });
          return;
        }
        
        // Get user data from session
        const userData: UserData = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          bio: session.user.user_metadata?.bio || '',
          researchExperience: session.user.user_metadata?.researchExperience || '',
        };
        
        setUser(userData);
        form.reset({
          name: userData.name,
          email: userData.email,
          bio: userData.bio || '',
          researchExperience: userData.researchExperience || '',
        });
      } catch (error) {
        console.error('Error checking auth status:', error);
        toast.error('Error loading profile');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, [navigate]);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      researchExperience: '',
    },
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!user) return;
      
      // Update user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          bio: data.bio,
          researchExperience: data.researchExperience,
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUser({
        ...user,
        name: data.name,
        bio: data.bio || '',
        researchExperience: data.researchExperience || '',
      });
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message || 'Please try again'}`);
      console.error('Profile update error:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(`Logout failed: ${error.message || 'Please try again'}`);
      console.error('Logout error:', error);
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-alzheimer-primary"></div>
      <p className="ml-3">Loading profile...</p>
    </div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-96">
      <p>Please login to view your profile</p>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <div className="text-center">
          <Avatar className="h-32 w-32">
            <AvatarFallback className="text-4xl bg-alzheimer-primary text-white">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <Button 
            variant="outline" 
            className="mt-4 border-alzheimer-secondary text-alzheimer-secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="research">Research Interests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="bg-alzheimer-primary hover:bg-alzheimer-accent">
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="research" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Research Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="researchExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Research Experience</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your research experience and interests in Alzheimer's research" 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="bg-alzheimer-primary hover:bg-alzheimer-accent">
                        Save Research Info
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
