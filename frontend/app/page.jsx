import HeroSlider from '@/components/HeroSlider';
import AppointmentCTASection from '@/components/AppointmentCTASection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import SendMessageSection from '@/components/SendMessageSection';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AppointmentCTASection />
      <ServicesSection />
      <AboutSection />
      <SendMessageSection />
    </>
  );
}
