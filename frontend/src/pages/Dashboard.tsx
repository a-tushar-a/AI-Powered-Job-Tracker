import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-neutral">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to your AI Job Tracker dashboard!</p>
    </motion.div>
  );
};

export default Dashboard;
