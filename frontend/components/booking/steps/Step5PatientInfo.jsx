'use client';

import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User, MapPin } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const inputBase =
  'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-blue transition-colors bg-white disabled:bg-gray-50';

function formatDob(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

function Field({ label, error, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-sunshine-dark mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

export default function Step5PatientInfo({ bookingData, updateBookingData, onNext, onPrev }) {
  const isHomeVisit = bookingData.locationType === 'home_visit';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: bookingData.patientName,
      patientDob: bookingData.patientDob,
      patientPhone: bookingData.patientPhone,
      patientEmail: bookingData.patientEmail,
      addressStreet: bookingData.addressStreet,
      addressCity: bookingData.addressCity,
      addressZip: bookingData.addressZip,
    },
  });

  const { onChange: dobOnChange, ...dobRest } = register('patientDob', {
    validate: (v) => {
      if (!v) return true;
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(v)) return 'Enter date as MM/DD/YYYY';
      const [mm, dd, yyyy] = v.split('/').map(Number);
      const dob = new Date(yyyy, mm - 1, dd);
      if (dob.getMonth() !== mm - 1 || dob.getDate() !== dd) return 'Invalid date';
      const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 0) return 'Date of birth cannot be in the future';
      if (age < 13) return 'Patient must be at least 13 years old';
      return true;
    },
  });

  const onValid = (data) => {
    updateBookingData({
      patientName: data.patientName.trim(),
      patientDob: data.patientDob || '',
      patientPhone: data.patientPhone,
      patientEmail: data.patientEmail,
      addressStreet: data.addressStreet?.trim() || '',
      addressCity: data.addressCity?.trim() || '',
      addressZip: data.addressZip || '',
    });
    onNext();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Patient Information</h2>
        <p className="text-gray-500 text-sm mt-1">Please enter your details below.</p>
      </div>

      <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
        {/* Personal info section */}
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-sunshine-blue" />
          <span className="text-sm font-semibold text-sunshine-dark">Personal Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" error={errors.patientName} required>
            <input
              type="text"
              placeholder="Jane Smith"
              className={`${inputBase} ${errors.patientName ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              {...register('patientName', {
                required: 'Full name is required',
                maxLength: { value: 100, message: 'Name too long' },
              })}
            />
          </Field>

          <Field label="Date of Birth" error={errors.patientDob}>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              maxLength={10}
              className={`${inputBase} ${errors.patientDob ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              onChange={(e) => {
                e.target.value = formatDob(e.target.value);
                dobOnChange(e);
              }}
              {...dobRest}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone Number" error={errors.patientPhone} required>
            <input
              type="tel"
              placeholder="+1 (727) 555-0123"
              className={`${inputBase} ${errors.patientPhone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              {...register('patientPhone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[\d\s\-().]{7,20}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
          </Field>

          <Field label="Email Address" error={errors.patientEmail} required>
            <input
              type="email"
              placeholder="you@example.com"
              className={`${inputBase} ${errors.patientEmail ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              {...register('patientEmail', {
                required: 'Email address is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </Field>
        </div>

        {/* Address section — only for home visits */}
        <AnimatePresence>
          {isHomeVisit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sunshine-sky" />
                  <span className="text-sm font-semibold text-sunshine-dark">Home Visit Address</span>
                </div>

                <Field label="Street Address" error={errors.addressStreet} required>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className={`${inputBase} ${errors.addressStreet ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    {...register('addressStreet', {
                      validate: (v) => {
                        if (isHomeVisit && (!v || v.trim().length < 5))
                          return 'Street address is required for home visits';
                        return true;
                      },
                    })}
                  />
                </Field>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Field label="City" error={errors.addressCity} required>
                      <input
                        type="text"
                        placeholder="New Port Richey"
                        className={`${inputBase} ${errors.addressCity ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        {...register('addressCity', {
                          validate: (v) => {
                            if (isHomeVisit && (!v || !v.trim()))
                              return 'City is required';
                            return true;
                          },
                        })}
                      />
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sunshine-dark mb-1.5">State</label>
                    <input
                      type="text"
                      value="FL"
                      readOnly
                      className={`${inputBase} border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed`}
                    />
                  </div>

                  <div>
                    <Field label="ZIP Code" error={errors.addressZip} required>
                      <input
                        type="text"
                        placeholder="34655"
                        className={`${inputBase} ${errors.addressZip ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                        {...register('addressZip', {
                          validate: (v) => {
                            if (isHomeVisit && !/^\d{5}(-\d{4})?$/.test(v))
                              return 'Valid ZIP required';
                            return true;
                          },
                        })}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <ShimmerButton
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </ShimmerButton>
        </div>
      </form>
    </div>
  );
}
