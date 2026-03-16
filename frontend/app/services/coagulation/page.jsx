import Link from 'next/link';
import { Activity, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Coagulation Service | Sunshine Clinical Lab',
  description: 'PT, PTT, INR, fibrinogen, and advanced coagulation factor analysis for bleeding disorders.',
};

const tests = [
  'Prothrombin Time (PT)',
  'Activated Partial Thromboplastin Time (aPTT)',
  'International Normalized Ratio (INR)',
  'Fibrinogen Level',
  'D-Dimer',
  'Thrombin Time',
  'Factor Assays (Factor VIII, IX, XI)',
  'Lupus Anticoagulant Panel',
];

export default function CoagulationPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Coagulation Service</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Comprehensive coagulation testing for bleeding disorders, anticoagulant therapy monitoring, and thrombosis evaluation.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our Coagulation department provides thorough hemostasis testing essential for diagnosing bleeding and
              clotting disorders, as well as monitoring patients on anticoagulation therapy such as warfarin or heparin.
              Using dedicated coagulation analyzers, we measure clot formation and fibrinolysis with precision.
              Turnaround times are optimized to support urgent clinical needs while maintaining the highest quality
              standards.
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
