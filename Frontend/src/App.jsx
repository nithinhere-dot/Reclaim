import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import JobRequest from './pages/JobRequest';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';

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

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;