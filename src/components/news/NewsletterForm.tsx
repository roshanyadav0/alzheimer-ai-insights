
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const NewsletterForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate email
      emailSchema.parse(email);
      
      setIsSubmitting(true);
      
      // Here you would typically send this to your backend API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription failed",
          description: "There was an error subscribing to the newsletter. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={handleEmailChange}
        className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-alzheimer-primary"
        disabled={isSubmitting}
        required
      />
      <Button 
        type="submit" 
        className="bg-alzheimer-primary hover:bg-alzheimer-accent whitespace-nowrap"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default NewsletterForm;
