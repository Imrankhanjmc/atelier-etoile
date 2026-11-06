import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('patron@atelieroile.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('atelier_token', 'mock_jwt_token_auth_demonstration');
      localStorage.setItem('atelier_user', JSON.stringify({ name: 'Vikramaditya S.', email }));
      setIsLoading(false);
      addToast('Welcome back to Atelier Étoile.', 'success');
      navigate('/account');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Private Client Access
        </span>
        <h1 className="font-serif text-3xl text-stone-900">
          Sign In to Your Account
        </h1>
        <p className="text-xs text-stone-500">
          Access your saved measurements, wishlist archives, and order status.
        </p>
      </div>

      <div className="border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@domain.com"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-stone-500 hover:text-stone-900 underline text-[11px]"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Atelier'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center pt-2">
            Demonstration mode: Instant credentials simulated.
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>New to Atelier Étoile? </span>
          <Link to="/register" className="font-semibold text-stone-900 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
