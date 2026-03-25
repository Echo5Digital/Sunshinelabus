'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Loader2, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import { adminLogin, getAdminToken, setAdminToken } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [checking, setChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (getAdminToken()) {
      router.replace('/admin/dashboard');
    } else {
      setChecking(false);
    }
  }, [router]);

  const onSubmit = async ({ email, password }) => {
    setAuthError('');
    try {
      const { token } = await adminLogin({ email, password });
      setAdminToken(token);
      router.push('/admin/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Login failed. Please try again.';
      setAuthError(msg);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-sunshine-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-sunshine-sky animate-spin" />
      </div>
    );
  }

  const inputBase =
    'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-blue transition-colors bg-white/90 text-sunshine-dark';

  return (
    <div className="min-h-screen bg-sunshine-dark flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo2.webp"
          alt="Sunshine Clinical Lab"
          width={148}
          height={45}
          className="object-contain brightness-0 invert"
          priority
        />
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm bg-white/[0.06] backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sunshine-blue/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-sunshine-sky" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-white text-center mb-1">Admin Portal</h1>
        <p className="text-white/40 text-xs text-center mb-7">Sunshine Clinical Lab</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              autoComplete="email"
              className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-white/20'}`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`${inputBase} pr-10 ${errors.password ? 'border-red-400' : 'border-white/20'}`}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Auth error */}
          {authError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/30 text-red-400 px-3 py-2.5 rounded-xl text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {authError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sunshine-blue hover:bg-sunshine-blue/90 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 shadow-md shadow-sunshine-blue/30 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>

      <p className="text-white/20 text-xs mt-8">
        Sunshine Clinical Lab LLC © {new Date().getFullYear()}
      </p>
    </div>
  );
}
