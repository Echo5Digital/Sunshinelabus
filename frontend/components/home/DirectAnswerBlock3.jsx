'use client';
import { useRef, useEffect, useState } from 'react';

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
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby="walk-in-lab-near-me-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-sunshine-blue pl-6">
          <h2
            id="walk-in-lab-near-me-heading"
            className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
          >
            Where Can I Find a Walk-In Lab Near Me in Pasco County?
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
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
        </div>
      </div>
    </section>
  );
}
