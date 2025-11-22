import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard'; 
import Navbar from './components/Navbar';  
import StatsPage from './pages/StatsPage';
import HealthPage from './pages/HealthPage';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        
        <div className="container mx-auto p-4 max-w-4xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<StatsPage />} /> {/* Naya Route */}
            <Route path="/healthz" element={<HealthPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;