'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContact } from '@/lib/api';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!consentChecked) return;
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitContact(data);
      setStatus('success');
      reset();
      setConsentChecked(false);
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

  const pillInput =
    'w-full border rounded-full px-5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue/40 transition-colors disabled:bg-gray-50 disabled:text-gray-400 placeholder-gray-400';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Row 1 — Name + Email side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <input
            id="contact-name"
            type="text"
            placeholder="*Full Name"
            disabled={status === 'submitting'}
            className={`${pillInput} ${errors.name ? 'border-red-400 bg-red-50' : 'border-sunshine-sky/50'}`}
            {...register('name', {
              required: 'Full name is required',
              maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
            })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 pl-4">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            id="contact-email"
            type="email"
            placeholder="*Email Address"
            disabled={status === 'submitting'}
            className={`${pillInput} ${errors.email ? 'border-red-400 bg-red-50' : 'border-sunshine-sky/50'}`}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600 pl-4">{errors.email.message}</p>}
        </div>
      </div>

      {/* Row 2 — Message (full width, tall) */}
      <div>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Message(s)"
          disabled={status === 'submitting'}
          className={`w-full border rounded-2xl px-5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue/40 transition-colors disabled:bg-gray-50 disabled:text-gray-400 placeholder-gray-400 resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-sunshine-sky/50'}`}
          {...register('message', {
            required: 'Message is required',
            maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' },
          })}
        ></textarea>
        {errors.message && <p className="mt-1 text-xs text-red-600 pl-4">{errors.message.message}</p>}
      </div>

      {/* Row 3 — Consent + Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
        {/* Consent checkbox */}
        <label className="flex items-start gap-3 cursor-pointer flex-1">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            disabled={status === 'submitting'}
            className="mt-0.5 w-4 h-4 accent-sunshine-blue flex-shrink-0"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            I consent to the collection, use, storage, and processing of my personal and, where
            applicable, health-related information, including any data I submit on behalf of others,
            for the purpose of evaluating or fulfilling my request made through this form. I
            understand this will be handled in accordance with the{' '}
            <a href="/privacy-notice" className="font-bold text-sunshine-dark hover:underline">
              Privacy Notice
            </a>
            .
          </span>
        </label>

        {/* Submit button */}
        <div className="flex-shrink-0 self-center sm:self-end">
          <ShimmerButton
            type="submit"
            disabled={status === 'submitting' || !consentChecked}
            className="bg-[#FFC72C] text-[#1E2A38] text-sm px-8 py-3 rounded-full font-semibold shadow-md"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </ShimmerButton>
        </div>
      </div>
    </form>
  );
}
