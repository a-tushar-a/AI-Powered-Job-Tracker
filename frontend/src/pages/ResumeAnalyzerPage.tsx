import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

interface AnalysisResult {
  atsScore: number;
  missingSkills: string[];
  suggestions: string[];
}

const ResumeAnalyzerPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>(); // Get jobId from URL params
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAnalysisResult(null);

    if (!user) {
      setError('You must be logged in to analyze resumes.');
      return;
    }
    if (!resumeText || !jobDescription) {
      setError('Please provide both resume text and job description.');
      return;
    }
    if (!jobId) {
      setError('Job ID is missing. Please select a job to analyze against.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(`/ai/analyze-resume/${jobId}`, {
        resume: resumeText,
        jobDescription: jobDescription,
      });
      setAnalysisResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze resume.');
      console.error('Resume analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Resume Analyzer</h2>

      {!jobId && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Missing Job ID</p>
          <p>Please select a job application from your dashboard to analyze your resume against it.</p>
          <button onClick={() => navigate('/dashboard')} className="mt-2 text-blue-700 hover:underline">Go to Dashboard</button>
        </div>
      )}

      <form onSubmit={handleAnalyze} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resumeText">
            Your Resume Text
          </label>
          <textarea
            id="resumeText"
            rows={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading || !jobId}
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {analysisResult && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Analysis Results</h3>
          <div className="mb-4">
            <p className="text-lg font-semibold">ATS Score: <span className="text-blue-600">{(analysisResult.atsScore * 100).toFixed(2)}%</span></p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold mb-2">Missing Skills:</h4>
            {analysisResult.missingSkills && analysisResult.missingSkills.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {analysisResult.missingSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No significant missing skills detected.</p>
            )}
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Suggestions for Improvement:</h4>
            {analysisResult.suggestions && analysisResult.suggestions.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No specific suggestions at this time.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
