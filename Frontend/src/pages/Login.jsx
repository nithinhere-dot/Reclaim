import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [error, setError] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            console.log({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }


        axios.post('http://localhost:5000/api/auth/login', formData)
            .then((res) => {
                console.log({ type: 'success', message: 'Your Login in' });
                login(res.data.user, res.data.token);
                console.log(res.data.user.role)
                setFormData({
                    email: '',
                    password: ''
                });
                navigate(res.data.user.role === 'collector' ? '/job' : '/post-job');

            })
            .catch((err) => {
                const message = err.response?.data?.message || "Login failed.please Try Again"
                setError(message);
            })
    };

    return (
        <div className="login-page">
            <Link to="/" className="back-to-home">
                <span>←</span> Back to Home
            </Link>
            <div className="login-card">
                <div className="login-header">
                    <Link to="/" className="login-logo">♻️ Reclaim</Link>
                    <h2 className="login-title">Login to Your Account</h2>
                    <p className="login-subtitle">Start turning waste into opportunity</p>
                </div>


                <form onSubmit={handleSubmit} className="login-form">
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-primary signup-btn"
                    >Login
                    </button>
                </form>

                <div className="signup-footer">
                    Don't have an account?
                    <Link to="/signup">Sign-Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
