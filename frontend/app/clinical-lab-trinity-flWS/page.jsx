export const metadata = {
  title: "Clinical Lab in Trinity FL | Sunshine Clinical Lab",
  description: "Sunshine Clinical Lab in Trinity, FL — offering fast, reliable lab testing with personalized service. Walk-in or schedule an appointment today.",
  openGraph: {
    title: "Clinical Lab in Trinity FL | Sunshine Clinical Lab",
    description: "Sunshine Clinical Lab in Trinity, FL — offering fast, reliable lab testing with personalized service. Walk-in or schedule an appointment today.",
    url: "https://www.sunshinelabus.com/trusted-clinical-lab-trinity-fl",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Lab in Trinity FL | Sunshine Clinical Lab",
    description: "Sunshine Clinical Lab in Trinity, FL — offering fast, reliable lab testing with personalized service. Walk-in or schedule an appointment today."
  }
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          // List all questions and accepted answers here based on the FAQ
        ]
      })}</script>
      <main style={{ paddingTop: '80px', fontFamily: 'Inter,sans-serif', background: '#EBF5FB' }}>
        {/* HERO section */}
        <section style={{ background: 'linear-gradient(to bottom right, #0EA5E9, #38BDF8)', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>Trusted Clinical Lab in Trinity, FL</h1>
            <p style={{ fontWeight: 'bold', marginBottom: '40px' }}>At Sunshine Clinical Lab, we offer fast, reliable lab services in the heart of Trinity, FL. Experience cutting-edge diagnostic testing with no appointment necessary. Join our many satisfied clients who appreciate our personalized care.</p>
            <button style={{ background: '#0EA5E9', color: '#FFFFFF', borderRadius: '8px', padding: '14px 28px', fontWeight: 'bold', cursor: 'pointer' }}>Contact Us Now</button>
          </div>
        </section>

        {/* Welcome Section */}
        <section style={{ background: '#FFFFFF', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Welcome to Sunshine Clinical Lab in Trinity, FL</h2>
            <p style={{ color: '#374151', marginBottom: '20px' }}>Discover fast, reliable lab services right here in Trinity, FL. We offer walk-in blood testing and specialty panels without the need for an appointment.</p>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'Inter,sans-serif', color: '#0D3047', marginBottom: '10px' }}>Fast and Reliable Service</h3>
            <ul style={{ color: '#374151' }}>
              <li>Comprehensive range of diagnostic services.</li>
              <li>Experience fast turnaround times for your tests.</li>
              <li>Located conveniently in Trinity, just for you.</li>
            </ul>
            <a href="https://www.sunshinelabus.com/all-services" style={{ color: '#0EA5E9', fontWeight: 'bold' }}>About Our Services</a>
          </div>
        </section>

        {/* Our Services Section */}
        <section style={{ background: '#E6F6FB', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Our Services: Fast and Convenient Testing</h2>
            <ul style={{ color: '#374151' }}>
              <li style={{ marginBottom: '10px' }}>No appointment needed for blood tests.</li>
              <li style={{ marginBottom: '10px' }}>Mobile phlebotomy services available across Pasco County.</li>
              <li>Get fast results on hormone and specialty tests.</li>
            </ul>
            <a href="https://www.sunshinelabus.com/book-appointment" style={{ color: '#0EA5E9', fontWeight: 'bold' }}>Book Your Appointment</a>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section style={{ background: '#FFFFFF', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Why Choose Sunshine Clinical Lab?</h2>
            <div style={{ color: '#374151' }}>
              <p>At Sunshine Clinical Lab, enjoy personalized and quick service that only a local, trusted provider can offer.</p>
              <ul>
                <li>Our experienced team is dedicated to delivering fast results.</li>
                <li>Located in your neighborhood, we're here for personalized service.</li>
                <li>Our lab is independently operated and tailored to community needs.</li>
              </ul>
              <a href="https://www.sunshinelabus.com/about" style={{ color: '#0EA5E9', fontWeight: 'bold' }}>About Us</a>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section style={{ background: '#E6F6FB', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Service Areas and Locations</h2>
            <p style={{ color: '#374151' }}>Our services cover an extensive area around Trinity, ensuring we bring healthcare closer to you.</p>
            <ul>
              <li>Serving the entire Pasco County region.</li>
              <li>Walk-in and mobile services in Trinity, FL.</li>
            </ul>
            {/* Embed map if needed */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ background: '#FFFFFF', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Client Testimonials</h2>
            <div style={{ borderLeft: '4px solid #0EA5E9', paddingLeft: '16px', fontStyle: 'italic', color: '#6B7280' }}>
              <p>"The staff was efficient and helpful, truly a great experience."</p>
            </div>
            <a href="https://www.sunshinelabus.com/faq" style={{ color: '#0EA5E9', fontWeight: 'bold' }}>Client Reviews</a>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: '#E6F6FB', padding: '60px 0', margin: 'auto' }}>
          <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: '20px' }}>Frequently Asked Questions</h2>
            <div style={{ color: '#374151' }}>
              <div style={{ marginBottom: '20px' }}>
                <strong>What services does Sunshine Clinical Lab offer in Trinity, FL?</strong>
                <p style={{ borderBottom: '1px solid #E5E7EB' }}>We offer a range of lab services including blood work and hormone testing.</p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Is an appointment needed at Sunshine Clinical Lab?</strong>
                <p style={{ borderBottom: '1px solid #E5E7EB' }}>No, you can walk in for lab tests.</p>
              </div>
              {/* Continue for other FAQ entries */}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{ background: '#0EA5E9', padding: '60px 0', margin: 'auto', color: '#FFFFFF' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'Inter,sans-serif' }}>Ready for Reliable Lab Testing?</h2>
            <p>Experience why Trinity trusts Sunshine Clinical Lab. Get started with your blood work or testing today. Join the community receiving fast and friendly service.</p>
            <button style={{ background: '#0EA5E9', color: '#FFFFFF', borderRadius: '8px', padding: '14px 28px', fontWeight: 'bold', cursor: 'pointer' }}>Schedule Now</button>
          </div>
        </section>
      </main>
    </>
  );
}