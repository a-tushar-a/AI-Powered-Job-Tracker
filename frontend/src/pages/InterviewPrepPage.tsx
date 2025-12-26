import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const InterviewPrepPage: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleGenerateQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setQuestions([]);

    if (!user) {
      setError('You must be logged in to generate interview questions.');
      return;
    }
    if (!jobRole) {
      setError('Please provide a job role.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/ai/generate-questions', {
        jobRole,
      });
      setQuestions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate questions.');
      console.error('Interview questions generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Interview Preparation</h2>

      <form onSubmit={handleGenerateQuestions} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobRole">
            Job Role
          </label>
          <input
            type="text"
            id="jobRole"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Software Engineer, Data Scientist"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>

      {questions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Generated Interview Questions</h3>
          <ul className="list-disc list-inside text-gray-700">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPrepPage;
