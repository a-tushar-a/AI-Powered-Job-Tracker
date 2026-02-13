import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { getSkillGapAnalysis } from '../services/api';

interface Skill {
  skill: string;
  present: boolean;
}

const SkillGapAnalysis: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<Skill[]>([]);
  const [yourSkills, setYourSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setRequiredSkills([]);
    setYourSkills([]);

    try {
      const data = await getSkillGapAnalysis(resume, jobDescription);
      setRequiredSkills(data.requiredSkills);
      setYourSkills(data.yourSkills);
  } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Failed to analyze. Please try again.');
  } 
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
      <h1 className="text-3xl font-bold text-neutral">Detailed Skill Gap Analysis</h1>
      <p className="mt-2 text-gray-600">Identify the skills you need to improve to match the job requirements.</p>

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

        {(requiredSkills.length > 0 || yourSkills.length > 0) && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-neutral">Required Skills</h2>
                <ul className="mt-4 space-y-2">
                  {requiredSkills.map((skill, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className={skill.present ? 'text-success' : 'text-error'}>{skill.present ? '✓' : '✗'}</span>
                      <span className="ml-2">{skill.skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral">Your Skills</h2>
                <ul className="mt-4 space-y-2">
                  {yourSkills.map((skill, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span className="text-success">✓</span>
                      <span className="ml-2">{skill.skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillGapAnalysis;
