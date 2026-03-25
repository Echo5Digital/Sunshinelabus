'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronRight, Truck, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchServices } from '@/lib/api';
import { SERVICE_ICONS } from '@/lib/booking-constants';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 p-5 animate-pulse">
          <div className="w-12 h-12 rounded-xl bg-gray-200 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-full mb-1" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function Step1Service({ bookingData, updateBookingData, onNext }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch {
      setError('Could not load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const selected = bookingData.service;

  const handleSelect = (svc) => {
    updateBookingData({ service: svc, locationType: null });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Select a Service</h2>
        <p className="text-gray-500 text-sm mt-1">Choose the service you&apos;d like to schedule.</p>
      </div>

      {loading && <ServiceSkeleton />}

      {error && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-gray-600 text-sm">{error}</p>
          <button
            onClick={load}
            className="flex items-center gap-2 text-sunshine-blue text-sm font-medium hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((svc) => {
            const Icon = SERVICE_ICONS[svc.slug] || Clock;
            const isSelected = selected?.id === svc.id;

            return (
              <button
                key={svc.id}
                onClick={() => handleSelect(svc)}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 group
                  hover:border-sunshine-blue hover:shadow-md hover:shadow-sunshine-blue/10
                  ${isSelected
                    ? 'border-sunshine-blue bg-sunshine-soft/40 shadow-md shadow-sunshine-blue/15'
                    : 'border-gray-100 bg-white hover:bg-sunshine-soft/20'
                  }`}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-sunshine-blue flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                )}

                {/* Home visit badge */}
                {svc.allows_home_visit && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-sunshine-soft text-sunshine-dark border border-sunshine-sky/30 px-2 py-0.5 rounded-full mb-2">
                    <Truck className="w-2.5 h-2.5" />
                    Home Visit Available
                  </span>
                )}

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors
                  ${isSelected ? 'bg-sunshine-blue text-white' : 'bg-sunshine-blue/10 text-sunshine-blue group-hover:bg-sunshine-blue/20'}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Name */}
                <h3 className="font-semibold text-sunshine-dark text-sm leading-snug mb-1">
                  {svc.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                  {svc.description}
                </p>

                {/* Duration badge */}
                <span className="inline-flex items-center gap-1 text-xs text-sunshine-dark/70 bg-sunshine-soft rounded-full px-2.5 py-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {svc.duration_minutes} min
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* CTA */}
      {!loading && !error && (
        <div className="mt-8 flex justify-end">
          <ShimmerButton
            onClick={onNext}
            disabled={!selected}
            className={`bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-opacity ${
              !selected ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </ShimmerButton>
        </div>
      )}
    </div>
  );
}
