import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function JobRequest() {
  const [formData, setFormData] = useState({
    wasteType: 'plastic',
    location: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const {token}=useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.location || !formData.description) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    axios.post('http://localhost:5000/api/jobs', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(()=>{
        setSuccess('Job posted successfully! A collector will be assigned soon.');
        setFormData({
            wasteType: 'plastic',
            location: '',
            description: '',
        })
    })
    .catch(err=>{
        const message = err.response?.data?.message || 'Failed to post job.';
        setError(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  };

  return (
    <div className="job-request-page">
      <Link to="/job" className="back-to-home">
        <span>←</span> Back to Jobs
      </Link>
      <div className="job-request-card">
        <div className="job-request-header">
          <Link to="/" className="job-request-logo">♻️ Reclaim</Link>
          <h2 className="job-request-title">Post a New Job</h2>
          <p className="job-request-subtitle">Describe the waste and location for collectors</p>
        </div>

        <form onSubmit={handleSubmit} className="job-request-form">
          <div className="form-group">
            <label className="form-label" htmlFor="wasteType">Waste Type</label>
            <div className="form-input-wrapper">
              <select
                id="wasteType"
                name="wasteType"
                className="form-select"
                value={formData.wasteType}
                onChange={handleChange}
              >
                <option value="plastic">Plastic</option>
                <option value="paper">Paper</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="organic">Organic</option>
                <option value="e-waste">E-Waste</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="location">Location / Address</label>
            <div className="form-input-wrapper">
              <input
                id="location"
                name="location"
                type="text"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. 123 Green Street, Cityville"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description & Details</label>
            <div className="form-input-wrapper">
              <textarea
                id="description"
                name="description"
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Two bags of plastic bottles and cardboard boxes. Weight approx 5kg."
                rows="4"
                style={{ resize: 'vertical', minHeight: '100px' }}
                required
              />
            </div>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p className="status-banner status-banner-success" style={{ display: 'block', textAlign: 'center' }}>{success}</p>}

          <button
            type="submit"
            className="btn btn-primary signup-btn"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobRequest;
