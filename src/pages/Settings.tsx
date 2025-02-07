import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useTheme } from '../components/ThemeProvider';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Moon, Sun, Download } from 'lucide-react';

export default function Settings() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setNewPassword('');
    } catch (error) {
      toast.error('Failed to update password');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const csv = [
        ['Date', 'Type', 'Category', 'Description', 'Amount'],
        ...transactions.map(t => [
          t.date,
          t.type,
          t.category,
          t.description,
          t.amount,
        ]),
      ]
        .map(row => row.join(','))
        .join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Error:', error);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Manage your account preferences and settings
        </p>

        <div className="mt-6 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
          {/* Theme Settings */}
          <div className="pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h3>
            <div className="mt-4">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Switch to Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="mt-4 max-w-md">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Export Data */}
          <div className="pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Export Data</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Download your transaction history as a CSV file
            </p>
            <button
              onClick={handleExportData}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Transactions
            </button>
          </div>

          {/* Account Information */}
          <div className="pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Information</h3>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Email: {user?.email}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Account created: {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}