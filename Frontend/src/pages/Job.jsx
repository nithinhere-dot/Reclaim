import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

function Job() {
  const [jobs, setJobs] = useState([]);
  const {user}=useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch jobs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <p>{job.wasteType} - {job.location}</p>
          <p>{job.description}</p>
        </div>
      ))}
      {!user && <p>Log in to accept jobs.</p>}
      {user?.role === 'collector' && job.status === 'open' && (
        <button onClick={() => handleAccept(job._id)}>Accept</button>
      )}
    </div>
  );
}

export default Job;