import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import LoadingScreen from '../components/LoadingScreen';

const CallbackPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    let called = false;
    const processCallback = async () => {
      if (called) return;
      called = true;
  
      const searchParams = new URLSearchParams(location.search);
      const request_token = searchParams.get('request_token');
  
      console.log(request_token, 'req');
      if (!request_token) {
        setError('Authorization code is missing');
        return;
      }
  
      try {
        console.log('Here-1');
        const { body } = await authService.processCallback(request_token);
        const { access_token } = body
        console.log('Here-2', access_token);
  
        login(access_token);
        navigate('/portfolio');
      } catch (err) {
        console.error('Callback error:', err);
        setError('Failed to authenticate. Please try again.');
      }
    };
  
    processCallback();
  }, [location.search, login, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-neutral-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <LoadingScreen />;
};

export default CallbackPage;