import Link from 'next/link';
import { Droplets, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Hematology | Sunshine Clinical Lab',
  description: 'Complete blood count, differential analysis, and specialized blood disorder testing with high precision.',
};

const tests = [
  'Complete Blood Count (CBC)',
  'Differential White Blood Cell Count',
  'Reticulocyte Count',
  'Peripheral Blood Smear',
  'Erythrocyte Sedimentation Rate (ESR)',
  'Hemoglobin Electrophoresis',
  'Iron Studies (Serum Iron, TIBC, Ferritin)',
  'Coagulation Screening',
];

export default function HematologyPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Droplets className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hematology</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Precise blood analysis and disorder testing to support diagnosis, monitoring, and treatment decisions.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our Hematology department offers a comprehensive range of blood testing services performed by certified
              laboratory professionals using state-of-the-art automated analyzers. From routine complete blood counts to
              advanced blood disorder evaluations, we deliver fast, accurate results that help clinicians make confident
              diagnostic decisions. Our lab maintains rigorous quality control standards to ensure every result you
              receive is reliable and reproducible.
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
