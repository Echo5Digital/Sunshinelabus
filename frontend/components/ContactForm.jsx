'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContact } from '@/lib/api';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitContact(data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err?.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-sunshine-sky/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-sunshine-blue" />
        </div>
        <h3 className="text-xl font-semibold text-sunshine-dark mb-2">Message Sent!</h3>
        <p className="text-gray-500 mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sunshine-blue font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-blue transition-colors disabled:bg-gray-50 disabled:text-gray-400';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="John Smith"
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          {...register('name', {
            required: 'Full name is required',
            maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
          })}
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="How can we help you?"
          disabled={status === 'submitting'}
          className={`${inputBase} resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          {...register('message', {
            required: 'Message is required',
            maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' },
          })}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 bg-sunshine-yellow text-sunshine-dark px-6 py-3.5 rounded-full font-semibold hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
