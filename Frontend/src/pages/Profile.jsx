import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const url = user?.role === 'poster'
      ? 'http://localhost:5000/api/jobs/my-jobs'
      : 'http://localhost:5000/api/jobs/my-accepted';

    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log('Failed to fetch profile jobs', err);
      });
  }, []);

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <p>Role: {user?.role}</p>

      {user?.role === 'poster' && <p>Jobs posted: {jobs.length}</p>}
      {user?.role === 'collector' && <p>Jobs accepted: {jobs.length}</p>}
    </div>
  );
}

export default Profile;