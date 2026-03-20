'use client';
import { useRef, useEffect, useState } from 'react';

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
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby="why-patients-choose-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-sunshine-blue pl-6">
          <h2
            id="why-patients-choose-heading"
            className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
          >
            Why Do Patients Choose Sunshine Clinical Lab Over Chain Labs?
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Patients in Trinity, New Port Richey, and Pasco County choose Sunshine Clinical Lab
            because of significantly shorter wait times, next-day results for many routine tests,
            experienced phlebotomists with over 35 years of combined experience, mobile blood draw
            convenience, specialty services including TRT monitoring and DNA testing, and affordable
            pricing without corporate markups. The lab is locally owned and provides a personalized
            patient experience that large national chains do not offer.
          </p>
        </div>
      </div>
    </section>
  );
}
