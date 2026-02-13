import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeRejectionMail } from '../services/api';

interface AnalysisResult {
  reason: string;
  suggestions: string[];
}

const RejectionMailAnalyzer: React.FC = () => {
  const [rejectionMail, setRejectionMail] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeMail = async () => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const data = await analyzeRejectionMail(rejectionMail);
      setAnalysisResult(data.analysis);
    } catch (err) {
      setError('Failed to analyze rejection mail. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">Rejection Mail Analyzer</h1>
      <p className="mt-2 text-gray-600">Understand why your application was rejected and get actionable advice.</p>

      <div className="mt-8">
        <div>
          <label htmlFor="rejectionMail" className="block text-sm font-medium text-neutral">
            Paste Rejection Mail Content
          </label>
          <textarea
            id="rejectionMail"
            name="rejectionMail"
            rows={10}
            className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            value={rejectionMail}
            onChange={(e) => setRejectionMail(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleAnalyzeMail}
            disabled={loading || !rejectionMail}
          >
            {loading ? 'Analyzing...' : 'Analyze Mail'}
          </button>
        </div>

        {error && <p className="mt-4 text-error">{error}</p>}

        {analysisResult && (
          <motion.div
            className="mt-8 p-4 bg-base-100 rounded-md shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-neutral">Analysis Result</h2>
            <h3 className="text-xl font-bold text-neutral mt-4">Reason for Rejection:</h3>
            <p className="mt-2 text-gray-700">{analysisResult.reason}</p>
            <h3 className="text-xl font-bold text-neutral mt-4">Suggestions for Improvement:</h3>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {analysisResult.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RejectionMailAnalyzer;
