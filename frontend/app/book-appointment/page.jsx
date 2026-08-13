import BookingWizard from '@/components/booking/BookingWizard';

export const metadata = {
  title: 'Book an Appointment — Sunshine Clinical Lab LLC',
  description: 'Schedule your laboratory visit at Sunshine Clinical Lab LLC. Our guided booking wizard makes it easy to pick your service, date, and time.',
  alternates: {
    canonical: 'https://www.sunshinelabus.com/book-appointment',
  },
};

export default async function BookAppointmentPage({ searchParams }) {
  const params = await searchParams;
  const deepLinkService = typeof params?.service === 'string' ? params.service : null;
  const deepLinkLocation = typeof params?.location === 'string' ? params.location : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sunshine-soft/50 via-white to-white pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <BookingWizard deepLinkService={deepLinkService} deepLinkLocation={deepLinkLocation} />
      </div>
    </main>
  );
}
