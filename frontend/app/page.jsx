import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import MissionSection from '@/components/MissionSection';
import AppointmentForm from '@/components/AppointmentForm';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <MissionSection />
      <section id="appointment" className="py-20 bg-sunshine-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-sunshine-yellow/20 text-sunshine-yellow text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Schedule a Visit
            </span>
            <h2 className="text-3xl font-bold text-white mb-2">Book an Appointment</h2>
            <p className="text-white/60">Schedule your laboratory visit at your convenience. We&apos;ll confirm within 24 hours.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
