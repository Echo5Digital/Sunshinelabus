'use client';
import { useRef, useEffect, useState } from 'react';
import { MapPin, CheckCircle2, Clock, Award } from 'lucide-react';

export default function DirectAnswerBlock1() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-12 bg-[#EBF5FB] transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby="what-is-scl-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
          <div className="p-7 sm:p-9">
            {/* Location badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5" />
                Trinity, FL 34655 — Pasco County
              </span>
            </div>
            <h2
              id="what-is-scl-heading"
              className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
            >
              What Is Sunshine Clinical Lab?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-7">
              Sunshine Clinical Lab LLC is an independent clinical laboratory located at{' '}
              <strong>3600 Galileo Dr, Suite 104, Trinity, FL 34655</strong>. The lab provides fast, affordable
              blood work, specialty testing, mobile phlebotomy, TRT monitoring panels, DNA testing,
              and gender reveal blood tests to patients throughout Pasco County and the Tampa Bay
              region. Walk-ins are welcome for many services, and results for many routine tests are
              available the next business day. The lab serves as a personalized, faster alternative
              to large national chain laboratories.
            </p>
            {/* Quick stats strip */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { icon: CheckCircle2, label: 'Walk-Ins Welcome' },
                { icon: Clock, label: 'Next-Day Results' },
                { icon: Award, label: '35+ Years Experience' },
                { icon: MapPin, label: 'Trinity, FL' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  <Icon className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
