import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const getResumeJDMatchScore = async (resume: string, jobDescription: string) => {
  const response = await api.post('/resume-jd-match', { resume, jobDescription });
  return response.data;
};

export const getSkillGapAnalysis = async (resume: string, jobDescription: string) => {
  const response = await api.post('/skill-gap-analysis', { resume, jobDescription });
  return response.data;
};

export const getResumeImprovementSuggestions = async (resume: string) => {
  const response = await api.post('/resume-improvement', { resume });
  return response.data;
};

export const getAISkillRoadmap = async (currentSkills: string, desiredRole: string) => {
  const response = await api.post('/ai-skill-roadmap', { currentSkills, desiredRole });
  return response.data;
};

export const getSmartJobApplyRecommendation = async (resume: string, jobDescription: string) => {
  const response = await api.post('/smart-job-apply-recommendation', { resume, jobDescription });
  return response.data;
};

export const getInterviewProbability = async (resume: string, jobDescription: string) => {
  const response = await api.post('/interview-probability', { resume, jobDescription });
  return response.data;
};

export const generateAICoverLetter = async (resume: string, jobDescription: string) => {
  const response = await api.post('/ai-cover-letter', { resume, jobDescription });
  return response.data;
};

export const startAIMockInterview = async (role: string) => {
  const response = await api.post('/ai-mock-interview/start', { role });
  return response.data;
};

export const submitInterviewAnswer = async (questionId: string, answer: string) => {
  const response = await api.post('/ai-mock-interview/submit', { questionId, answer });
  return response.data;
};

export const getAnswerFeedbackAndAnalysis = async (answer: string) => {
  const response = await api.post('/answer-feedback-analysis', { answer });
  return response.data;
};

export const analyzeRejectionMail = async (rejectionMail: string) => {
  const response = await api.post('/rejection-mail-analyzer', { rejectionMail });
  return response.data;
};
