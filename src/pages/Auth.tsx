import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { toast } from 'react-hot-toast';
import { LogIn, UserPlus, ArrowLeft, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface AuthProps {
  isLogin: boolean;
}

export default function Auth({ isLogin }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        await signUp(email, password);
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end text-luxury-text">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-luxury-gold hover:text-opacity-80 transition-colors mb-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold animate-glow">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="mt-2 text-center text-sm opacity-80">
              {isLogin ? "Let's get you back to tracking your expenses" : 'Start your journey to financial freedom'}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple rounded-lg blur opacity-20"></div>
            <div className="relative bg-luxury-card p-8 rounded-lg shadow-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 rounded-md focus:outline-none focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-background"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 rounded-md focus:outline-none focus:ring-luxury-gold focus:border-luxury-gold bg-luxury-background"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-luxury-gold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                    </span>
                    {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-luxury-card text-luxury-text">Or continue with</span>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex justify-center items-center px-4 py-2 border border-luxury-gold rounded-md shadow-sm text-sm font-medium text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10 transition-all duration-300"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to={isLogin ? '/signup' : '/login'}
                  className="text-sm text-luxury-gold hover:text-opacity-80 transition-colors"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}