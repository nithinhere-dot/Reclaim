import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Job from './pages/Job';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import JobRequest from './pages/JobRequest';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={
            <ProtectedRoute allowedRole="collector">
              <Job />
            </ProtectedRoute>
          }/>
          <Route path="/post-job" element={
          <ProtectedRoute allowedRole="poster">
            <JobRequest />
          </ProtectedRoute>
          }/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;