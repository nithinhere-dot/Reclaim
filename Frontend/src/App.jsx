import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import JobRequest from './pages/JobRequest';
import MyAcceptedJobs from './pages/MyAcceptedJobs';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';
import BottomBar from './components/BottomBar';
import Profile from './pages/Profile';
import MyJobs from './pages/MyJobs';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={
            <ProtectedRoute allowedRole="collector">
              <Jobs />
            </ProtectedRoute>
          }/>
          <Route path="/post-job" element={
          <ProtectedRoute allowedRole="poster">
            <JobRequest />
          </ProtectedRoute>
          }/>
          <Route path="/my-accepted" element={
            <ProtectedRoute allowedRole="collector">
              <MyAcceptedJobs />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/my-jobs" element={
            <ProtectedRoute allowedRole="poster">
              <MyJobs />
            </ProtectedRoute>
          }/>
        </Routes>
        <BottomBar/>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;