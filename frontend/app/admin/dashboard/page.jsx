'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getAdminToken, clearAdminToken, fetchAdminStats } from '@/lib/api';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [status, setStatus] = useState('checking'); // 'checking' | 'authenticated' | 'denied'

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    // Verify token is still valid by hitting a protected endpoint
    fetchAdminStats()
      .then(() => setStatus('authenticated'))
      .catch((err) => {
        if (err?.response?.status === 401) {
          clearAdminToken();
          router.replace('/admin/login');
        } else {
          // Non-auth error (e.g. network) — still show dashboard
          setStatus('authenticated');
        }
      });
  }, [router]);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-sunshine-dark flex flex-col items-center justify-center gap-4">
        <Image src="/logo2.webp" alt="Sunshine Clinical Lab" width={132} height={40} className="object-contain brightness-0 invert opacity-70" />
        <Loader2 className="w-7 h-7 text-sunshine-sky animate-spin" />
      </div>
    );
  }

  return <AdminDashboard />;
}
