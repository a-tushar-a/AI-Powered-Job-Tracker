import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth"; // Import the Auth component
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";

// PrivateRoute component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for token
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/auth" element={<Auth />} /> {/* Auth route */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Add other routes here as they are built */}
          </Routes>
        </Layout>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;
