import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getResumeJDMatchScore } from '../services/api';

const ResumeJDMatch: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setMatchScore(null);

    try {
      const data = await getResumeJDMatchScore(resume, jobDescription);
      setMatchScore(data.score);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">Resume-JD Match Score</h1>
      <p className="mt-2 text-gray-600">Analyze your resume against a job description to get a match score.</p>

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
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && <p className="mt-4 text-error">{error}</p>}

        {matchScore !== null && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold text-neutral">Match Score</h2>
            <div className="flex items-center justify-center w-32 h-32 mt-4 rounded-full bg-gradient-to-r from-accent to-primary">
              <span className="text-4xl font-bold text-white">{matchScore}%</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeJDMatch;
