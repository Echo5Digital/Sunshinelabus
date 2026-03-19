import ReferralSection from '@/components/ReferralSection';

export const metadata = {
  title: 'Send a Referral — Sunshine Clinical Lab LLC',
  description: 'Refer your patients to Sunshine Clinical Lab LLC for innovative, timely, and quality medical laboratory services.',
};

export default function ReferralsPage() {
  return (
    <main className="min-h-screen">
      <ReferralSection />
    </main>
  );
}
