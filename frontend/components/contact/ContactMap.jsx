import { MapPin } from 'lucide-react';

export default function ContactMap() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-sunshine-dark mb-6">Find Us</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-sunshine-sky/20 h-80 lg:h-[420px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.6558376295085!2d-95.3698!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ1JzM3LjQiTiA5NcKwMjInMTEuMyJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sunshine Clinical Laboratory Location"
          />
        </div>
        <div className="mt-4 flex items-start gap-3 text-sunshine-dark/70">
          <MapPin className="w-5 h-5 text-sunshine-blue mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sunshine-dark">Sunshine Clinical Laboratory</p>
            <p className="text-sm">123 Medical Drive, Houston, TX 77001</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sunshine-blue hover:underline mt-1 inline-block"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
