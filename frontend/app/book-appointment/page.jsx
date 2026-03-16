import BookAppointmentSection from '@/components/BookAppointmentSection';

export const metadata = {
  title: 'Book an Appointment — Sunshine Clinical Lab LLC',
  description: 'Schedule your laboratory visit at Sunshine Clinical Lab LLC.',
};

export default function BookAppointmentPage() {
  return (
    <main className="min-h-screen bg-sunshine-light py-16">
      <BookAppointmentSection />
    </main>
  );
}
