import Link from 'next/link';
import { FlaskConical, CheckCircle, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export const metadata = {
  title: 'Chemistry | Sunshine Clinical Lab',
  description: 'Comprehensive metabolic panels, liver function, kidney function, and electrolyte testing.',
};

const tests = [
  'Basic Metabolic Panel (BMP)',
  'Comprehensive Metabolic Panel (CMP)',
  'Liver Function Tests (LFTs)',
  'Kidney Function Tests (BUN, Creatinine)',
  'Lipid Panel (Cholesterol, Triglycerides)',
  'Glucose & HbA1c',
  'Electrolyte Panel (Na, K, Cl, CO₂)',
  'Thyroid Panel (TSH, T3, T4)',
];

export default function ChemistryPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <FlaskConical className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Chemistry</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Comprehensive biochemical analysis delivering insights into metabolic health, organ function, and more.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Clinical chemistry testing is the foundation of preventive care and disease management. Our chemistry
              laboratory uses high-throughput automated platforms to process a wide variety of serum and plasma
              specimens. Whether you need routine metabolic monitoring, lipid assessment, or organ function evaluation,
              our team delivers results you can rely on for accurate clinical decision-making.
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
            <Link href="/book-appointment">
              <ShimmerButton className="bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white font-semibold px-6 py-3 rounded-full shadow-xl">
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
