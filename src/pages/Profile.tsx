
import React from 'react';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/profile/UserProfile';
import Footer from '@/components/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <UserProfile />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
