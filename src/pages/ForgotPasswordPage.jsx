import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      addToast('Password reset link sent to your email.', 'success');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Security & Access
        </span>
        <h1 className="font-serif text-3xl text-stone-900">
          Reset Password
        </h1>
        <p className="text-xs text-stone-500">
          Enter your registered email and we will dispatch a secure reset key.
        </p>
      </div>

      <div className="border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-lg text-stone-900">Reset Link Dispatched</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We have forwarded password instructions to <strong className="text-stone-900">{email}</strong>. Check your inbox and spam folder.
            </p>
            <Link
              to="/login"
              className="inline-block mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Send Recovery Link <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-600">
          <Link to="/login" className="font-semibold text-stone-900 hover:underline">
            ← Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
