import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { startAIMockInterview, submitInterviewAnswer } from '../services/api';

interface InterviewQuestion {
  id: string;
  question: string;
}

interface InterviewFeedback {
  score: number;
  feedback: string;
}

const AIMockInterviewMode: React.FC = () => {
  const [role, setRole] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setAnswer('');
    try {
      const data = await startAIMockInterview(role);
      setInterviewStarted(true);
      setCurrentQuestion(data.question);
    } catch (err) {
      setError('Failed to start interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      if (currentQuestion) {
        const data = await submitInterviewAnswer(currentQuestion.id, answer);
        setFeedback(data.feedback);
        setCurrentQuestion(data.nextQuestion || null); // Move to next question or end interview
        setAnswer('');
      }
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">AI Mock Interview Mode</h1>
      <p className="mt-2 text-gray-600">Practice your interview skills with an AI interviewer.</p>

      {!interviewStarted ? (
        <div className="mt-8 p-4 bg-base-100 rounded-md shadow">
          <label htmlFor="role" className="block text-sm font-medium text-neutral">
            Interview Role (e.g., "Frontend Developer", "Data Scientist")
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className="block w-full mt-1 bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleStartInterview}
            disabled={loading || !role}
          >
            {loading ? 'Starting...' : 'Start Interview'}
          </button>
          {error && <p className="mt-4 text-error">{error}</p>}
        </div>
      ) : (
        <div className="mt-8 p-4 bg-base-100 rounded-md shadow">
          {currentQuestion ? (
            <div>
              <h2 className="text-2xl font-bold text-neutral">Question:</h2>
              <p className="mt-2 text-gray-800">{currentQuestion.question}</p>

              <label htmlFor="answer" className="block text-sm font-medium text-neutral mt-4">
                Your Answer
              </label>
              <textarea
                id="answer"
                name="answer"
                rows={5}
                className="block w-full mt-1 bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                onClick={handleSubmitAnswer}
                disabled={loading || !answer}
              >
                {loading ? 'Submitting...' : 'Submit Answer'}
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-neutral">Interview Completed!</h2>
              <p className="mt-2 text-gray-800">You have answered all questions.</p>
            </div>
          )}

          {feedback && (
            <motion.div
              className="mt-6 p-4 bg-gray-50 rounded-md shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-neutral">Feedback: (Score: {feedback.score}/100)</h3>
              <p className="mt-2 text-gray-700">{feedback.feedback}</p>
            </motion.div>
          )}

          {error && <p className="mt-4 text-error">{error}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default AIMockInterviewMode;
