import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();

  async function fetchAcceptedJobs() {
    await axios.get(`http://localhost:5000/api/jobs/my-jobs`,{
      headers:{Authorization:`Bearer ${token}`}
    }).then((res)=>{
      setJobs(res.data)
    }).catch((err)=>{
      console.log("Failed to fetch accepted jobs",err)
    })

  }

  useEffect(() => {
    fetchAcceptedJobs();
  }, []);


  return (
    <div>
      <h2> My Jobs</h2>
      {jobs.length === 0 && <h2>No jobs yet</h2>}
      {jobs.map((job) => (
        <div key={job._id}>
          <p>{job.wasteType} - {job.location}</p>
          <p>Status: {job.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;