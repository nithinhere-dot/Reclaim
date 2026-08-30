import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function BottomBar() {
  const { user } = useAuth();

  function getLinks() {
    if (user?.role === 'collector') {
      return (
        <>
          <Link to="/job">Jobs</Link>
          <Link to="/my-accepted">Accepted</Link>
          <Link to="/profile">Profile</Link>
        </>
      );
    }
    if (user?.role === 'poster') {
      return (
        <>
          <Link to="/post-job">Post Job</Link>
          <Link to="/">My Jobs</Link>
          <Link to="/profile">Profile</Link>
        </>
      );
    }
    return null;
  }

  return (
    <>
      {user && (
        <nav className="bottom-bar">
          {getLinks()}
        </nav>
      )}
    </>
  );
}

export default BottomBar;