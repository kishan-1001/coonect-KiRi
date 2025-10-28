import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase';
import ParticleBackground from '../components/ParticleBackground';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      setError('Social login is not configured. Please use email/password login.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Send user data to backend
      const response = await axios.post('http://localhost:5000/api/auth/social-login', {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: 'google'
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/home');
    } catch (error) {
      setError('Google sign-in failed');
    }
  };

  const handleFacebookSignIn = async () => {
    if (!auth || !facebookProvider) {
      setError('Social login is not configured. Please use email/password login.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      // Send user data to backend
      const response = await axios.post('http://localhost:5000/api/auth/social-login', {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: 'facebook'
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/home');
    } catch (error) {
      setError('Facebook sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-8 pb-4 px-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="w-full max-w-md relative z-10 perspective-1000">
        <div className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${!isLogin ? 'rotate-y-180' : ''}`}>
          {/* Login Side */}
          <div className="absolute inset-0 w-full backface-hidden p-6 sm:p-8 rounded-xl shadow-2xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300 text-sm sm:text-base">Sign in to your account</p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  onClick={handleFacebookSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-[#166FE5] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            <div className="text-center mt-4 sm:mt-6">
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>

          {/* Register Side */}
          <div className="absolute inset-0 w-full backface-hidden p-6 sm:p-8 rounded-xl shadow-2xl rotate-y-180">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Join KiRi</h2>
              <p className="text-gray-300 text-sm sm:text-base">Create your new account</p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-4 sm:mt-6">
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
