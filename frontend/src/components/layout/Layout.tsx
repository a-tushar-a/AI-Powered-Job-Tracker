import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-base-100 text-neutral">
      <div className="w-64 bg-neutral shadow-md">
        {/* Sidebar */}
        <div className="p-5">
          <h1 className="text-2xl font-bold text-white">AI Job Tracker</h1>
        </div>
        <nav className="mt-5">
          <NavLink to="/" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Dashboard</span>
          </NavLink>
          <NavLink to="/resume-jd-match" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Resume-JD Match</span>
          </NavLink>
          <NavLink to="/skill-gap-analysis" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Skill Gap Analysis</span>
          </NavLink>
          <NavLink to="/resume-improvement" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Resume Improvement</span>
          </NavLink>
          <NavLink to="/ai-skill-roadmap-generator" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">AI Skill Roadmap</span>
          </NavLink>
          <NavLink to="/smart-job-apply-recommendation" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Smart Apply Rec.</span>
          </NavLink>
          <NavLink to="/interview-probability-predictor" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Interview Probability</span>
          </NavLink>
          <NavLink to="/ai-cover-letter-generator" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">AI Cover Letter</span>
          </NavLink>
          <NavLink to="/ai-mock-interview-mode" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">AI Mock Interview</span>
          </NavLink>
          <NavLink to="/answer-feedback-analysis" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Answer Feedback</span>
          </NavLink>
          <NavLink to="/rejection-mail-analyzer" className={({ isActive }) => `flex items-center px-6 py-2 mt-4 text-gray-300 hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}>
            <span className="mx-4">Rejection Mail Analyzer</span>
          </NavLink>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-base-100 border-b-4 border-primary">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none lg:hidden">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <button className="flex mx-4 text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M12 21V17M12 21H15M12 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative">
              <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80" alt="Your avatar" />
              </button>
              <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl" style={{display: 'none'}}>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Products</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">Logout</a>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container px-6 py-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
