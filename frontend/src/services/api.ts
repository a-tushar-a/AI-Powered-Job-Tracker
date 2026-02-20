import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // This will be proxied by Vite to the backend server
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock data
const MOCK_DASHBOARD_DATA = {
    totalApplications: 128,
    interviewsScheduled: 12,
    activeProcesses: 3,
    offersReceived: 1,
    applicationTrends: [
        { name: 'Jan', applications: 40, interviews: 24 },
        { name: 'Feb', applications: 30, interviews: 13 },
        { name: 'Mar', applications: 20, interviews: 58 },
        { name: 'Apr', applications: 27, interviews: 39 },
        { name: 'May', applications: 18, interviews: 48 },
        { name: 'Jun', applications: 23, interviews: 38 },
        { name: 'Jul', applications: 34, interviews: 43 },
    ]
}

// A mock API function
export const getDashboardData = async () => {
  console.log("Fetching dashboard data (mocked)");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: MOCK_DASHBOARD_DATA });
    }, 1500);
  });
};

// Example of a real API function structure
/*
export const getDashboardData = () => {
  return apiClient.get("/dashboard");
};
*/

export default apiClient;
