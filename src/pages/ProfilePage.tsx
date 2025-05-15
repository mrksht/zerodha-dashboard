import { useEffect, useState } from 'react';
import { User, Shield, Building2, Briefcase, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { userService } from '../services/api';

interface UserProfile {
  user_id: string;
  user_name: string;
  user_shortname: string;
  email: string;
  user_type: string;
  broker: string;
  exchanges: string[];
  products: string[];
  order_types: string[];
  avatar_url: string | null;
  meta: {
    demat_consent: string;
  };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await userService.getProfile();
        setProfile(profileData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="mt-4 text-neutral-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white shadow-md p-6 mt-4">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">Error</h2>
        </div>
        <p className="text-neutral-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary-800 mb-2">Profile</h1>
        <p className="text-neutral-600">
          Your Zerodha Kite account information
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary-500" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-500">Full Name</p>
              <p className="font-medium text-neutral-800">{profile.user_name}</p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500">User ID</p>
              <p className="font-medium text-neutral-800">{profile.user_id}</p>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-neutral-400 mr-2 mt-1" />
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="font-medium text-neutral-800">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary-500" />
            Account Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Building2 className="h-5 w-5 text-neutral-400 mr-2 mt-1" />
              <div>
                <p className="text-sm text-neutral-500">Broker</p>
                <p className="font-medium text-neutral-800">{profile.broker}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500">Account Type</p>
              <p className="font-medium text-neutral-800 capitalize">{profile.user_type}</p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500">Demat Consent</p>
              <p className="font-medium text-neutral-800 capitalize">{profile.meta.demat_consent || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Trading Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
            Trading Preferences
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Enabled Exchanges</h3>
              <div className="space-y-1">
                {profile.exchanges.map(exchange => (
                  <div key={exchange} className="text-sm text-neutral-600 bg-neutral-50 px-3 py-1 rounded">
                    {exchange}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Product Types</h3>
              <div className="space-y-1">
                {profile.products.map(product => (
                  <div key={product} className="text-sm text-neutral-600 bg-neutral-50 px-3 py-1 rounded">
                    {product}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-700 mb-2">Order Types</h3>
              <div className="space-y-1">
                {profile.order_types.map(type => (
                  <div key={type} className="text-sm text-neutral-600 bg-neutral-50 px-3 py-1 rounded">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;