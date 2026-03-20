'use client';
import { useRef, useEffect, useState } from 'react';

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
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby="what-is-scl-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-sunshine-blue pl-6">
          <h2
            id="what-is-scl-heading"
            className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
          >
            What Is Sunshine Clinical Lab?
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            Sunshine Clinical Lab LLC is an independent clinical laboratory located at{' '}
            <strong>3600 Galileo Dr, Trinity, FL 34655</strong>. The lab provides fast, affordable
            blood work, specialty testing, mobile phlebotomy, TRT monitoring panels, DNA testing,
            and gender reveal blood tests to patients throughout Pasco County and the Tampa Bay
            region. Walk-ins are welcome for many services, and results for many routine tests are
            available the next business day. The lab serves as a personalized, faster alternative
            to large national chain laboratories.
          </p>
        </div>
      </div>
    </section>
  );
}
