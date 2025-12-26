import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  appliedDate: string;
  notes?: string;
}

interface JobListingProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: number) => void;
}

const JobListing: React.FC<JobListingProps> = ({ jobs, onEdit, onDelete }) => {
  const navigate = useNavigate();

  if (jobs.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">
        No job applications found. Start tracking now!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl font-bold text-blue-700">{job.role}</h4>
          <p className="text-gray-700 mb-2">{job.company}</p>
          <p className="text-sm text-gray-600">
            Status: <span className="font-semibold">{job.status}</span>
          </p>
          <p className="text-sm text-gray-600">
            Applied: {new Date(job.appliedDate).toLocaleDateString()}
          </p>
          {job.notes && <p className="text-sm text-gray-600 mt-2">Notes: {job.notes}</p>}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit(job)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => navigate(`/analyze-resume/${job.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Analyze Resume
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListing;