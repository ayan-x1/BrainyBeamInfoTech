import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { authenticatedFetch } from '../utils/api';
import { User, Mail, Calendar, Shield, CreditCard as Edit, Save, X, Loader2, AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface ProfileData {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const data = await authenticatedFetch('/protected/profile');
      setProfileData(data);
    } catch (err: any) {
      console.error('Failed to load profile data:', err);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      // Cancel editing - reset form
      setEditForm({
        name: user?.name || '',
        email: user?.email || ''
      });
    }
    setEditing(!editing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // In a real app, you would make an API call to update the profile
      // await authenticatedFetch('/auth/profile', {
      //   method: 'PUT',
      //   body: JSON.stringify(editForm)
      // });
      
      // For this demo, we'll just simulate a successful update
      console.log('Profile update simulated:', editForm);
      setEditing(false);
      
      // Show success message (in real app, you'd update the auth context)
      alert('Profile updated successfully! (This is a demo - no actual update was made)');
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      setError(err.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = () => {
    alert('Change Password feature would be implemented here. This is a demo.');
  };

  const handleDownloadData = () => {
    alert('Download Data feature would be implemented here. This is a demo.');
  };

  const handlePrivacySettings = () => {
    alert('Privacy Settings feature would be implemented here. This is a demo.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                <span className="gradient-text">Profile</span>
              </h1>
              <p className="text-gray-600 text-lg">Manage your account information and settings</p>
            </div>
          </div>
        </div>

        {/* API Response Display */}
        {error ? (
          <div className="mb-8 card p-6 border-red-200 bg-red-50 animate-slide-down">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <span className="text-red-800 font-semibold text-lg">Error loading profile data</span>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadProfileData}
              className="btn-secondary bg-red-100 text-red-800 hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        ) : profileData ? (
          <div className="mb-8 card p-6 border-green-200 bg-green-50 animate-slide-down">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <span className="text-green-800 font-semibold text-lg">Protected Profile API Response</span>
            </div>
            <p className="text-green-700 text-lg">Profile data retrieved successfully for {profileData.user.name}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="card animate-slide-up">
              {/* Header */}
              <div className="px-6 py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  <span className="gradient-text">Account Information</span>
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={editing ? handleSave : handleEditToggle}
                    className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      editing
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    {editing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                  {editing && (
                    <button
                      onClick={handleEditToggle}
                      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name
                    </label>
                    {editing ? (
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                      </div>
                    ) : (
                      <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all duration-300 group">
                        <div className="p-2 bg-primary-100 rounded-lg mr-4 group-hover:bg-primary-200 transition-colors duration-200">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <span className="text-gray-900 font-medium">{user?.name || 'N/A'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address
                    </label>
                    {editing ? (
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                      </div>
                    ) : (
                      <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all duration-300 group">
                        <div className="p-2 bg-primary-100 rounded-lg mr-4 group-hover:bg-primary-200 transition-colors duration-200">
                          <Mail className="h-5 w-5 text-primary-600" />
                        </div>
                        <span className="text-gray-900 font-medium">{user?.email || 'N/A'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      User ID
                    </label>
                    <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                      <div className="p-2 bg-gray-200 rounded-lg mr-4">
                        <Shield className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-gray-900 font-mono text-sm font-medium">{user?.id || 'N/A'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Account Created
                    </label>
                    <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                      <div className="p-2 bg-gray-200 rounded-lg mr-4">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-gray-900 font-medium">
                        {new Date().toLocaleDateString()} (Demo - actual date would come from API)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Account Security</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-sm font-medium text-gray-600">Authentication</span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-sm font-medium text-gray-600">Session Security</span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">High</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="text-sm font-medium text-gray-600">Two-Factor Auth</span>
                  <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Available</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-semibold hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-200">
                  Manage Security Settings
                </button>
              </div>
            </div>

            <div className="card p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleChangePassword}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    Change Password
                  </div>
                </button>
                <button 
                  onClick={handleDownloadData}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    Download Data
                  </div>
                </button>
                <button 
                  onClick={handlePrivacySettings}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3 group-hover:text-primary-600 transition-colors duration-200" />
                    Privacy Settings
                  </div>
                </button>
                <button 
                  onClick={loadProfileData}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                    Refresh Profile
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 animate-slide-up">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xs">!</span>
                </div>
                Demo Notice
              </h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                This is a demonstration app. Profile updates are simulated and won't actually modify your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;