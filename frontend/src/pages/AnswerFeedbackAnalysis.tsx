import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAnswerFeedbackAndAnalysis } from '../services/api';

interface AnalysisResult {
  score: number;
  feedback: string;
  communicationAnalysis: string;
}

const AnswerFeedbackAnalysis: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeAnswer = async () => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const data = await getAnswerFeedbackAndAnalysis(answer);
      setAnalysisResult(data.analysis);
    } catch (err) {
      setError('Failed to analyze answer. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">Answer Feedback + Communication Analysis</h1>
      <p className="mt-2 text-gray-600">Get detailed feedback on your interview answers and communication style.</p>

      <div className="mt-8">
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-neutral">
            Your Interview Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={10}
            className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleAnalyzeAnswer}
            disabled={loading || !answer}
          >
            {loading ? 'Analyzing...' : 'Analyze Answer'}
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
            <p className="mt-2 text-gray-800">Score: {analysisResult.score}/100</p>
            <h3 className="text-xl font-bold text-neutral mt-4">Feedback:</h3>
            <p className="mt-2 text-gray-700">{analysisResult.feedback}</p>
            <h3 className="text-xl font-bold text-neutral mt-4">Communication Analysis:</h3>
            <p className="mt-2 text-gray-700">{analysisResult.communicationAnalysis}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AnswerFeedbackAnalysis;
