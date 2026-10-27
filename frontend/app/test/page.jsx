export const metadata = {
  title: "How Often Should You Get Blood Work While on TRT? | Sunshine Clinical Lab Trinity FL",
  description: "Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.",
  keywords: [
    "TRT Blood Testing in Trinity, FL",
    "TRT blood work in Pasco County",
    "testosterone replacement therapy blood panels",
    "mobile blood draws",
    "affordable TRT blood testing"
  ],
  openGraph: {
    title: "How Often Should You Get Blood Work While on TRT? | Sunshine Clinical Lab Trinity FL",
    description: "Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.",
    url: "/test",
    type: "website",
  },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "TRT Blood Testing in Trinity, FL — Fast, Affordable Testosterone Monitoring for Pasco County",
    description: "Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.",
    author: { "@type": "Organization", name: "SUNSHINE CLINICAL LAB LLC" },
    publisher: { "@type": "Organization", name: "SUNSHINE CLINICAL LAB LLC" }
  };

  const sectionStyle = {
    padding: "60px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    borderColor: "#2B7DBF"
  };

  const h2Style = {
    color: "#2B7DBF",
    fontFamily: "Poppins,sans-serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.12,
    margin: "0 0 22px"
  };

  const h3Style = {
    color: "#2B7DBF",
    fontFamily: "Poppins,sans-serif",
    fontSize: "clamp(1.25rem, 2.4vw, 1.65rem)",
    lineHeight: 1.25,
    margin: "0 0 12px"
  };

  const pStyle = {
    color: "#FFFFFF",
    fontFamily: "Inter,sans-serif",
    fontSize: "1.05rem",
    lineHeight: 1.75,
    margin: "0 0 18px"
  };

  const mutedStyle = {
    color: "#9DC8E8",
    fontFamily: "Inter,sans-serif",
    fontSize: "0.95rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
    margin: "0 0 10px"
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(43,125,191,0.45)",
    borderColor: "#2B7DBF",
    borderRadius: "8px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
    padding: "26px"
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#2B7DBF",
    color: "#fff",
    borderRadius: "8px",
    padding: "14px 22px",
    fontFamily: "Inter,sans-serif",
    fontWeight: 800,
    textDecoration: "none",
    margin: "8px"
  };

  const outlineButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #2B7DBF",
    color: "#2B7DBF",
    borderRadius: "8px",
    padding: "12px 22px",
    fontFamily: "Inter,sans-serif",
    fontWeight: 800,
    textDecoration: "none",
    margin: "8px"
  };

  return (
    <main style={{ fontFamily: "Inter,sans-serif", background: "#1A2535", color: "#FFFFFF", minHeight: "100vh" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            p, li { color: #FFFFFF; font-family: Inter, sans-serif; }
            h1, h2, h3 { color: #2B7DBF; font-family: Poppins, sans-serif; }
            a { color: #2B7DBF; }
            strong, b { color: #2B7DBF; }
            .check-list { list-style: none; padding-left: 0; margin: 18px 0 0; }
            .check-list li { list-style: none; padding-left: 24px; position: relative; margin: 10px 0; line-height: 1.6; }
            .check-list li::before { content: '✓'; color: #2B7DBF; position: absolute; left: 0; font-weight: 900; }
            .three-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
            .two-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
            .panel-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
            @media (max-width: 900px) {
              .three-grid, .two-grid, .panel-grid { grid-template-columns: 1fr; }
            }
          `
        }}
      />

      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "20px",
          paddingRight: "20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #2B7DBF15, #1A2535)",
          borderColor: "#2B7DBF"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1
            style={{
              color: "#2B7DBF",
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
              lineHeight: 1.05,
              margin: "0 0 22px"
            }}
          >
            TRT Blood Testing in Trinity, FL — Fast, Affordable Testosterone Monitoring for Pasco County
          </h1>
          <h2 style={{ ...h2Style, fontSize: "clamp(1.5rem, 3vw, 2.4rem)", marginBottom: "18px" }}>
            Your TRT Lab Work Shouldn't Cost a Fortune or Take All Day
          </h2>
          <p style={{ ...pStyle, maxWidth: "820px", margin: "0 auto 28px" }}>
            Sunshine Clinical Lab offers complete testosterone replacement therapy blood panels at affordable, transparent pricing. Located in Trinity, FL, serving all of Pasco County.
          </p>
          <div>
            <a href="tel:7272335223" style={buttonStyle}>
              Book Your TRT Panel — (727) 233-5223
            </a>
            <a href="/book-appointment" style={outlineButtonStyle}>
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>TRT Monitoring Lab — Trinity, FL</h2>
        <img src="/images/pages/test/trt-monitoring-lab-trinity-fl.jpg" alt="TRT Monitoring Lab — Trinity, FL" style={{width:'100%',maxWidth:'800px',height:'auto',borderRadius:'8px',margin:'20px 0',display:'block'}} />
        <div style={cardStyle}>
          <h3 style={h3Style}>Where Can I Get Affordable TRT Blood Work in Pasco County?</h3>
          <p style={pStyle}>
            Sunshine Clinical Lab at 3600 Galileo Dr, Suite 104, Trinity, FL 34655 offers affordable TRT blood testing for hormone panels. The lab provides total and free testosterone, estradiol (E2), hematocrit, CBC, CMP, PSA, SHBG, LH, and FSH testing. Walk-ins are welcome, and mobile blood draws are available throughout Pasco County. The lab accepts most major insurance plans and offers competitive self-pay pricing. Call (727) 233-5223 for current rates.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div className="three-grid">
          <div style={cardStyle}>
            <h3 style={h3Style}>Walk-Ins Welcome</h3>
          </div>
          <div style={cardStyle}>
            <h2 style={{ ...h2Style, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "0" }}>Mobile Draws Available</h2>
            <img src="/images/pages/test/mobile-draws-available.jpg" alt="Mobile Draws Available" style={{width:'100%',maxWidth:'800px',height:'auto',borderRadius:'8px',margin:'20px 0',display:'block'}} />
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Transparent Pricing</h3>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>The Sunshine Difference</p>
        <h2 style={h2Style}>The TRT Monitoring Lab Pasco County Men Actually Trust</h2>
        <div className="two-grid">
          <div>
            <p style={pStyle}>
              If you're on testosterone replacement therapy, you already know the drill: regular blood work is non-negotiable. Your provider needs consistent, accurate labs to monitor your levels, adjust your protocol, and make sure your health markers stay where they should be.
            </p>
            <p style={pStyle}>
              Sunshine Clinical Lab offers a straightforward alternative: transparent pricing and a phlebotomy team that focuses on TRT monitoring.
            </p>
            <p style={pStyle}>
              Our Trinity, FL location is purpose-built for this — walk in and get drawn by an experienced phlebotomist. Our team can give you an expected turnaround timeframe when your appointment is scheduled.
            </p>
          </div>
          <div className="three-grid" style={{ gridTemplateColumns: "1fr", gap: "14px" }}>
            <div style={cardStyle}>
              <h3 style={h3Style}>Speed</h3>
            </div>
            <div style={cardStyle}>
              <h3 style={h3Style}>Accuracy</h3>
            </div>
            <div style={cardStyle}>
              <h3 style={h3Style}>Cost</h3>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Complete Panels</p>
        <h2 style={h2Style}>What's Included in Our TRT Monitoring Panels</h2>
        <p style={pStyle}>
          Sunshine Clinical Lab offers comprehensive hormone and health panels designed specifically for men on testosterone replacement therapy.
        </p>

        <div className="panel-grid">
          <div style={cardStyle}>
            <h3 style={h3Style}>Total Testosterone and Free Testosterone</h3>
            <p style={pStyle}>
              The foundational markers for assessing whether your TRT dose is dialed in correctly. We test both because total testosterone alone doesn't give you the full picture of what's bioavailable.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Estradiol (E2)</h3>
            <p style={pStyle}>
              Elevated estrogen is one of the most common side effects of TRT, and managing it properly requires regular monitoring. Our E2 assay gives you and your provider the data needed to adjust AI (aromatase inhibitor) protocols if necessary.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Hematocrit and CBC</h3>
            <p style={pStyle}>
              Testosterone therapy can elevate red blood cell production, which increases hematocrit levels. This is one of the most important safety markers to monitor on TRT, and we include it in our standard panels.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>PSA (Prostate-Specific Antigen)</h3>
            <p style={pStyle}>
              Routine PSA monitoring is recommended for men on TRT, particularly those over 40. This test screens for prostate-related changes that your provider needs to track over time.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>CMP (Comprehensive Metabolic Panel)</h3>
            <p style={pStyle}>
              Covers kidney function, liver function, electrolytes, and blood glucose. TRT can influence several of these markers, making regular CMP testing essential for protocol safety.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>SHBG (Sex Hormone-Binding Globulin)</h3>
            <p style={pStyle}>
              SHBG binds to testosterone in your blood, reducing the amount that's available for your body to use. Tracking SHBG helps your provider understand your true bioavailable testosterone levels.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>LH (Luteinizing Hormone) and FSH (Follicle-Stimulating Hormone)</h3>
            <p style={pStyle}>
              These pituitary markers are especially important for men starting TRT or those considering fertility-related decisions while on therapy.
            </p>
          </div>
          <div style={cardStyle}>
            <p style={pStyle}>
              We also accommodate custom panels. If your provider has a specific test list they want run, bring the order in — we'll handle it.
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Lab Processing</p>
        <h2 style={h2Style}>What to Expect for TRT Test Turnaround</h2>
        <div style={cardStyle}>
          <p style={pStyle}>
            At Sunshine Clinical Lab, turnaround time for TRT-related blood tests depends on the panel ordered. Our team can give you an expected timeframe when your appointment is scheduled or your sample is collected, so you and your provider know what to expect.
          </p>
          <p style={pStyle}>
            Standard panels including testosterone, CBC, CMP, and estradiol are processed at our Trinity lab — ask our team for current turnaround times for your specific tests.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Transparent Pricing</p>
        <h2 style={h2Style}>Affordable TRT Blood Work — No Corporate Markup</h2>
        <div className="two-grid">
          <div>
            <p style={pStyle}>
              Large national labs charge premium prices because they can. Corporate overhead, massive facilities, and stockholder expectations drive those costs straight to your bill — whether you're paying out of pocket or dealing with insurance copays.
            </p>
            <p style={pStyle}>
              Contact our team at (727) 233-5223 for current TRT panel pricing. We accept most major insurance plans, and self-pay rates are designed to make regular monitoring sustainable.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Sunshine Lab</h3>
            <ul className="check-list">
              <li>Transparent pricing</li>
              <li>Independent &amp; local</li>
              <li>Walk-ins welcome</li>
              <li>Mobile draws available</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Your Choice</p>
        <h2 style={h2Style}>Walk-In or Mobile — Your Choice</h2>
        <div className="two-grid">
          <div style={cardStyle}>
            <h3 style={h3Style}>Walk-In TRT Blood Work at Our Trinity Location</h3>
            <p style={pStyle}>
              Need your TRT labs drawn today? Walk in at 3600 Galileo Dr, Suite 104, Trinity, FL 34655. We welcome walk-ins for most blood work, and many patients are in and out within minutes.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Mobile TRT Blood Draws Across Pasco County</h3>
            <p style={pStyle}>
              Prefer a mobile draw? Our phlebotomy team will come to your home or office anywhere in Pasco County — Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, and beyond. Same experienced professionals, same fast turnaround, zero travel on your part.
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div
          style={{
            background: "#2B7DBF15",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #2B7DBF",
            borderColor: "#2B7DBF",
            padding: "48px 24px"
          }}
        >
          <a href="tel:7272335223" style={buttonStyle}>
            Schedule Your TRT Blood Panel — (727) 233-5223
          </a>
          <p style={mutedStyle}>TRT Testing — Trinity, FL</p>
          <h2 style={h2Style}>Stop Overpaying for TRT Labs.</h2>
          <h2 style={{ ...h2Style, marginTop: "-14px" }}>Stop Waiting for Results.</h2>
          <p style={{ ...pStyle, maxWidth: "720px", margin: "0 auto 22px" }}>
            Affordable, transparent pricing. Walk-ins welcome. Right here in Trinity, FL.
          </p>
          <a href="tel:7272335223" style={buttonStyle}>
            Call (727) 233-5223 to Book Your TRT Panel
          </a>
          <p style={{ ...pStyle, color: "#9DC8E8", marginTop: "18px" }}>
            3600 Galileo Dr, Suite 104, Trinity, FL 34655
          </p>
          <p style={{ ...pStyle, color: "#9DC8E8" }}>|</p>
          <p style={{ ...pStyle, color: "#9DC8E8" }}>Mon–Fri 8:00am–2:00pm</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Men's Health</p>
        <h2 style={h2Style}>Built for Men Who Take Their Health Seriously</h2>
        <p style={pStyle}>
          Sunshine Clinical Lab isn't just a lab that happens to offer TRT blood tests. We've invested in understanding the TRT community because we serve it daily — from guys on their first cycle of prescribed testosterone to veterans who've been optimizing their protocols for years.
        </p>
        <div className="three-grid">
          <div style={cardStyle}>
            <h3 style={h3Style}>Consistency</h3>
            <p style={pStyle}>
              Our team will give you an expected turnaround timeframe when your appointment is scheduled.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Accuracy</h3>
            <p style={pStyle}>
              Same experienced phlebotomy team, same precise protocols used for clinical and TRT monitoring.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={h3Style}>Cost</h3>
            <p style={pStyle}>
              Affordable, no corporate markup. We pass our lower overhead directly to you.
            </p>
          </div>
        </div>
        <p style={{ ...pStyle, marginTop: "24px" }}>
          That's the Sunshine Clinical Lab difference for men's health in Pasco County. Call (727) 233-5223 to schedule your TRT panel today.
        </p>
      </section>

      <section style={sectionStyle}>
        <p style={mutedStyle}>Got Questions?</p>
        <h2 style={h2Style}>TRT Blood Testing — Frequently Asked Questions</h2>
        <p style={pStyle}>
          Everything you need to know before scheduling your TRT panel in Pasco County.
        </p>
        <p style={pStyle}>
          <a href="/faq" style={{ color: "#2B7DBF", fontFamily: "Inter,sans-serif", fontWeight: 800, textDecoration: "none" }}>
            View our full FAQ →
          </a>
        </p>
        <div style={{ display: "grid", gap: "14px", marginTop: "24px" }}>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>01</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>How much does a TRT blood test cost at Sunshine Clinical Lab?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>02</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Do I need a doctor's order for TRT blood work?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>03</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>How fast will I get my TRT results?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>04</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Do you offer sensitive estradiol (E2) testing for TRT patients?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>05</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Can I walk in for TRT blood work at your Trinity location?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>06</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>Do you offer TRT blood work through mobile blood draw in Pasco County?</div>
          </div>
          <div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", borderRadius: "8px 8px 0 0", fontWeight: 800 }}>07</div>
            <div style={{ background: "#2B7DBF", color: "#fff", padding: "12px 16px", fontWeight: 800 }}>What TRT blood tests should I get regularly?</div>
          </div>
        </div>
        <div style={{ borderLeft: "3px solid #FFC72C", padding: "12px 16px", color: "#FFFFFF", marginTop: "18px" }}>
          <p style={pStyle}>Can't find what you're looking for? Our team is happy to help.</p>
        </div>
        <a href="tel:7272335223" style={buttonStyle}>
          Still Have Questions? Call (727) 233-5223
        </a>
      </section>

      <section style={sectionStyle}>
        <div
          style={{
            background: "#2B7DBF15",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #2B7DBF",
            borderColor: "#2B7DBF",
            padding: "54px 24px"
          }}
        >
          <p style={mutedStyle}>Sunshine Clinical Lab — Trinity, FL</p>
          <h2 style={h2Style}>Stop Overpaying for TRT Labs.</h2>
          <h2 style={{ ...h2Style, marginTop: "-14px" }}>Stop Waiting for Results.</h2>
          <p style={{ ...pStyle, maxWidth: "760px", margin: "0 auto 18px" }}>
            Sunshine Clinical Lab gives you accurate, affordable TRT blood work with transparent pricing. Right here in Trinity, FL.
          </p>
          <p style={pStyle}>Call (727) 233-5223 or walk in today.</p>
          <div>
            <a href="tel:7272335223" style={buttonStyle}>
              Call Now: (727) 233-5223
            </a>
            <a href="/book-appointment" style={outlineButtonStyle}>
              Book Appointment
            </a>
          </div>
          <div
            style={{
              margin: "28px auto 0",
              maxWidth: "820px",
              border: "2px solid #2B7DBF",
              borderColor: "#2B7DBF",
              borderRadius: "8px",
              padding: "22px",
              background: "rgba(26,37,53,0.72)"
            }}
          >
            <p style={{ ...pStyle, color: "#9DC8E8", marginBottom: "8px" }}>
              3600 Galileo Dr, Suite 104, Trinity, FL 34655, USA
            </p>
            <p style={{ ...pStyle, color: "#9DC8E8", marginBottom: "8px" }}>|</p>
            <p style={{ ...pStyle, color: "#9DC8E8", marginBottom: "0" }}>
              Mon–Fri 8:00am–2:00pm · Walk-Ins Welcome
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}