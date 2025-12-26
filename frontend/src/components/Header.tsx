import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AI Powered Job Tracker</Link>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li><Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>
                <li><Link to="/interview-prep" className="hover:text-blue-200">Interview Prep</Link></li>
                <li><Link to="/analytics" className="hover:text-blue-200">Analytics</Link></li>
                <li><button onClick={logout} className="hover:text-blue-200 bg-transparent border-none text-white cursor-pointer">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;