import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading';
import JobListing from '../components/JobListing';
import JobForm from '../components/JobForm'; // Import JobForm component

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  appliedDate: string;
  notes?: string;
}

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [editingJob, setEditingJob] = useState<Job | null>(null); // State for job being edited

  const fetchJobs = async () => {
    if (user) {
      try {
        setJobsLoading(true);
        const response = await axiosInstance.get('/jobs');
        setJobs(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
        console.error('Error fetching jobs:', err);
      } finally {
        setJobsLoading(false);
      }
    } else {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchJobs();
    }
  }, [user, authLoading]);

  const handleAddJobClick = () => {
    setEditingJob(null); // Clear any editing state
    setShowForm(true); // Show form for adding
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job); // Set job for editing
    setShowForm(true); // Show form for editing
  };

  const handleDeleteJob = async (jobId: number) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await axiosInstance.delete(`/jobs/${jobId}`);
        fetchJobs(); // Refetch jobs after deletion
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete job');
        console.error('Error deleting job:', err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false); // Hide form
    setEditingJob(null); // Clear editing state
    fetchJobs(); // Refetch jobs to update the list
  };

  const handleFormCancel = () => {
    setShowForm(false); // Hide form
    setEditingJob(null); // Clear editing state
  };

  if (authLoading || jobsLoading) {
    return <Loading />;
  }

  if (!user) {
    return <p className="text-red-500 text-center text-xl">Please log in to view the dashboard.</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user.name}!</h2>
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Your Job Applications</h3>

      {showForm ? (
        <JobForm
          initialData={editingJob}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <JobListing jobs={jobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />
          <button
            onClick={handleAddJobClick}
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 text-lg"
          >
            Add New Job
          </button>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
