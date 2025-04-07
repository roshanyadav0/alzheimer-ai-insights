
import React from 'react';
import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/auth/RegisterForm';
import Footer from '@/components/Footer';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
