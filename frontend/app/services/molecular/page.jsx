import Link from 'next/link';
import { Dna, CheckCircle, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export const metadata = {
  title: 'Molecular Testing | Sunshine Clinical Lab',
  description: 'PCR-based infectious disease detection and genetic mutation testing with rapid results.',
};

const tests = [
  'COVID-19 PCR & Antigen Testing',
  'Respiratory Pathogen Panel (Flu A/B, RSV)',
  'STI Molecular Panel (Chlamydia, Gonorrhea)',
  'HPV Genotyping',
  'Hepatitis B & C Viral Load',
  'HIV-1/2 PCR & Genotyping',
  'MRSA/MSSA Screening',
  'Genetic Mutation Analysis (BRCA, KRAS)',
];

export default function MolecularTestingPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Dna className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Molecular Testing</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            PCR and nucleic acid testing for rapid, highly sensitive detection of infectious agents and genetic mutations.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Molecular diagnostics represent the cutting edge of laboratory medicine, enabling detection of pathogens
              and genetic variants at the nucleic acid level. Our molecular laboratory employs real-time PCR, multiplex
              panels, and next-generation sequencing workflows to deliver results with unparalleled sensitivity and
              specificity. Rapid turnaround times allow clinicians to make informed treatment decisions quickly,
              improving patient outcomes in infectious disease management and oncology.
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
