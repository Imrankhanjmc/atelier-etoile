import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('atelier_token', 'mock_jwt_token_auth_demonstration');
      localStorage.setItem('atelier_user', JSON.stringify({ name: formData.name, email: formData.email }));
      setIsLoading(false);
      addToast(`Account created for ${formData.name}. Welcome to the Maison.`, 'success');
      navigate('/account');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Join the Maison
        </span>
        <h1 className="font-serif text-3xl text-stone-900">
          Create Client Account
        </h1>
        <p className="text-xs text-stone-500">
          Register to receive bespoke sizing recommendations and archive invitations.
        </p>
      </div>

      <div className="border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Vikramaditya Sharma"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="patron@domain.com"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 font-mono focus:outline-none focus:border-stone-900"
              />
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create password (min 8 characters)"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 font-mono focus:outline-none focus:border-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700 uppercase tracking-wider block">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Repeat password"
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 text-stone-900 font-mono focus:outline-none focus:border-stone-900"
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
              {isLoading ? 'Creating Client Account...' : 'Complete Registration'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>Already registered? </span>
          <Link to="/login" className="font-semibold text-stone-900 hover:underline">
            Sign In to Atelier
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
