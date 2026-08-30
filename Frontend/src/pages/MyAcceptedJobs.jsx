import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MyAcceptedJobs() {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();

  async function fetchAcceptedJobs() {
    await axios.get(`http://localhost:5000/api/jobs/my-accepted`,{
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

  function handleComplete(jobId) {
    axios.put(`http://localhost:5000/api/jobs/${jobId}/complete`,null,{
      headers:{Authorization :`Bearer ${token}`}
    }).then((res)=>{
        fetchAcceptedJobs();
    })
    .catch((err)=>{
        console.log("Failed to complete job",err);
      })
    }


  return (
    <div>
      <h2> My Accepted Jobs</h2>
      {jobs.length === 0 && <h2>No accepted jobs yet</h2>}
      {jobs.map((job) => (
        <div key={job._id}>
          <p>{job.wasteType} - {job.location}</p>
          <p>Status: {job.status}</p>
          {job.status === "accepted" && (
            <button onClick={() => handleComplete(job._id)}>Complete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyAcceptedJobs;