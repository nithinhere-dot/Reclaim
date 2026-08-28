import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [error,setError]=useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'poster',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            console.log({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }


        axios.post('http://localhost:5000/api/auth/signup', formData)
            .then(() => {
                console.log({ type: 'success', message: 'Account created successfully! You can now log in.' });
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'poster',
                });
                navigate('/login');

            })
            .catch((err) => {
                const message = err.response?.data?.message || "Signup failed.please Try Again"
                setError(message);
            })
    };

    return (
        <div className="signup-page">
            <Link to="/" className="back-to-home">
                <span>←</span> Back to Home
            </Link>
            <div className="signup-card">
                <div className="signup-header">
                    <Link to="/" className="signup-logo">♻️ Reclaim</Link>
                    <h2 className="signup-title">Create an Account</h2>
                    <p className="signup-subtitle">Start turning waste into opportunity</p>
                </div>
    

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <div className="form-input-wrapper">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrapper">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrapper">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="role">I want to join as a</label>
                        <div className="form-input-wrapper">
                            <select
                                id="role"
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="poster">Job Poster (I want to post waste)</option>
                                <option value="collector">Waste Collector (I want to collect waste)</option>
                            </select>
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-primary signup-btn"
                    >Sign-Up
                    </button>
                </form>

                <div className="signup-footer">
                    Already have an account?
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
