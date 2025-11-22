import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Clock, CheckCircle, Loader2 } from 'lucide-react';

const HealthPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/healthz');
        setStatus(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  
  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Checking system vitals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-xl border border-red-100 text-center">
        <Activity className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-700 mb-2">System Down</h2>
        <p className="text-red-600">Backend is not reachable.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
        <div className="bg-green-50 p-6 border-b border-green-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">System Operational</h2>
              <p className="text-green-600 text-sm">All systems normal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-green-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">System Uptime</span>
            </div>
            <p className="text-2xl font-mono font-bold text-gray-800">
              {formatUptime(status.uptime)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Status Check</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">OK</p>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HealthPage;