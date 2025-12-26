import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import AnalyticsPage from './pages/AnalyticsPage'; // Import AnalyticsPage

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<h2 className="text-xl">Welcome to your Job Tracker!</h2>} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/analyze-resume/:jobId"
              element={user ? <ResumeAnalyzerPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/interview-prep"
              element={user ? <InterviewPrepPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/analytics"
              element={user ? <AnalyticsPage /> : <Navigate to="/login" />}
            />
             <Route path="*" element={<h2 className="text-xl">404 Not Found</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;