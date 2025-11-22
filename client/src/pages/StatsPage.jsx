import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, ExternalLink } from 'lucide-react';

const StatsPage = () => {
  const { code } = useParams(); 
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`https://tinylink-backend-gkip.onrender.com/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setError('Link not found');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [code]);

  if (loading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-6">Link Statistics</h2>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Short Code</p>
          <p className="text-xl font-mono font-bold text-blue-600">{link.shortCode}</p>
        </div>

        <div className="p-4 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Original URL</p>
          <a href={link.originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 break-all flex items-center gap-2 hover:underline">
            {link.originalUrl} <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-800">{link.clicks}</p>
          </div>
          <div className="p-4 border border-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-lg font-medium text-gray-800">{new Date(link.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;