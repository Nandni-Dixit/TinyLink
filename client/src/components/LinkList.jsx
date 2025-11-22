import { Copy, Trash2, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LinkList = ({ links, onDelete }) => {
  
  const copyToClipboard = (shortCode) => {
    const fullUrl = `http://localhost:5000/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Copied to clipboard!');
  };

  if (!links.length) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No links created yet. Create your first one above! 🚀</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Short Link</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Original URL</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-center">Clicks</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-center">Last Clicked</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                {/* Short Link */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium text-blue-600">
                    <a href={`http://localhost:5000/${link.shortCode}`} target="_blank" rel="noreferrer" className="hover:underline">
                      /{link.shortCode}
                    </a>
                    <button onClick={() => copyToClipboard(link.shortCode)} className="text-gray-400 hover:text-blue-600" title="Copy">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>

                {/* Original URL */}
                <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={link.originalUrl}>
                  {link.originalUrl}
                </td>

                {/* Clicks */}
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    <BarChart2 className="w-3 h-3" />
                    {link.clicks}
                  </div>
                </td>

                {/* Last Clicked Date & Time */}
                <td className="px-6 py-4 text-center text-gray-500 text-sm">
                  {link.lastClickedAt ? (
                    <div className="flex flex-col">
                      {/* Date */}
                      <span className="font-medium text-gray-700">
                        {new Date(link.lastClickedAt).toLocaleDateString()}
                      </span>
                      {/* Time */}
                      <span className="text-xs text-gray-400">
                        {new Date(link.lastClickedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Never</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <a 
                    href={`/code/${link.shortCode}`} 
                    className="text-blue-400 hover:text-blue-600 p-1 hover:bg-blue-50 rounded transition-colors"
                    title="View Stats"
                  >
                    <BarChart2 className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => onDelete(link.shortCode)}
                    className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkList;