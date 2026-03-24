'use client';
import { useRef, useEffect, useState } from 'react';
import { Users, CalendarDays, Shield, MapPin, CheckCircle2 } from 'lucide-react';

export default function DirectAnswerBlock3() {
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
      aria-labelledby="walk-in-lab-near-me-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
          <div className="p-7 sm:p-9">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                Open to All Ages &amp; Insurances
              </span>
            </div>
            <h2
              id="walk-in-lab-near-me-heading"
              className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
            >
              Where Can I Find a Walk-In Lab Near Me in Pasco County?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-7">
              Sunshine Clinical Lab at <strong>3600 Galileo Dr, Trinity, FL 34655</strong> is a
              walk-in clinical laboratory serving Pasco County and the Tampa Bay region. Walk-ins are
              welcome for most routine blood work, and the lab offers specialty services including TRT
              blood testing, DNA testing, gender reveal blood tests, and mobile phlebotomy. The lab is
              open to patients of all ages and accepts most major insurance plans. Call{' '}
              <a href="tel:7272335223" className="text-sunshine-blue font-semibold hover:underline">
                (727) 233-5223
              </a>{' '}
              for hours and availability.
            </p>
            {/* Quick stats strip */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { icon: CalendarDays, label: 'Walk-Ins Welcome' },
                { icon: Shield, label: 'Most Insurance Accepted' },
                { icon: CheckCircle2, label: 'All Ages Welcome' },
                { icon: MapPin, label: '3600 Galileo Dr, Trinity' },
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
