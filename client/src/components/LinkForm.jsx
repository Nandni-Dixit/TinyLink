import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const LinkForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onSubmit({ originalUrl: url, shortCode: code });
    setUrl(''); //To clear form after submit
    setCode('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* long URL input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Long URL</label>
          <input
            type="url"
            placeholder="https://example.com/very-long-url..."
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Custom Code Input */}
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Code (Optional)</label>
          <input
            type="text"
            placeholder="e.g. my-link"
            maxLength={8}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 transition-colors h-[42px]"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
            Shorten
          </button>
        </div>
      </div>
    </form>
  );
};

export default LinkForm;