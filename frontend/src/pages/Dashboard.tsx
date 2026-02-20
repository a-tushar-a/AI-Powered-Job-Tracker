import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Skeleton from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/api";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const useDashboardData = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await getDashboardData();
                setData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
}

const Dashboard = () => {
    const { data, loading } = useDashboardData();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/auth'); // Redirect to login page
    };

  if (loading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-64 col-span-1 md:col-span-2 lg:col-span-4" />
        </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>

      <motion.div variants={itemVariants}>
        <Card title="Total Applications" value={data.totalApplications} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card title="Interviews Scheduled" value={data.interviewsScheduled} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card title="Active Processes" value={data.activeProcesses} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card title="Offers Received" value={data.offersReceived} />
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-4">
        <Card title="Application Trends">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.applicationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#4F46E5" />
              <Bar dataKey="interviews" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
