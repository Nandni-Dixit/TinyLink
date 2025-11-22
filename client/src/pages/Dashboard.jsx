import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LinkForm from '../components/LinkForm';
import LinkList from '../components/LinkList';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get('https://tinylink-backend-gkip.onrender.com/api/links');
        setLinks(res.data);
      } catch (error) {
        toast.error('Failed to load links');
        console.error(error);
      }
    };
    fetchLinks();
  }, [refresh]); 

  const filteredLinks = links.filter(link => 
  link.shortCode.toLowerCase().includes(filter.toLowerCase()) || 
  link.originalUrl.toLowerCase().includes(filter.toLowerCase())
);

 
  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      await axios.post('https://tinylink-backend-gkip.onrender.com/api/links', formData);
      toast.success('Link created successfully!');
      setRefresh(prev => !prev); 
    } catch (error) {
      const msg = error.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code) => {
     if(!window.confirm("Are you sure you want to delete this link?")) return;
     
     try {
        await axios.delete(`https://tinylink-backend-gkip.onrender.com/api/links/${code}`);
        toast.success('Link deleted');
        setRefresh(prev => !prev);
     } catch (error) {
        toast.error('Failed to delete link');
     }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Manage your short links and view stats.</p>
      </div>

      <LinkForm onSubmit={handleCreate} isLoading={loading} />

        <div className="mb-4">
        <input
        type="text"
        placeholder="Search by code or URL..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
    </div>

      <LinkList links={filteredLinks} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;