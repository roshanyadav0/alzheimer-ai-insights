
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain, UserCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Brain size={28} className="text-alzheimer-primary" />
                <span className="text-xl font-bold text-alzheimer-dark">AlzInsight</span>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-alzheimer-dark hover:text-alzheimer-primary hover:border-alzheimer-primary transition-colors">
                About Alzheimer's
              </Link>
              <Link to="/research" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-alzheimer-dark hover:text-alzheimer-primary hover:border-alzheimer-primary transition-colors">
                Research
              </Link>
              <Link to="/assessment" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-alzheimer-dark hover:text-alzheimer-primary hover:border-alzheimer-primary transition-colors">
                Risk Assessment
              </Link>
              <Link to="/news" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-alzheimer-dark hover:text-alzheimer-primary hover:border-alzheimer-primary transition-colors">
                Latest News
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="outline" 
                  className="mr-2 border-alzheimer-secondary text-alzheimer-secondary hover:bg-alzheimer-tertiary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button 
                  className="bg-alzheimer-primary hover:bg-alzheimer-accent text-white flex items-center"
                  onClick={() => navigate('/profile')}
                >
                  <UserCircle className="mr-2" size={18} />
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="mr-2 border-alzheimer-secondary text-alzheimer-secondary hover:bg-alzheimer-tertiary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-alzheimer-dark hover:text-alzheimer-primary hover:bg-alzheimer-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-alzheimer-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-alzheimer-dark hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition duration-150 ease-in-out">
            About Alzheimer's
          </Link>
          <Link to="/research" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-alzheimer-dark hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition duration-150 ease-in-out">
            Research
          </Link>
          <Link to="/assessment" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-alzheimer-dark hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition duration-150 ease-in-out">
            Risk Assessment
          </Link>
          <Link to="/news" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-alzheimer-dark hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition duration-150 ease-in-out">
            Latest News
          </Link>
          <div className="flex flex-col space-y-2 px-3 py-2">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-alzheimer-dark hover:bg-alzheimer-tertiary hover:border-alzheimer-primary transition duration-150 ease-in-out">
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full border-alzheimer-secondary text-alzheimer-secondary hover:bg-alzheimer-tertiary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full border-alzheimer-secondary text-alzheimer-secondary hover:bg-alzheimer-tertiary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="w-full bg-alzheimer-primary hover:bg-alzheimer-accent text-white"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
