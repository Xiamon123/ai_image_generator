import React from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <ImageIcon className="h-24 w-24 text-indigo-600 mb-8" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ImageGen</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Generate stunning images with the power of AI. Simply enter a prompt, and watch as your imagination comes to life.
      </p>
      <Link
        to="/generate"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Start Generating
      </Link>
    </div>
  );
};

export default Home;