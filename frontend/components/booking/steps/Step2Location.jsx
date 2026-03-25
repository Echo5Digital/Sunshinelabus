'use client';

import { useEffect, useRef } from 'react';
import { Building2, Truck, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const LOCATION_OPTIONS = [
  {
    key: 'on_site',
    icon: Building2,
    title: 'Visit Our Clinic',
    subtitle: '3600 Galileo Dr, Suite 104',
    detail: 'New Port Richey, FL 34655',
    badges: ['Free parking', 'Walk-ins welcome', 'Mon–Fri 8AM–5PM'],
    iconBg: 'bg-sunshine-blue/10 text-sunshine-blue',
    iconBgActive: 'bg-sunshine-blue text-white',
  },
  {
    key: 'home_visit',
    icon: Truck,
    title: 'We Come to You',
    subtitle: 'Mobile phlebotomy service',
    detail: 'Pasco County & surrounding areas',
    badges: ['Address required', 'Additional fee may apply'],
    iconBg: 'bg-sunshine-sky/20 text-sunshine-sky',
    iconBgActive: 'bg-sunshine-sky text-white',
  },
];

export default function Step2Location({
  bookingData,
  updateBookingData,
  onNext,
  onPrev,
}) {
  const { service, locationType } = bookingData;
  const autoSkipped = useRef(false);

  // Auto-skip: force location and advance when service has no meaningful choice.
  // useRef guard prevents React Strict Mode's double-invocation from calling onNext() twice.
  useEffect(() => {
    if (autoSkipped.current) return;
    if (service?.requires_address) {
      autoSkipped.current = true;
      updateBookingData({ locationType: 'home_visit' });
      onNext();
    } else if (service && !service.allows_home_visit) {
      autoSkipped.current = true;
      updateBookingData({ locationType: 'on_site' });
      onNext();
    }
  }, [service, updateBookingData, onNext]);

  // Don't render while auto-skipping
  if (service?.requires_address || (service && !service.allows_home_visit)) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-sunshine-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Select Location Type</h2>
        <p className="text-gray-500 text-sm mt-1">
          Where would you like your <span className="text-sunshine-dark font-medium">{service?.name}</span> appointment?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LOCATION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = locationType === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => updateBookingData({ locationType: opt.key })}
              className={`text-left rounded-2xl border-2 p-6 transition-all duration-200
                hover:border-sunshine-blue hover:shadow-md hover:shadow-sunshine-blue/10
                ${isSelected
                  ? 'border-sunshine-blue bg-sunshine-soft/30 shadow-md shadow-sunshine-blue/15'
                  : 'border-gray-100 bg-white'
                }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors
                ${isSelected ? opt.iconBgActive : opt.iconBg}`}>
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="font-bold text-sunshine-dark text-base mb-1">{opt.title}</h3>
              <p className="text-sunshine-dark/70 text-sm font-medium">{opt.subtitle}</p>

              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 mb-4">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {opt.detail}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {opt.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[11px] bg-sunshine-soft text-sunshine-dark/70 px-2.5 py-1 rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <ShimmerButton
          onClick={onNext}
          disabled={!locationType}
          className={`bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-opacity ${
            !locationType ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-1" />
        </ShimmerButton>
      </div>
    </div>
  );
}
