import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAISkillRoadmap } from '../services/api';

interface RoadmapItem {
  month: string;
  skills: string[];
}

const AISkillRoadmapGenerator: React.FC = () => {
  const [currentSkills, setCurrentSkills] = useState('');
  const [desiredRole, setDesiredRole] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setError(null);
    setRoadmap([]);

    try {
      const data = await getAISkillRoadmap(currentSkills, desiredRole);
      setRoadmap(data.roadmap);
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
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
      <h1 className="text-3xl font-bold text-neutral">AI Skill Roadmap Generator</h1>
      <p className="mt-2 text-gray-600">Generate a 2-3 month skill development plan to achieve your desired role.</p>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="currentSkills" className="block text-sm font-medium text-neutral">
              Your Current Skills (comma-separated)
            </label>
            <textarea
              id="currentSkills"
              name="currentSkills"
              rows={5}
              className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="desiredRole" className="block text-sm font-medium text-neutral">
              Desired Role
            </label>
            <input
              type="text"
              id="desiredRole"
              name="desiredRole"
              className="block w-full mt-1 bg-base-100 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              value={desiredRole}
              onChange={(e) => setDesiredRole(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            onClick={handleGenerateRoadmap}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>

        {error && <p className="mt-4 text-error">{error}</p>}

        {roadmap.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-neutral">Your 2-3 Month Skill Roadmap</h2>
            <div className="mt-4 space-y-4">
              {roadmap.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-base-100 rounded-md shadow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-neutral">{item.month}</h3>
                  <ul className="list-disc list-inside mt-1 text-gray-600">
                    {item.skills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AISkillRoadmapGenerator;
