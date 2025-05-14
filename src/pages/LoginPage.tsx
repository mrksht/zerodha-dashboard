import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, CheckCircle, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/portfolio');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get login URL from backend
      const url = await authService.getLoginUrl();
      console.log(url, 'url')
      // Redirect to Kite login page
      window.location.href = url;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to initiate login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-fade-in">
        <div className="text-center mb-8">
          <BarChart className="h-12 w-12 text-primary-500 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-primary-800">Kite Portfolio Viewer</h1>
          <p className="mt-2 text-neutral-600">Connect with your Zerodha Kite account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
            ${loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'} text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </div>
          ) : (
            <span>Connect with Kite</span>
          )}
        </button>

        <div className="mt-8 text-center">
          <h3 className="text-sm font-medium text-neutral-500 mb-3">Secure Connection</h3>
          <div className="flex items-center justify-center space-x-2 text-xs text-neutral-500">
            <CheckCircle className="h-4 w-4 text-accent-500" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-neutral-500">
        <p>For secure access to your Zerodha portfolio data</p>
      </div>
    </div>
  );
};

export default LoginPage;