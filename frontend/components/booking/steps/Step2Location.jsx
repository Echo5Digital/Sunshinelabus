'use client';

import { useEffect, useRef } from 'react';
import { Building2, Home, ChevronRight, ChevronLeft, MapPin, Clock, Languages } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const LOCATION_OPTIONS = [
  {
    key: 'on_site',
    zone: null,
    icon: Building2,
    title: 'In-Office',
    subtitle: 'Visit our Trinity lab',
    detail: '3600 Galileo Dr, Suite 104, Trinity, FL',
    hours: 'Mon–Fri 8:00 AM – 2:00 PM',
    iconBg: 'bg-sunshine-blue/10 text-sunshine-blue',
    iconBgActive: 'bg-sunshine-blue text-white',
  },
  {
    key: 'home_visit',
    zone: 'trinity_nearby',
    icon: Home,
    title: 'Home Visit — Trinity & Nearby',
    subtitle: null,
    detail: 'New Port Richey, Trinity, Tarpon Springs, Land O’ Lakes, Holiday, Hudson',
    hours: 'Mon–Fri 8:00 AM – 2:00 PM',
    iconBg: 'bg-sunshine-sky/20 text-sunshine-sky',
    iconBgActive: 'bg-sunshine-sky text-white',
  },
  {
    key: 'home_visit',
    zone: 'wesley_chapel',
    icon: Home,
    title: 'Home Visit — Wesley Chapel',
    subtitle: null,
    detail: 'Wesley Chapel, Seven Oaks, Wiregrass',
    zips: 'Zip codes: 33544, 33545',
    hours: 'Mon–Fri: Early AM (3–7:30 AM) & Morning (9 AM–2:30 PM)',
    iconBg: 'bg-sunshine-sky/20 text-sunshine-sky',
    iconBgActive: 'bg-sunshine-sky text-white',
  },
  {
    key: 'home_visit',
    zone: 'zephyrhills_dade_city',
    icon: Home,
    title: 'Home Visit — Zephyrhills & Dade City',
    subtitle: null,
    detail: 'Zephyrhills, Dade City, San Antonio',
    zips: 'Zip codes: 33539–33542, 33523–33526, 33576',
    hours: 'Mon–Fri: Early AM (3–7:30 AM) & Morning (9 AM–2:30 PM)',
    note: '🇪🇸 ¡Flebotomista que habla español!',
    iconBg: 'bg-sunshine-sky/20 text-sunshine-sky',
    iconBgActive: 'bg-sunshine-sky text-white',
  },
  {
    key: 'home_visit',
    zone: 'bushnell_villages',
    icon: Home,
    title: 'Home Visit — Bushnell & The Villages Area',
    subtitle: null,
    detail: 'Bushnell, The Villages, Wildwood',
    zips: 'Zip code: 33515',
    hours: 'Mon–Fri: Early AM (3–7:30 AM) & Morning (9 AM–2:30 PM)',
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
  const { service, locationType, locationZone } = bookingData;
  const autoSkipped = useRef(false);

  // Auto-skip: force location and advance when service has no meaningful choice.
  // useRef guard prevents React Strict Mode's double-invocation from calling onNext() twice.
  useEffect(() => {
    if (autoSkipped.current) return;
    if (service?.requires_address) {
      autoSkipped.current = true;
      // Preserve an already-assigned zone (e.g. from a deep link) instead of
      // forcing trinity_nearby — only default to it when no zone is set yet.
      updateBookingData({
        locationType: 'home_visit',
        locationZone: locationType === 'home_visit' && locationZone ? locationZone : 'trinity_nearby',
      });
      onNext();
    } else if (service && !service.allows_home_visit) {
      autoSkipped.current = true;
      updateBookingData({ locationType: 'on_site', locationZone: null });
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

  const handleSelect = (opt) => {
    updateBookingData({ locationType: opt.key, locationZone: opt.zone });
  };

  const isSelected = (opt) => locationType === opt.key && locationZone === opt.zone;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Where would you like your appointment?</h2>
        <p className="text-gray-500 text-sm mt-1">
          Choose a location for your <span className="text-sunshine-dark font-medium">{service?.name}</span> appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LOCATION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const selected = isSelected(opt);

          return (
            <button
              key={`${opt.key}-${opt.zone || 'none'}`}
              onClick={() => handleSelect(opt)}
              className={`text-left rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200
                hover:border-sunshine-blue hover:shadow-md hover:shadow-sunshine-blue/10
                ${selected
                  ? 'border-sunshine-blue bg-sunshine-soft/30 shadow-md shadow-sunshine-blue/15'
                  : 'border-gray-100 bg-white'
                }`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors
                ${selected ? opt.iconBgActive : opt.iconBg}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <h3 className="font-bold text-sunshine-dark text-base mb-1">{opt.title}</h3>
              {opt.subtitle && (
                <p className="text-sunshine-dark/70 text-sm font-medium mb-0.5">{opt.subtitle}</p>
              )}

              <div className="flex items-start gap-1 text-xs text-gray-400 mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>{opt.detail}</span>
              </div>

              {opt.zips && (
                <p className="text-xs text-gray-400 mt-1 ml-4">{opt.zips}</p>
              )}

              <div className="flex items-start gap-1 text-xs text-gray-500 mt-2 font-medium">
                <Clock className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>{opt.hours}</span>
              </div>

              {opt.note && (
                <div className="flex items-center gap-1.5 text-xs text-sunshine-blue mt-2 font-medium">
                  <Languages className="w-3 h-3 flex-shrink-0" />
                  <span>{opt.note}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onPrev}
          className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <ShimmerButton
          onClick={onNext}
          disabled={!locationType}
          className={`w-full sm:w-auto bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-opacity ${
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
