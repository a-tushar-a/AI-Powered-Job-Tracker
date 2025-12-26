import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface JobStatusData {
  status: string;
  count: number;
}

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [jobStatusCounts, setJobStatusCounts] = useState<JobStatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // This would ideally be a dedicated analytics endpoint from the backend
        // For now, we'll fetch all jobs and process client-side
        const response = await axiosInstance.get('/jobs');
        const jobs = response.data;

        const counts: { [key: string]: number } = {};
        jobs.forEach((job: any) => {
          counts[job.status] = (counts[job.status] || 0) + 1;
        });

        const formattedCounts = Object.keys(counts).map(status => ({
          status,
          count: counts[status],
        }));
        setJobStatusCounts(formattedCounts);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch analytics data.');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  const statusLabels = jobStatusCounts.map(data => data.status);
  const statusCounts = jobStatusCounts.map(data => data.count);
  const backgroundColors = [
    'rgba(75, 192, 192, 0.6)', // Applied
    'rgba(153, 102, 255, 0.6)', // Interview
    'rgba(255, 159, 64, 0.6)',  // Offer
    'rgba(255, 99, 132, 0.6)',  // Rejected
    'rgba(54, 162, 235, 0.6)',  // Other
  ];

  const doughnutData = {
    labels: statusLabels,
    datasets: [
      {
        label: '# of Applications',
        data: statusCounts,
        backgroundColor: backgroundColors.slice(0, statusLabels.length),
        borderColor: backgroundColors.slice(0, statusLabels.length).map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Number of Applications',
        data: statusCounts,
        backgroundColor: backgroundColors.slice(0, statusLabels.length),
        borderColor: backgroundColors.slice(0, statusLabels.length).map(color => color.replace('0.6', '1')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Career Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Application Status Distribution</h3>
          {jobStatusCounts.length > 0 ? (
            <Doughnut data={doughnutData} />
          ) : (
            <p className="text-gray-600">No data available to display status distribution.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Applications by Status (Bar Chart)</h3>
          {jobStatusCounts.length > 0 ? (
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Job Application Status Overview',
                  },
                },
              }}
            />
          ) : (
            <p className="text-gray-600">No data available to display applications by status.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
