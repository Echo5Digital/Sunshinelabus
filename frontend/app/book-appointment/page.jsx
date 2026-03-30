import BookingWizard from '@/components/booking/BookingWizard';

export const metadata = {
  title: 'Book an Appointment — Sunshine Clinical Lab LLC',
  description: 'Schedule your laboratory visit at Sunshine Clinical Lab LLC. Our guided booking wizard makes it easy to pick your service, date, and time.',
};

export default function BookAppointmentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sunshine-soft/50 via-white to-white pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <BookingWizard />
      </div>
    </main>
  );
}
