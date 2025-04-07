
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-alzheimer-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Brain size={24} className="text-alzheimer-secondary" />
              <span className="text-lg font-bold">AlzInsight</span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              Advancing Alzheimer's research and detection through AI and machine learning.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-alzheimer-secondary uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/research" className="text-gray-300 hover:text-white transition">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-300 hover:text-white transition">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-alzheimer-secondary uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  About Alzheimer's
                </Link>
              </li>
              <li>
                <Link to="/about#ai-ml" className="text-gray-300 hover:text-white transition">
                  AI & ML in Detection
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white transition">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-alzheimer-secondary uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Forum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AlzInsight. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
