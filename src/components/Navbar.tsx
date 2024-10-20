import React from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon, LogIn, UserPlus } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ImageIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ImageGen</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/generate" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Generate</Link>
            <Link to="/login" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center">
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Link>
            <Link to="/signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center">
              <UserPlus className="h-4 w-4 mr-1" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;