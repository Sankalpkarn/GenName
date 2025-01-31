import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, Globe2, Clock, Users, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 sm:pt-24 lg:pt-32">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <Baby className="h-20 w-20 text-pink-500" />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
                Find the Perfect Name for
                <span className="block text-pink-500">Your Little One</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
                Discover meaningful names from different cultures, traditions, and time periods. Our AI-powered system helps you find the perfect name that resonates with your heritage.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate('/name-finder')}
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-pink-500 text-white text-lg font-semibold hover:bg-pink-600 transition-colors duration-200"
                >
                  Try Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Name Finder?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white mb-4">
                <Globe2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Diversity</h3>
              <p className="text-gray-600">Access names from various cultures and traditions around the world.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Historical Context</h3>
              <p className="text-gray-600">Explore names from different time periods and understand their origins.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-xl">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Religious Significance</h3>
              <p className="text-gray-600">Find names that align with your religious and cultural background.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find the Perfect Name?</h2>
            <p className="text-xl text-pink-100 mb-8">Start your journey to discover meaningful names that tell a story.</p>
            <button
              onClick={() => navigate('/name-finder')}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-pink-500 text-lg font-semibold hover:bg-pink-50 transition-colors duration-200"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}