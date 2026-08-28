import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { user, token } = useAuth();

  function fetchJobs(){
    axios.get('http://localhost:5000/api/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch jobs:', error);
      });
  }

  useEffect(() => {
    fetchJobs()
  }, []);

  function handleAccept(jobId) {
    axios.put(`http://localhost:5000/api/jobs/${jobId}/accept`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => { fetchJobs(); })
      .catch((err) => {
        console.log("Failed to accept job:", err);
      })
  }

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.length===0&&<h5>No Jobs Available</h5>}
      {jobs.map((job) => (
        <div key={job._id}>
          <p>{job.wasteType} - {job.location}</p>
          <p>{job.description}</p>
          {!user && <p>Log in to accept jobs.</p>}
          {user?.role === 'collector' && job.status === 'open' && (
            <button onClick={() => handleAccept(job._id)}>Accept</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Jobs;