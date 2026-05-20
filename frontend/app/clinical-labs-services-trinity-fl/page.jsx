export const metadata = {
  title: "Clinical Lab Services Trinity FL - SUNSHINE CLINICAL LAB",
  description: "SUNSHINE CLINICAL LAB in Trinity, FL: fast turnaround clinical lab services - walk-in blood work, mobile phlebotomy, TRT/hormone panels, DNA testing.",
  openGraph: {
    title: "Clinical Lab Services Trinity FL - SUNSHINE CLINICAL LAB",
    description: "SUNSHINE CLINICAL LAB in Trinity, FL: fast turnaround clinical lab services - walk-in blood work, mobile phlebotomy, TRT/hormone panels, DNA testing.",
    url: "https://www.sunshineclinicallab.com/clinical-lab-services-trinity-fl",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Lab Services Trinity FL - SUNSHINE CLINICAL LAB",
    description: "SUNSHINE CLINICAL LAB in Trinity, FL: fast turnaround clinical lab services - walk-in blood work, mobile phlebotomy, TRT/hormone panels, DNA testing."
  }
};

export default function Page() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SUNSHINE CLINICAL LAB LLC",
    "url": "https://www.sunshineclinicallab.com/clinical-lab-services-trinity-fl",
    "telephone": "+1-727-555-0123",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Trinity / Pasco County (See location details)",
      "addressLocality": "Trinity",
      "addressRegion": "FL",
      "postalCode": "34655",
      "addressCountry": "US"
    },
    "description": "Independent clinical laboratory offering walk-in blood draws, mobile phlebotomy, TRT/hormone panels, DNA testing and secure electronic results for Trinity and greater Pasco County."
  };

  return (
    <>
      {/* JSON-LD schema script tags if applicable */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does routine blood work cost at SUNSHINE CLINICAL LAB LLC?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    },
    {
      "@type": "Question",
      "name": "Do you accept insurance and how does billing work?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to get my lab results?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    },
    {
      "@type": "Question",
      "name": "Are your phlebotomists and lab technicians certified?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer mobile blood draws in Trinity and the surrounding area?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    },
    {
      "@type": "Question",
      "name": "Can you handle TRT monitoring and which tests should I expect for testosterone therapy?",
      "acceptedAnswer": {
        "@type": "Answer"
      }
    }
  ]
}`
        }}
      />
      <main style={{ paddingTop: '80px', backgroundColor: '#EBF5FB', minHeight: '100vh', fontFamily: 'Inter,sans-serif', color: '#374151' }}>
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px 20px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#38BDF8', color: '#0D3047', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            ✦ Local lab
          </div>
          <h1 style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginTop: 18, marginBottom: 10, fontSize: 34, lineHeight: 1.1 }}>
            Fast, convenient clinical lab services in Trinity, FL
          </h1>
          <p style={{ color: '#374151', maxWidth: 820, margin: '0 auto', fontSize: 16 }}>
            SUNSHINE CLINICAL LAB LLC provides rapid, reliable lab testing with walk-in and mobile phlebotomy options across Trinity and greater Pasco County. We prioritize short waits, secure electronic results, and specialty testing including TRT monitoring and DNA collection.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="tel:+17275550123" style={{ backgroundColor: '#0EA5E9', color: '#ffffff', padding: '12px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              Call Now
            </a>
            <a href="#booking" style={{ backgroundColor: 'transparent', color: '#0EA5E9', padding: '12px 18px', borderRadius: 8, border: '2px solid #0EA5E9', textDecoration: 'none', fontWeight: 700 }}>
              Book Mobile Draw
            </a>
          </div>
        </header>

        <section id="overview" aria-labelledby="h2-overview" style={{ maxWidth: 1100, margin: '28px auto', padding: 24, background: 'linear-gradient(180deg,#ffffff,#F8FDFF)', borderRadius: 12, boxShadow: '0 6px 18px rgba(13,48,71,0.06)' }}>
          <h2 id="h2-overview" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 12, fontSize: 22 }}>
            Clinical Lab Services in Trinity, FL
          </h2>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6 }}>
            At SUNSHINE CLINICAL LAB we convert local visitors into satisfied patients by offering routine testing with fast electronic delivery of results. We perform common panels such as CBC, CMP, lipid panels, A1C and thyroid tests with same‑day or 24‑hour reporting for most routine orders when collected early in the day. Patients arriving with physician requisitions or choosing direct‑access testing can expect transparent cash‑pay pricing and an online test menu so fees are clear before you arrive. We are an independent clinical laboratory (not a doctor’s office or hospital), which allows flexible scheduling: walk-ins are welcome and online requisitions speed check‑in for a quick draw.
          </p>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>
            Security and privacy are central to our service. Results are delivered through a secure HIPAA‑compliant portal with optional SMS alerts so patients can download PDF reports and share them with providers. If you need help understanding your results, our team can expedite electronic reporting to your clinician to support faster clinical decision making across Trinity and Pasco County.
          </p>
          <ul style={{ color: '#374151', marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Walk-in and scheduled CBC, CMP, lipid panels, A1C, and thyroid tests with 24‑hour or same‑day electronic results.</li>
            <li>Accept physician requisitions, direct‑access testing, and clear cash‑pay pricing.</li>
            <li>Independent clinical laboratory with secure HIPAA portal and SMS results delivery.</li>
          </ul>
        </section>

        <section id="walk-in" aria-labelledby="h2-walkin" style={{ maxWidth: 1100, margin: '20px auto', padding: 24, backgroundColor: '#ffffff', borderRadius: 12 }}>
          <h2 id="h2-walkin" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 12, fontSize: 20 }}>
            Walk-In Blood Testing and Short Waits
          </h2>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6 }}>
            Our Trinity location is designed for quick, convenient visits. We offer open walk‑in hours Monday through Saturday with average wait times under 15 minutes; for peace of mind you can check our live wait board before arrival. For patients requiring fasting draws, express morning lanes are available—pre‑visit fasting instructions and appointment reminders are sent via SMS to help you prepare and minimize delays.
          </p>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>
            Skilled, certified phlebotomists staff every draw station. We routinely manage difficult venipunctures and pediatric collections to reduce re‑draws and improve comfort. Physician referrals are processed onsite and encrypted same‑day results can be sent directly to prescribing clinics to accelerate treatment decisions.
          </p>
          <ul style={{ color: '#374151', marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Open walk‑in hours Mon–Sat with average waits typically under 15 minutes.</li>
            <li>Express morning lanes for fasting blood draws with SMS instructions and reminders.</li>
            <li>On‑site certified phlebotomists trained in difficult and pediatric draws.</li>
            <li>Encrypted same‑day result delivery to clinics for faster clinical care.</li>
          </ul>
        </section>

        <section id="mobile" aria-labelledby="h2-mobile" style={{ maxWidth: 1100, margin: '20px auto', padding: 24, background: 'linear-gradient(180deg,#F3FBFF,#EBF5FB)', borderRadius: 12 }}>
          <h2 id="h2-mobile" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 12, fontSize: 20 }}>
            Mobile Phlebotomy and Home Blood Draws
          </h2>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6 }}>
            If you prefer a home or workplace draw, book a mobile phlebotomy appointment online or by phone. A licensed phlebotomist will arrive within the scheduled window to collect specimens with the same clinical protocols used in‑lab. Our mobile service covers Trinity, New Port Richey, Land O' Lakes, Tarpon Springs and greater Pasco County to provide local access without the trip to the clinic.
          </p>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>
            Mobile collections follow CDC and HIPAA protocols: ID verification, chain‑of‑custody when required, and cooled transport protect specimen integrity. Turnaround for mobile draws matches in‑lab service—most routine panels are reported within 24–48 hours. For urgent needs we can schedule courier pickup to maintain priority processing.
          </p>
          <ul style={{ color: '#374151', marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Book online or by phone for licensed phlebotomists to collect at home or workplace.</li>
            <li>Service area includes Trinity, New Port Richey, Land O' Lakes, Tarpon Springs and greater Pasco County.</li>
            <li>CDC and HIPAA protocols, ID verification, chain‑of‑custody and cooled transport.</li>
            <li>Same 24–48 hour turnaround as in‑lab testing; courier pickup for urgent tests.</li>
          </ul>
        </section>

        <section id="specialty" aria-labelledby="h2-specialty" style={{ maxWidth: 1100, margin: '20px auto', padding: 24, backgroundColor: '#ffffff', borderRadius: 12 }}>
          <h2 id="h2-specialty" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 12, fontSize: 20 }}>
            TRT, Hormone Panels, DNA and Gender Testing
          </h2>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6 }}>
            We support specialty testing needs including comprehensive TRT monitoring, hormone panels, and legal DNA services. Our TRT panels include total and free testosterone, estradiol when indicated, CBC, CMP and PSA as requested by providers. Results are presented in provider‑ready trend reports with reference ranges to support dose adjustments and clinical review.
          </p>
          <p style={{ color: '#374151', fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>
            For DNA testing we offer court‑admissible chain‑of‑custody collections for paternity and immigration cases with appointment‑based specimen collection and certified documentation. We also offer non‑invasive fetal sex testing (Peekaboo) after 8 weeks with discreet packaging, rapid turnaround, and the option to collect samples via mobile phlebotomy.
          </p>
          <ul style={{ color: '#374151', marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Comprehensive TRT monitoring panels aligned to provider schedules and monitoring guidance.</li>
            <li>Hormone panels include provider‑ready trend reports and reference ranges.</li>
            <li>Court‑admissible chain‑of‑custody DNA with certified documentation and appointment collections.</li>
            <li>Peekaboo non‑invasive fetal sex testing after 8 weeks with discreet packaging and mobile options.</li>
          </ul>
        </section>

        <section id="faq" aria-labelledby="h2-faq" style={{ maxWidth: 1100, margin: '20px auto 36px', padding: 24, background: 'linear-gradient(180deg,#F8FDFF,#EBF5FB)', borderRadius: 12 }}>
          <h2 id="h2-faq" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 12, fontSize: 20 }}>
            Frequently Asked Questions
          </h2>

          <div style={{ marginTop: 8 }}>
            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>How much does routine blood work cost at SUNSHINE CLINICAL LAB LLC?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                Cash‑pay pricing varies by test: approximate ranges include CBC $25–40, CMP $40–70, Lipid Panel $30–60, A1C $20–40, and basic thyroid panels $60–120. Exact self‑pay prices are available on request and we can provide an estimate by phone for Trinity and Pasco County patients before you come in.
              </p>
            </details>

            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>Do you accept insurance and how does billing work?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                We bill many commercial plans and Medicare for physician‑ordered testing; coverage depends on your plan and the ordering provider. If you’re self‑pay or uninsured, we offer transparent cash prices and package discounts for common panels and can confirm billing details when you call.
              </p>
            </details>

            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>How long does it take to get my lab results?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                Most routine tests (CBC, CMP, lipid panels, A1C) are reported within 24–48 hours, with many available same‑day when collected early. Specialty testing, DNA/paternity, and some hormone panels can take several days to a week; mobile draws may add transit time, but we generally deliver faster turnaround than large national chains in Pasco County.
              </p>
            </details>

            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>Are your phlebotomists and lab technicians certified?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                Yes—our phlebotomists are certified and our laboratory operates under CLIA regulations with licensed medical laboratory personnel performing testing and quality control. We maintain required Florida licensure and ongoing staff training to ensure safe, accurate draws and reliable reporting.
              </p>
            </details>

            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>Do you offer mobile blood draws in Trinity and the surrounding area?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                Yes—mobile phlebotomy/home draws are available throughout Trinity, New Port Richey, Land O’ Lakes, Tarpon Springs, and greater Pasco County, typically with same‑day or next‑day appointments depending on demand. Scheduling and any travel fees are confirmed when you call or book online.
              </p>
            </details>

            <details style={{ marginBottom: 10, backgroundColor: '#ffffff', padding: 12, borderRadius: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#0D3047', fontWeight: 700 }}>Can you handle TRT monitoring and which tests should I expect for testosterone therapy?</summary>
              <p style={{ color: '#374151', marginTop: 8 }}>
                We provide TRT monitoring panels including total and free testosterone, SHBG, estradiol (when indicated), CBC, CMP, and lipid profiles, and can add PSA per provider request. For accurate monitoring we recommend morning pre‑dose draws and typical intervals of baseline, 4–8 weeks after dose changes, then every 3–12 months as directed by your clinician.
              </p>
            </details>
          </div>
        </section>

        <section id="conversion" aria-labelledby="h2-conversion" style={{ maxWidth: 1100, margin: '0 auto 60px', padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg,#ffffff,#F0FCFF)', borderRadius: 12 }}>
          <h2 id="h2-conversion" style={{ fontFamily: 'Inter,sans-serif', color: '#0EA5E9', marginBottom: 8, fontSize: 22 }}>
            Fast Clinical Lab Services in Trinity, FL
          </h2>
          <p style={{ color: '#374151', maxWidth: 920, textAlign: 'center', fontSize: 16 }}>
            SUNSHINE CLINICAL LAB LLC offers rapid blood work, mobile phlebotomy, and specialized hormone and TRT monitoring for Trinity and greater Pasco County. Call or book your walk‑in or home draw to get faster results and personalized test options tailored to local patients.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
            <a href="tel:+17275550123" style={{ backgroundColor: '#0EA5E9', color: '#ffffff', padding: '12px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              Call Now
            </a>
            <a id="booking" href="#booking-form" style={{ backgroundColor: '#38BDF8', color: '#0D3047', padding: '12px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              Book Walk‑In / Mobile
            </a>
          </div>
        </section>

        <footer style={{ maxWidth: 1100, margin: '0 auto 40px', padding: '20px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 14, marginBottom: 6 }}>
            SUNSHINE CLINICAL LAB LLC • Trinity, FL • Phone: <a href="tel:+17275550123" style={{ color: '#0EA5E9', textDecoration: 'none' }}>+1 (727) 555‑0123</a>
          </div>
          <div style={{ fontSize: 13 }}>Secure HIPAA portal • CLIA‑regulated laboratory • Mobile phlebotomy across Pasco County</div>
        </footer>
      </main>
    </>
  );
}