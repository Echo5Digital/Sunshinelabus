'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useBookingState } from '@/lib/useBookingState';
import WizardProgressBar from './WizardProgressBar';
import Step1Service from './steps/Step1Service';
import Step2Location from './steps/Step2Location';
import Step3Date from './steps/Step3Date';
import Step4Time from './steps/Step4Time';
import Step5PatientInfo from './steps/Step5PatientInfo';
import Step6Documents from './steps/Step6Documents';
import Step7Review from './steps/Step7Review';

const STEPS = [null, Step1Service, Step2Location, Step3Date, Step4Time, Step5PatientInfo, Step6Documents, Step7Review];

const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: (dir) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

export default function BookingWizard() {
  const state = useBookingState();
  const { step, goToStep, nextStep, prevStep } = state;
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    nextStep();
  }, [nextStep]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    prevStep();
  }, [prevStep]);

  const handleGoToStep = useCallback((n) => {
    setDirection(n < step ? -1 : 1);
    goToStep(n);
  }, [step, goToStep]);

  const CurrentStep = STEPS[step];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-sunshine-soft text-sunshine-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-sky/40">
          <CalendarDays className="w-3.5 h-3.5" />
          Schedule a Visit
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-2">
          Book an Appointment
        </h1>
        <p className="text-gray-500 text-base">
          Sunshine Clinical Lab — New Port Richey, FL
        </p>
      </div>

      {/* Progress bar */}
      <WizardProgressBar currentStep={step} onStepClick={handleGoToStep} />

      {/* Step card */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 overflow-hidden mt-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="p-6 sm:p-10"
          >
            <CurrentStep
              {...state}
              onNext={handleNext}
              onPrev={handlePrev}
              onGoToStep={handleGoToStep}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
