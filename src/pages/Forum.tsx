
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ForumContent from '@/components/forum/ForumContent';
import { supabase } from '@/integrations/supabase/client';

const Forum = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Just to ensure the auth is properly initialized when the forum page loads
    const checkSession = async () => {
      try {
        await supabase.auth.getSession();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
          <div>Loading forum...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <ForumContent />
      </div>
      <Footer />
    </div>
  );
};

export default Forum;

