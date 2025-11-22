import { Link } from 'react-router-dom'; 
import { Link2, Activity, LayoutDashboard } from 'lucide-react'; 

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm mb-8">
        <div className="w-full px-6 py-4 flex items-center justify-between">
        
        
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">TinyLink</h1>
        </Link>

        
        <div className="flex items-center gap-4">
          
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link 
            to="/healthz" 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors" >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">System Status</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;