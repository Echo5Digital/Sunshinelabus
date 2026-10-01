'use client';

import { useEffect, useRef } from 'react';

// OpenStreetMap via Leaflet — free, no API key required. Loaded dynamically
// (see AdminFieldVisitsPanel's dynamic import) since Leaflet touches
// window/document directly and cannot run during Next.js server rendering.
const STATUS_COLOR = {
  checked_in: '#facc15',
  completed: '#34d399',
  no_show: '#f87171',
  default: '#60a5fa',
};

export default function FieldVisitsMap({ pins }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      if (cancelled || !containerRef.current) return;

      if (!mapRef.current) {
        mapRef.current = L.map(containerRef.current).setView([28.19, -82.72], 11); // Tampa/New Port Richey default
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapRef.current);
      }

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const validPins = pins.filter((p) => p.lat != null && p.lng != null);
      validPins.forEach((pin) => {
        const color = STATUS_COLOR[pin.status] || STATUS_COLOR.default;
        const icon = L.divIcon({
          className: '',
          html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid #0f1624;box-shadow:0 1px 4px rgba(0,0,0,0.5)"></div>`,
          iconSize: [14, 14],
        });
        const marker = L.marker([pin.lat, pin.lng], { icon })
          .addTo(mapRef.current)
          .bindTooltip(pin.label, { permanent: false, direction: 'top' });
        markersRef.current.push(marker);
      });

      if (validPins.length > 0) {
        const bounds = L.latLngBounds(validPins.map((p) => [p.lat, p.lng]));
        mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pins]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
