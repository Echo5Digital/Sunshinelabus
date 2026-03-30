'use client';

import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '@/lib/booking-constants';

export default function WizardProgressBar({ currentStep, onStepClick }) {
  return (
    <div className="flex items-center w-full px-2 mb-2">
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            {/* Step node */}
            <div className="flex flex-col items-center flex-shrink-0">
              <button
                onClick={() => isCompleted && onStepClick(step.id)}
                disabled={!isCompleted}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all duration-200 ${
                  isCompleted
                    ? 'bg-sunshine-blue text-white cursor-pointer hover:opacity-80 shadow-md'
                    : isActive
                    ? 'bg-sunshine-blue text-white ring-4 ring-sunshine-blue/25 shadow-md'
                    : 'bg-white border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  <span>{step.id}</span>
                )}
              </button>
              <span
                className={`hidden sm:inline-block mt-1 text-[10px] font-medium leading-tight text-center w-12 truncate ${
                  isActive
                    ? 'text-sunshine-blue font-semibold'
                    : isCompleted
                    ? 'text-sunshine-blue'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 mx-0.5 sm:mx-1 mb-4">
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-sunshine-blue' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
