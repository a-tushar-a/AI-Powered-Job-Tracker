const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/resume-jd-match', (req, res) => {
  const { resume, jobDescription } = req.body;
  // Mock logic to calculate match score
  const score = Math.floor(Math.random() * 101);
  res.json({ score });
});

app.post('/api/skill-gap-analysis', (req, res) => {
  const { resume, jobDescription } = req.body;
  // Mock logic to determine skill gaps
  const requiredSkills = [
    { skill: 'React', present: true },
    { skill: 'TypeScript', present: true },
    { skill: 'GraphQL', present: false },
    { skill: 'Node.js', present: false },
  ];
  const yourSkills = [
    { skill: 'React', present: true },
    { skill: 'TypeScript', present: true },
    { skill: 'JavaScript', present: true },
    { skill: 'HTML/CSS', present: true },
  ];
  res.json({ requiredSkills, yourSkills });
});

app.post('/api/resume-improvement', (req, res) => {
  const { resume } = req.body;
  // Mock logic to generate resume improvement suggestions
  const suggestions = [
    { title: 'Add quantifiable achievements', description: 'Instead of saying "Managed a team," say "Managed a team of 5 engineers and increased productivity by 15%."' },
    { title: 'Tailor your resume to the job description', description: 'Highlight the skills and experiences that are most relevant to the job you are applying for.' },
    { title: 'Use action verbs', description: 'Start each bullet point with a strong action verb to make your accomplishments more impactful.' },
  ];
  res.json({ suggestions });
});

app.post('/api/ai-skill-roadmap', (req, res) => {
  const { currentSkills, desiredRole } = req.body;
  // Mock logic to generate a skill roadmap
  const roadmap = [
    { month: 'Month 1', skills: ['Learn advanced React hooks', 'Master TypeScript generics'] },
    { month: 'Month 2', skills: ['Build a GraphQL API with Node.js', 'Implement authentication with JWT'] },
    { month: 'Month 3', skills: ['Contribute to an open-source project', 'Prepare for system design interviews'] },
  ];
  res.json({ roadmap });
});

app.post('/api/smart-job-apply-recommendation', (req, res) => {
  const { resume, jobDescription } = req.body;
  // Mock logic for job apply recommendation
  const recommendation = {
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    applyLink: 'https://example.com/job/123',
    suggestion: Math.random() > 0.5 ? 'Apply' : 'Skip',
    reason: Math.random() > 0.5 ? 'Strong match with required skills and experience.' : 'Limited alignment with your current skill set.',
  };
  res.json({ recommendation });
});

app.post('/api/interview-probability', (req, res) => {
  const { resume, jobDescription } = req.body;
  // Mock logic to predict interview probability
  const probability = Math.floor(Math.random() * 101);
  res.json({ probability });
});

app.post('/api/ai-cover-letter', (req, res) => {
  const { resume, jobDescription } = req.body;
  // Mock logic to generate a cover letter
  const coverLetter = `Dear Hiring Manager,

  I am writing to express my keen interest in the position at your esteemed company, as advertised on [Platform]. With a solid background in ${resume.substring(0, 50)}... and a passion for ${jobDescription.substring(0, 50)}..., I am confident in my ability to contribute effectively to your team.

  My experience aligns well with the requirements outlined in the job description. I am particularly adept at [mention a key skill from resume relevant to JD] and have a proven track record of [mention a quantifiable achievement].

  Thank you for your time and consideration. I look forward to the opportunity to discuss my application further.

  Sincerely,
  [Your Name]`;
  res.json({ coverLetter });
});

let mockInterviewQuestions = [];
let interviewQuestionIndex = 0;

app.post('/api/ai-mock-interview/start', (req, res) => {
  const { role } = req.body;
  // Mock interview questions based on role
  if (role.toLowerCase().includes('frontend')) {
    mockInterviewQuestions = [
      { id: '1', question: 'Tell me about a challenging frontend project you worked on and how you overcame obstacles.' },
      { id: '2', question: 'Explain the concept of React hooks and their benefits.' },
      { id: '3', question: 'How do you ensure cross-browser compatibility in your web applications?' },
    ];
  } else if (role.toLowerCase().includes('data scientist')) {
    mockInterviewQuestions = [
      { id: '1', question: 'Describe a time you used data to solve a complex problem.' },
      { id: '2', question: 'Explain the difference between supervised and unsupervised learning.' },
      { id: '3', question: 'How do you handle missing data in a dataset?' },
    ];
  } else {
    mockInterviewQuestions = [
      { id: '1', question: 'Tell me about yourself.' },
      { id: '2', question: 'Why are you interested in this role?' },
      { id: '3', question: 'What are your strengths and weaknesses?' },
    ];
  }
  interviewQuestionIndex = 0;
  res.json({ question: mockInterviewQuestions[interviewQuestionIndex] });
});

app.post('/api/ai-mock-interview/submit', (req, res) => {
  const { questionId, answer } = req.body;
  // Mock feedback
  const score = Math.floor(Math.random() * 101);
  const feedback = score > 70 ? 'Excellent answer, very comprehensive.' : 'Good attempt, but could be more detailed.';

  interviewQuestionIndex++;
  const nextQuestion = mockInterviewQuestions[interviewQuestionIndex] || null;

  res.json({ feedback: { score, feedback }, nextQuestion });
});

app.post('/api/answer-feedback-analysis', (req, res) => {
  const { answer } = req.body;
  // Mock logic to provide answer feedback and communication analysis
  const score = Math.floor(Math.random() * 101);
  let feedback = '';
  let communicationAnalysis = '';

  if (score > 80) {
    feedback = 'Your answer was very strong, articulate, and directly addressed the question. Excellent job!';
    communicationAnalysis = 'Your communication was clear, confident, and engaging. You maintained good eye contact (if applicable) and structured your thoughts well.';
  } else if (score > 60) {
    feedback = "Your answer was good, but there's room for improvement in [specific area]. Try to be more [suggested improvement].";

    communicationAnalysis = 'Your communication was generally clear, but you could work on [aspect like conciseness, elaboration, or confidence].';
  } else {
    feedback = 'Your answer missed some key points. Consider [specific suggestions].';
    communicationAnalysis = 'Your communication could be improved by focusing on [aspect like clarity, structure, or confidence].';
  }
  res.json({ analysis: { score, feedback, communicationAnalysis } });
});

app.post('/api/rejection-mail-analyzer', (req, res) => {
  const { rejectionMail } = req.body;
  // Mock logic to analyze rejection mail
  const reasons = ['Lack of specific skills', 'Stronger candidates', 'Experience mismatch', 'Cultural fit'];
  const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
  const suggestions = [
    'Tailor your resume more closely to the job description.',
    'Highlight quantifiable achievements in your experience.',
    'Gain more experience in relevant areas.',
    'Network more within the industry.',
  ];
  res.json({ analysis: { reason: randomReason, suggestions: suggestions.slice(0, Math.floor(Math.random() * suggestions.length) + 1) } });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
