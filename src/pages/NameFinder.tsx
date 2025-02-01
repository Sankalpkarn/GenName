import React, { useState } from 'react';
import { Globe2, Calendar, Church, Loader2, Baby,ArrowLeft, Smile } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

interface FormData {
  location: string;
  year: number;
  gender: string;
  religion: string;
}

function NameFinder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    location: '',
    year: new Date().getFullYear(),
    gender: '',
    religion: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Ensure the API key is set up correctly
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key is missing');
      }
      console.log("API Key:", apiKey);

     
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Creating the prompt based on user inputs
      const prompt = `Without Any Formatting Generate 5 baby name with there meanings based on:
        Location: ${formData.location}
        Year: ${formData.year}
        Gender: ${formData.gender}
        Religion: ${formData.religion}`;

      // Request to generate content
      const result = await model.generateContent(prompt);
      const generatedText = result.response.text(); // Extract response text from the model

      
      const names = generatedText
        .split('\n') // Split the response by newlines
        .filter((name: string) => name.trim() !== ''); // Filter out empty or whitespace-only names

      // Set the suggestions state with the processed names
      setSuggestions(names);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching name suggestions:", error);
      setError('Failed to generate name suggestions. Please try again.');
      setSuggestions([]); // Clear previous suggestions if an error occurs
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };
    <Analytics/>
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
        <button
            onClick={() => navigate('/')}
            className="flex items-center text-pink-500 hover:text-pink-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Baby className="h-12 w-12 text-pink-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              GenName
            </h1>
            <p className="text-lg text-gray-600">
              Discover the perfect name for your young one based on location, year, and cultural background
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Globe2 className="h-4 w-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter location (e.g., India, Russia)"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => {
                      const year = parseInt(e.target.value);
                      if (isNaN(year)) {
                        setError('Please enter a valid year.');
                        return;
                      }
                      setFormData({ ...formData, year });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1900"
                    max="2024"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Smile className="h-4 w-4 mr-2" />
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Church className="h-4 w-4 mr-2" />
                    Religious/Cultural Background
                  </label>
                  <select
                    value={formData.religion}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select background</option>
                    <option value="hindu">Hindu</option>
                    <option value="muslim">Muslim</option>
                    <option value="sikh">Sikh</option>
                    <option value="christian">Christian</option>
                    <option value="buddhist">Buddhist</option>
                    <option value="secular">Secular</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 text-white py-3 px-6 rounded-md hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Finding Names...
                  </>
                ) : (
                  'Get Name Suggestions'
                )}
              </button>
            </form>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {suggestions.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Names</h2>
                <ul className="list-disc pl-5">
                  {suggestions.map((name: string, index: number) => (
                    <li key={index} className="text-lg text-indigo-900">{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameFinder;
