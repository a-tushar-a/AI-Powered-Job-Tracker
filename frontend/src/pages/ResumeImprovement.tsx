import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getResumeImprovementSuggestions } from '../services/api';

interface Suggestion {
  title: string;
  description: string;
}

const ResumeImprovement: React.FC = () => {
  const [resume, setResume] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const data = await getResumeImprovementSuggestions(resume);
      setSuggestions(data.suggestions);
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-neutral">AI Resume Improvement Suggestions</h1>
      <p className="mt-2 text-gray-600">Get suggestions to improve your resume and increase your chances of getting hired.</p>

      <div className="mt-8">
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-neutral">
            Your Resume
          </label>
          <textarea
            id="resume"
            name="resume"
            rows={10}
            className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Suggestions'}
          </button>
        </div>

        {error && <p className="mt-4 text-error">{error}</p>}

        {suggestions.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-neutral">Suggestions</h2>
            <ul className="mt-4 space-y-4">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="p-4 bg-base-100 rounded-md shadow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-neutral">{suggestion.title}</h3>
                  <p className="mt-1 text-gray-600">{suggestion.description}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeImprovement;
