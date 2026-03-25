import Link from 'next/link';
import { Syringe, CheckCircle, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export const metadata = {
  title: 'Phlebotomy Service | Sunshine Clinical Lab',
  description: 'Professional blood draw services available at our facility or via mobile phlebotomy visits.',
};

const services = [
  'Routine Venipuncture (Arm Draw)',
  'Pediatric & Geriatric Phlebotomy',
  'Difficult-Vein Specialist Draws',
  'Mobile / At-Home Phlebotomy Visits',
  'Point-of-Care Specimen Collection',
  /*'Capillary Blood Collection (Fingerstick)',
  'Arterial Blood Gas (ABG) Collection',*/
  'Specimen Processing & Transport',
];

export default function PhlebotomyPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* Hero */}
      <section className="bg-sunshine-blue text-white py-20 pt-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Syringe className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Phlebotomy Service</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Comfortable, professional blood collection at our facility or at your doorstep with our mobile phlebotomy team.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Quality specimens begin with quality collection. Our certified phlebotomists are trained to provide
              comfortable, efficient blood draws for patients of all ages — from pediatric to geriatric populations.
              For patients who are homebound, elderly, or simply prefer the convenience, our mobile phlebotomy service
              brings professional specimen collection directly to you. All specimens are handled under strict
              chain-of-custody and temperature-control protocols to guarantee integrity from collection to result.
            </p>
          </div>

          {/* Services Offered */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-sunshine-dark mb-6">Services We Offer</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-sunshine-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-sunshine-blue rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Schedule a Draw</h3>
            <p className="text-white/80 mb-6">Book in-lab or request a mobile visit — we come to you.</p>
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
