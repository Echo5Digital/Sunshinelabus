import Link from 'next/link';
import { Microscope, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'DNA Testing | Sunshine Clinical Lab',
  description: 'Paternity, ancestry, and forensic DNA analysis services using state-of-the-art technology.',
};

const tests = [
  'Legal Paternity DNA Testing',
  'Non-Legal / Peace-of-Mind Paternity Test',
  'Maternity DNA Testing',
  'Siblingship & Family Relationship Testing',
  'Ancestry & Ethnicity DNA Analysis',
  'Forensic DNA Profiling',
  'Prenatal Paternity Testing',
  'Immigration DNA Testing (AABB-accredited)',
];

export default function DNATestingPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="py-20 pt-36 text-white" style={{ background: 'linear-gradient(135deg, #2B7DBF 0%, #1a5a8f 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
            <Microscope className="w-8 h-8" />
          </div>
          <span className="inline-block bg-sunshine-yellow text-sunshine-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
            ⭐ Featured Service
          </span>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">DNA Testing</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Accurate, confidential DNA analysis for paternity, ancestry, forensics, and legal purposes using state-of-the-art technology.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our DNA Testing service offers the most advanced genetic analysis available, conducted in our
              CLIA-certified laboratory by experienced molecular geneticists. Using short tandem repeat (STR) profiling
              and next-generation sequencing, we provide results with greater than 99.9% accuracy for relationship
              testing. All legal DNA tests are performed under strict chain-of-custody protocols and are admissible in
              court. Results are delivered securely and confidentially, typically within 3–5 business days.
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
          <div className="rounded-2xl p-8 text-white text-center" style={{ background: 'linear-gradient(135deg, #2B7DBF 0%, #1a5a8f 100%)' }}>
            <h3 className="text-2xl font-bold mb-3">Get Your DNA Test Today</h3>
            <p className="text-white/80 mb-6">Confidential, accurate, and fast results for peace of mind or legal needs.</p>
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
