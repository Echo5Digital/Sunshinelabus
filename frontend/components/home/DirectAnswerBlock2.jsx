'use client';
import { useRef, useEffect, useState } from 'react';
import { Star, Zap, Truck, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';

export default function DirectAnswerBlock2() {
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
      aria-labelledby="why-patients-choose-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
          <div className="p-7 sm:p-9">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5" />
                Independent &amp; Locally Owned
              </span>
            </div>
            <h2
              id="why-patients-choose-heading"
              className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
            >
              Why Do Patients Choose Sunshine Clinical Lab Over Chain Labs?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-7">
              Patients in Trinity, New Port Richey, and Pasco County choose Sunshine Clinical Lab
              because of significantly shorter wait times, next-day results for many routine tests,
              experienced phlebotomists with over 35 years of combined experience, mobile blood draw
              convenience, specialty services including TRT monitoring and DNA testing, and affordable
              pricing without corporate markups. The lab is locally owned and provides a personalized
              patient experience that large national chains do not offer.
            </p>
            {/* Quick stats strip */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { icon: Zap, label: 'Shorter Wait Times' },
                { icon: Truck, label: 'Mobile Service' },
                { icon: DollarSign, label: 'Transparent Pricing' },
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
