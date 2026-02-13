import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSmartJobApplyRecommendation } from '../services/api';

interface JobRecommendation {
  title: string;
  company: string;
  applyLink: string;
  suggestion: 'Apply' | 'Skip';
  reason: string;
}

const SmartJobApplyRecommendation: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [recommendation, setRecommendation] = useState<JobRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const data = await getSmartJobApplyRecommendation(resume, jobDescription);
      setRecommendation(data.recommendation);
    } catch (err) {
      setError('Failed to get recommendation. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">Smart Job Apply Recommendation</h1>
      <p className="mt-2 text-gray-600">Get intelligent suggestions to apply or skip a job based on your resume and job description.</p>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-neutral">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows={10}
              className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleGetRecommendation}
            disabled={loading}
          >
            {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </button>
        </div>

        {error && <p className="mt-4 text-error">{error}</p>}

        {recommendation && (
          <motion.div
            className="mt-8 p-4 bg-base-100 rounded-md shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-neutral">Job Recommendation</h2>
            <p className="mt-2 text-gray-600">
              <span className="font-bold">{recommendation.title}</span> at{' '}
              <span className="font-bold">{recommendation.company}</span>
            </p>
            <p className={`text-lg font-bold mt-2 ${recommendation.suggestion === 'Apply' ? 'text-success' : 'text-error'}`}>
              Suggestion: {recommendation.suggestion}
            </p>
            <p className="mt-2 text-gray-600">Reason: {recommendation.reason}</p>
            {recommendation.applyLink && (
              <a href={recommendation.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-accent border border-transparent rounded-md shadow-sm hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                Apply Now
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SmartJobApplyRecommendation;
