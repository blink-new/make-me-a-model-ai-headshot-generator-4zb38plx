import React from 'react';
import { ArrowRight } from 'lucide-react';

const BeforeAfterShowcase: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-4">
        {/* Before Photo */}
        <div className="relative flex-1">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw2fHx3b21hbiUyMGZhY2UlMjBubyUyMG1ha2V1cCUyMG5hdHVyYWwlMjBsaWdodGluZyUyMHBvcnRyYWl0fGVufDB8MXx8fDE3NTM3Nzk0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Before - Natural face with no makeup"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Before
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            <strong>Natural Face</strong>
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <div className="bg-indigo-100 rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        {/* After Photo */}
        <div className="relative flex-1">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1616358278773-e5e4154a336f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtb2RlbCUyMGhlYWRzaG90JTIwbWFrZXVwJTIwc3R1ZGlvJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwwfDF8fHwxNzUzNzc5NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="After - Professional model with makeup and styling"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              After
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            <strong>Model Headshot</strong>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-3">
          *Conceptual example showing the type of transformation possible
        </p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Upload Your Photo to Transform
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterShowcase;