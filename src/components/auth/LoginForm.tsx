
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get the return URL from location state, or default to profile
  const returnTo = location.state?.returnTo || '/profile';
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      console.log('Login attempt with:', data);
      
      // Use Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Login successful!');
      
      // Redirect to the return URL or profile page
      navigate(returnTo);
    } catch (error: any) {
      // Extract the specific error message
      const errorMessage = error.message || 'Please try again.';
      setAuthError(errorMessage);
      toast.error(`Login failed: ${errorMessage}`);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-alzheimer-dark">Login to AlzInsight</h1>
        <p className="text-gray-500 mt-2">Access your account and contribute to Alzheimer's research</p>
      </div>
      
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">{authError}</p>
            <p className="text-xs mt-1">Note: You need to register first if you don't have an account.</p>
          </div>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-alzheimer-primary hover:bg-alzheimer-accent"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-alzheimer-primary hover:underline font-medium">
            Register
          </Link>
        </p>
        
        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
          <p>Try using a valid email format with a real domain, like:</p>
          <code className="block mt-1 p-1 bg-gray-100 rounded">example@gmail.com</code>
          <code className="block mt-1 p-1 bg-gray-100 rounded">your.name@outlook.com</code>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
