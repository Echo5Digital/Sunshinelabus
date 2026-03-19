'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitAppointment } from '@/lib/api';
import { Calendar, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const SERVICES = [
  'Hematology',
  'Chemistry',
  'Immunochemistry',
  'Coagulation Service',
  'Drug Testing',
  'Molecular Testing',
  'Phlebotomy Service',
  'DNA Testing',
];

export default function AppointmentForm() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = async (data) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitAppointment(data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err?.response?.data?.error || 'Failed to book appointment. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-sunshine-sky/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-sunshine-blue" />
        </div>
        <h3 className="text-xl font-semibold text-sunshine-dark mb-2">Appointment Booked!</h3>
        <p className="text-gray-500 mb-6">
          We&apos;ve received your appointment request and will confirm it within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sunshine-blue font-medium hover:underline"
        >
          Book another appointment
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

      {/* Name */}
      <div>
        <label htmlFor="appt-name" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="appt-name"
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
        <label htmlFor="appt-email" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="appt-email"
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

      {/* Phone */}
      <div>
        <label htmlFor="appt-phone" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="appt-phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[\d\s\-().]{7,20}$/,
              message: 'Please enter a valid phone number',
            },
          })}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="appt-service" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Service <span className="text-red-500">*</span>
        </label>
        <select
          id="appt-service"
          disabled={status === 'submitting'}
          className={`${inputBase} bg-white ${errors.service ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
          {...register('service', { required: 'Please select a service' })}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service.message}</p>}
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="appt-date" className="block text-sm font-medium text-sunshine-dark mb-1.5">
          Preferred Date <span className="text-red-500">*</span>
        </label>
        <input
          id="appt-date"
          type="date"
          min={today}
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
          {...register('date', { required: 'Please select a preferred date' })}
        />
        {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>}
      </div>

      {/* Submit */}
      <ShimmerButton
        type="submit"
        disabled={status === 'submitting'}
        className="w-full justify-center bg-[#FFC72C] text-[#1E2A38] text-base px-6 py-3.5 rounded-full font-semibold shadow-md"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Booking...</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </>
        )}
      </ShimmerButton>
    </form>
  );
}
