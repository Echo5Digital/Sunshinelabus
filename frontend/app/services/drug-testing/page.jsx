import Link from 'next/link';
import { TestTube, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Drug Testing | Sunshine Clinical Lab',
  description: 'Urine, hair follicle, and oral fluid drug screening panels for workplace and clinical needs.',
};

const tests = [
  '5-Panel Urine Drug Screen',
  '10-Panel Urine Drug Screen',
  'Hair Follicle Drug Testing (90-day window)',
  'Oral Fluid (Saliva) Drug Testing',
  'Prescription Drug Monitoring',
  'Alcohol Testing (EtG, EtS)',
  'SAMHSA-5 Compliance Testing',
  'Confirmatory GC-MS / LC-MS/MS Testing',
];

export default function DrugTestingPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <TestTube className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Drug Testing</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Reliable drug screening for workplace compliance, clinical monitoring, and forensic applications.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Sunshine Clinical Lab offers a full spectrum of drug testing services to meet workplace, legal, and
              clinical requirements. Our certified laboratory performs immunoassay screening with confirmatory mass
              spectrometry for unmatched accuracy and chain-of-custody compliance. Whether you need pre-employment
              screening, random workplace testing, or court-ordered panels, our team ensures confidential, defensible
              results delivered promptly.
            </p>
          </div>

          {/* Tests Offered */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-6">Tests We Offer</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tests.map((test) => (
                <li key={test} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-sunshine-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{test}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-sunshine-blue rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Tested?</h3>
            <p className="text-white/80 mb-6">Book an appointment and receive your results with precision and care.</p>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-sunshine-yellow text-sunshine-dark font-semibold px-6 py-3 rounded-full hover:brightness-105 transition-all"
            >
              Book Appointment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
