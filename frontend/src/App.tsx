import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ResumeJDMatch from './pages/ResumeJDMatch';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import ResumeImprovement from './pages/ResumeImprovement';
import AISkillRoadmapGenerator from './pages/AISkillRoadmapGenerator';
import SmartJobApplyRecommendation from './pages/SmartJobApplyRecommendation';
import InterviewProbabilityPredictor from './pages/InterviewProbabilityPredictor';
import AICoverLetterGenerator from './pages/AICoverLetterGenerator';
import AIMockInterviewMode from './pages/AIMockInterviewMode';
import AnswerFeedbackAnalysis from './pages/AnswerFeedbackAnalysis';
import RejectionMailAnalyzer from './pages/RejectionMailAnalyzer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume-jd-match" element={<ResumeJDMatch />} />
          <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
          <Route path="/resume-improvement" element={<ResumeImprovement />} />
          <Route path="/ai-skill-roadmap-generator" element={<AISkillRoadmapGenerator />} />
          <Route path="/smart-job-apply-recommendation" element={<SmartJobApplyRecommendation />} />
          <Route path="/interview-probability-predictor" element={<InterviewProbabilityPredictor />} />
          <Route path="/ai-cover-letter-generator" element={<AICoverLetterGenerator />} />
          <Route path="/ai-mock-interview-mode" element={<AIMockInterviewMode />} />
          <Route path="/answer-feedback-analysis" element={<AnswerFeedbackAnalysis />} />
          <Route path="/rejection-mail-analyzer" element={<RejectionMailAnalyzer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
