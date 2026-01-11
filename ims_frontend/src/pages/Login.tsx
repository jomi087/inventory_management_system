import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthService from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await AuthService.login(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      let errorMsg = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        // backend error message
        errorMsg = error.response?.data?.message || 'Login failed';
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold text-blue-600">
            Inventory
          </Link>
        </div>
      </header>

      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Welcome 🙏
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
