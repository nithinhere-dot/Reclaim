import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';


function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    function getJobLink() {
        if (user?.role === 'poster') return <Link to="/post-job">Post A Job</Link>;
        if (user?.role === 'collector') return <Link to="/job">Jobs</Link>;
        return null;
    }
    return (
        <>
        {location.pathname==="/" ? null : 
        <nav>
            <div className="nav-brand">♻️ Reclaim</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                {getJobLink()}
                {!user && <><Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link></>}
                {user && <p>{user.name}</p>}
                {user && <button onClick={logout}>Logout</button>}
            </div>
        </nav>}
        </>

    );
}

export default Navbar;