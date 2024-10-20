import React, { useState } from 'react';
import axios from 'axios';
import { ImageIcon, Loader, AlertCircle } from 'lucide-react';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setGeneratedImage('');
    setImageDescription('');

    try {
      // Attempt to use the OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        { prompt, n: 1, size: "1024x1024" },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.data?.[0]?.url) {
        setGeneratedImage(response.data.data[0].url);
        setImageDescription(`AI-generated image based on the prompt: "${prompt}"`);
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      
      // Fallback to mock image generation
      const mockImageUrl = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1024/1024`;
      setGeneratedImage(mockImageUrl);
      setError('OpenAI service is unavailable. Displaying a placeholder image.');
      
      // Generate a description for the placeholder image
      const description = generatePlaceholderDescription(prompt);
      setImageDescription(description);
    } finally {
      setLoading(false);
    }
  };

  const generatePlaceholderDescription = (prompt: string) => {
    const adjectives = ['vibrant', 'serene', 'mysterious', 'energetic', 'calming', 'inspiring'];
    const subjects = ['landscape', 'portrait', 'still life', 'abstract composition', 'nature scene', 'urban environment'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    
    return `A ${randomAdjective} ${randomSubject} that might represent: "${prompt}". This is a placeholder image.`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">AI Image Generator</h1>
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-gray-700 text-sm font-bold mb-2">Enter your prompt:</label>
        <textarea
          id="prompt"
          rows={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
        ></textarea>
      </div>
      <button
        onClick={generateImage}
        disabled={loading || !prompt}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
      >
        {loading ? <Loader className="animate-spin h-5 w-5 mr-3" /> : <ImageIcon className="h-5 w-5 mr-2" />}
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      {generatedImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Generated Image:</h2>
          <img src={generatedImage} alt="Generated" className="w-full rounded-lg shadow-lg mb-4" />
          {imageDescription && (
            <p className="text-gray-700 italic">{imageDescription}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;