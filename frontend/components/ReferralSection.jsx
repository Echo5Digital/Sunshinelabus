'use client';

import { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { UserPlus, Plus, Trash2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import MagicCard from '@/components/ui/MagicCard';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-sunshine-dark bg-white/80 focus:outline-none focus:ring-2 focus:ring-sunshine-blue/50 focus:border-sunshine-blue transition-colors placeholder:text-gray-400';

const labelClass = 'block text-xs font-bold uppercase tracking-widest text-sunshine-dark mb-1.5';

const errorClass = 'flex items-center gap-1 text-red-500 text-xs mt-1';

function ReferralBanner() {
  return (
    <section className="relative bg-sunshine-blue text-white py-20 pt-28 sm:pt-36 overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.10]" viewBox="0 0 380 380" fill="none">
          <circle cx="190" cy="190" r="170" stroke="white" strokeWidth="1.5" strokeDasharray="9 6" />
          <circle cx="190" cy="190" r="110" stroke="white" strokeWidth="1" strokeDasharray="5 4" />
        </svg>
        <svg className="absolute -bottom-16 -left-16 w-64 h-64 opacity-[0.08]" viewBox="0 0 260 260" fill="none">
          <circle cx="130" cy="130" r="110" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>
        {/* Dot scatter */}
        <svg className="absolute top-16 left-10 opacity-[0.12]" width="80" height="120" fill="none">
          {[0,1,2,3].map(r => [0,1].map(c => (
            <circle key={`${r}-${c}`} cx={c * 32 + 10} cy={r * 30 + 10} r="2.5" fill="white" />
          )))}
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
          <UserPlus className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Patient Referrals
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Send a Referral</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Partner with Sunshine Clinical Lab LLC to deliver accurate, timely diagnostic services
          to your patients. Fill out the form below and we&apos;ll take it from there.
        </p>
      </div>
    </section>
  );
}

export default function ReferralSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      referrerName: '',
      referrerEmail: '',
      referrals: [{ name: '', email: '', phone: '' }],
      consent: false,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'referrals' });

  const onSubmit = async (data) => {
    setSubmitting(true);
    // Simulate API call — wire to /api/referrals when backend is ready
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <ReferralBanner />
        <section className="py-24 px-4 bg-gradient-to-br from-[#dbeeff] to-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-sunshine-dark mb-3">Referral Submitted!</h2>
            <p className="text-gray-500 mb-8">
              Thank you for sharing the gift of good health. We&apos;ll be in touch with your
              referral(s) shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); reset(); }}
              className="inline-flex items-center gap-2 text-sunshine-blue font-semibold hover:underline"
            >
              <Plus className="w-4 h-4" /> Submit another referral
            </button>
          </motion.div>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
      <ReferralBanner />
      <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-[#dbeeff] to-white">

      {/* Decorative dot grid */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-6 opacity-20"
        width="160" height="160" viewBox="0 0 160 160"
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 28 + 8} cy={row * 28 + 8} r="2.5" fill="#2B7DBF" />
          ))
        )}
      </svg>

      {/* Decorative dashed circle */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 opacity-10"
        width="280" height="280" viewBox="0 0 280 280"
      >
        <circle cx="140" cy="140" r="120" fill="none" stroke="#2B7DBF" strokeWidth="2" strokeDasharray="8 6" />
        <circle cx="140" cy="140" r="80" fill="none" stroke="#6BB6E8" strokeWidth="1.5" strokeDasharray="6 5" />
      </svg>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-blue/20">
              <UserPlus className="w-3.5 h-3.5" />
              Send a Referral
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-3">
              Share the Gift of Good Health
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Spread the gift of good health by sending your referrals our way &mdash; together,
              we can make a difference in people&apos;s lives. Complete the form below to get started.
            </p>
          </div>

          {/* Glassmorphic form card */}
          <MagicCard
            gradientColor="#6BB6E822"
            borderGlowColor="#2B7DBF"
            gradientSize={260}
            className="shadow-2xl"
          >
            <div className="p-7 sm:p-9">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Required Information label */}
                <p className="text-red-500 text-sm font-semibold mb-5">
                  * Required Information
                </p>

                {/* ── Referrer Info ─────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                  <div>
                    <label className={labelClass}>
                      Name of Referrer <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name of referrer here"
                      className={`${inputClass} ${errors.referrerName ? 'border-red-400 focus:ring-red-400/40' : ''}`}
                      {...register('referrerName', { required: 'Referrer name is required' })}
                    />
                    {errors.referrerName && (
                      <p className={errorClass}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.referrerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      className={`${inputClass} ${errors.referrerEmail ? 'border-red-400 focus:ring-red-400/40' : ''}`}
                      {...register('referrerEmail', {
                        required: 'Email address is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                    />
                    {errors.referrerEmail && (
                      <p className={errorClass}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.referrerEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Referral(s) header bar ─────────────────────── */}
                <div className="bg-gray-100 rounded-lg px-4 py-2.5 mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-sunshine-dark">
                    Referral(s)
                  </span>
                </div>

                {/* ── Dynamic referral entries ───────────────────── */}
                <div className="space-y-5">
                  {fields.map((field, index) => (
                    <div key={field.id}>
                      <div className="flex items-center justify-between mb-3">
                        {fields.length > 1 && (
                          <span className="text-xs text-gray-400 font-medium">
                            Referral #{index + 1}
                          </span>
                        )}
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-auto text-gray-400 hover:text-red-400 transition-colors"
                            aria-label="Remove referral"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Name */}
                      <div className="mb-4">
                        <label className={labelClass}>Name</label>
                        <input
                          type="text"
                          placeholder="Enter name here"
                          className={inputClass}
                          {...register(`referrals.${index}.name`)}
                        />
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Email Address</label>
                          <input
                            type="email"
                            placeholder="example@domain.com"
                            className={inputClass}
                            {...register(`referrals.${index}.email`, {
                              pattern: { value: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                            })}
                          />
                          {errors.referrals?.[index]?.email && (
                            <p className={errorClass}>
                              <AlertCircle className="w-3 h-3" />
                              {errors.referrals[index].email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className={labelClass}>Contact Number</label>
                          <input
                            type="tel"
                            placeholder="Enter number here"
                            className={inputClass}
                            {...register(`referrals.${index}.phone`)}
                          />
                        </div>
                      </div>

                      {/* Separator between entries */}
                      {index < fields.length - 1 && (
                        <div className="border-t border-dashed border-gray-200 mt-5" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Add more button */}
                <button
                  type="button"
                  onClick={() => append({ name: '', email: '', phone: '' })}
                  className="mt-5 w-full flex items-center justify-center gap-2 border border-dashed border-sunshine-blue/40 rounded-xl py-3 text-sm text-sunshine-blue font-semibold hover:bg-sunshine-blue/5 hover:border-sunshine-blue transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sunshine-blue text-white">
                    <Plus className="w-3 h-3" />
                  </span>
                  Add more referrals...
                </button>

                {/* ── Consent ───────────────────────────────────── */}
                <div className="mt-7">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 accent-sunshine-blue flex-shrink-0 cursor-pointer"
                      {...register('consent', { required: 'You must consent to submit' })}
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I consent to the collection, use, storage, and processing of my personal
                      and, where applicable, health-related information, including any data I
                      submit on behalf of others, for the purpose of evaluating or fulfilling my
                      request made through this form. I understand this will be handled in
                      accordance with the{' '}
                      <Link href="#" className="text-sunshine-blue underline hover:text-sunshine-blue/80">
                        Privacy Notice
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className={`${errorClass} mt-2`}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {/* ── Submit ────────────────────────────────────── */}
                <div className="mt-7">
                  <ShimmerButton
                    type="submit"
                    disabled={submitting}
                    className="w-full justify-center bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-sm px-6 py-3.5 rounded-full font-semibold shadow-lg disabled:opacity-60"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Referral</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </ShimmerButton>
                </div>

              </form>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
    </>
  );
}
