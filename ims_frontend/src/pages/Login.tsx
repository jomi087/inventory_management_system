import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthService from '../services/AuthService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear field error on change
  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await AuthService.login(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      let errorMsg = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || errorMsg ;
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
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'} `}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
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
