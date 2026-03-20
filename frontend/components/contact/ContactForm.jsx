'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContact } from '@/lib/api';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const COUNTRY_CODES = [
  { code: '+1', label: '+1 (US/CA)' },
  { code: '+44', label: '+44 (UK)' },
  { code: '+61', label: '+61 (AU)' },
  { code: '+91', label: '+91 (IN)' },
  { code: '+52', label: '+52 (MX)' },
  { code: '+49', label: '+49 (DE)' },
  { code: '+33', label: '+33 (FR)' },
  { code: '+55', label: '+55 (BR)' },
];

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
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
      await submitContact({ ...data, phone: `${countryCode} ${data.phone}` });
      setStatus('success');
      reset();
      setConsentChecked(false);
      setCountryCode('+1');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err?.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-sunshine-dark mb-2">Message Sent!</h3>
            <p className="text-gray-500 mb-6">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-green-600 font-medium hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    );
  }

  const inputBase =
    'w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-colors disabled:bg-gray-50 disabled:text-gray-400 placeholder-gray-400';
  const inputNormal = `${inputBase} border-gray-300`;
  const inputError = `${inputBase} border-red-400 bg-red-50`;
  const isSubmitting = status === 'submitting';

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-gray-500">Got questions? We’re all ears! Reach out to us today, and let’s chat about how we can assist you. Complete the form below, and our dedicated team will get back to you promptly!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <FieldLabel htmlFor="cf-name" required>Full Name</FieldLabel>
              <input
                id="cf-name"
                type="text"
                placeholder="Enter your full name"
                disabled={isSubmitting}
                className={errors.name ? inputError : inputNormal}
                {...register('name', {
                  required: 'Full name is required',
                  maxLength: { value: 100, message: 'Name cannot exceed 100 characters' },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <FieldLabel htmlFor="cf-address" required>Address</FieldLabel>
              <input
                id="cf-address"
                type="text"
                placeholder="Enter your address"
                disabled={isSubmitting}
                className={errors.address ? inputError : inputNormal}
                {...register('address', {
                  required: 'Address is required',
                })}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Email + Phone — 2 columns on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <FieldLabel htmlFor="cf-email" required>Email Address</FieldLabel>
                <input
                  id="cf-email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className={errors.email ? inputError : inputNormal}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone with country code */}
              <div>
                <FieldLabel htmlFor="cf-phone" required>Phone Number</FieldLabel>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={isSubmitting}
                    className="border border-gray-300 rounded-lg px-2 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-colors disabled:bg-gray-50 disabled:text-gray-400 flex-shrink-0"
                  >
                    {COUNTRY_CODES.map(({ code, label }) => (
                      <option key={code} value={code}>{label}</option>
                    ))}
                  </select>
                  <input
                    id="cf-phone"
                    type="tel"
                    placeholder="555 123 4567"
                    disabled={isSubmitting}
                    className={`flex-1 ${errors.phone ? inputError : inputNormal}`}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[\d\s\-().]{7,20}$/,
                        message: 'Please enter a valid phone number',
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Question / Comment */}
            <div>
              <FieldLabel htmlFor="cf-message">Question / Comment</FieldLabel>
              <textarea
                id="cf-message"
                rows={5}
                placeholder="Write your question or comment here..."
                disabled={isSubmitting}
                className={`w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-colors disabled:bg-gray-50 disabled:text-gray-400 placeholder-gray-400 resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                {...register('message', {
                  maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Consent checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                disabled={isSubmitting}
                className="mt-0.5 w-4 h-4 accent-green-600 flex-shrink-0"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                I consent to the collection, use, storage, and processing of my personal and, where
                applicable, health-related information, including any data I submit on behalf of
                others, for the purpose of evaluating or fulfilling my request made through this
                form. I understand this will be handled in accordance with the{' '}
                <a href="/privacy-notice" className="font-bold text-sunshine-dark hover:underline">
                  Privacy Notice
                </a>
                .
              </span>
            </label>

            {/* Submit */}
            <div className="pt-1">
              <ShimmerButton
                type="submit"
                disabled={isSubmitting || !consentChecked}
                className="bg-green-600 text-white text-sm px-10 py-3 rounded-full font-semibold shadow-md hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </ShimmerButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
