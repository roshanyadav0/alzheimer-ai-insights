
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ForumContent from '@/components/forum/ForumContent';

const Forum = () => {
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
