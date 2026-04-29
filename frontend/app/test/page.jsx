export const metadata = {
  title: "TRT Blood Testing in Trinity, FL — Fast Results, Walk-Ins Welcome",
  description: "If you're on Testosterone Replacement Therapy, routine blood work isn't optional — it's essential. Sunshine Clinical Lab in Trinity, FL provides comprehensive TRT monitoring panels with next-day results, no appointment needed. We make it simple for Pasco County patients to stay on top of their therapy safely.",
  alternates: { canonical: "/test" }
};

export default function Page() {
  const sectionStyle = {
    padding: "60px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    boxSizing: "border-box"
  };

  const h2Style = {
    color: "#0EA5E9",
    fontFamily: "Inter, sans-serif",
    marginBottom: 16
  };

  const bodyTextStyle = {
    color: "#374151",
    fontFamily: "Inter, sans-serif",
    lineHeight: 1.6,
    marginBottom: 12
  };

  const bulletLiStyle = {
    listStyle: "none",
    paddingLeft: 24,
    position: "relative",
    marginBottom: 8,
    color: "#374151",
    fontFamily: "Inter, sans-serif"
  };

  const checkMarkStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    color: "#0EA5E9",
    fontWeight: "bold"
  };

  const faqQuestionStyle = {
    background: "#0EA5E9",
    color: "#fff",
    padding: "12px 16px",
    fontFamily: "Inter, sans-serif",
    marginBottom: 6,
    borderRadius: 4
  };

  const faqAnswerStyle = {
    borderLeft: "3px solid #38BDF8",
    padding: "12px 16px",
    color: "#374151",
    fontFamily: "Inter, sans-serif",
    marginBottom: 16,
    background: "#fff",
    borderRadius: 4
  };

  const ctaButtonStyle = {
    background: "#0EA5E9",
    color: "#fff",
    borderRadius: 8,
    padding: "10px 18px",
    border: "none",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    margin: "6px 8px"
  };

  const outlineButtonStyle = {
    border: "2px solid #0EA5E9",
    color: "#0EA5E9",
    borderRadius: 8,
    padding: "8px 16px",
    background: "transparent",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    margin: "6px 8px"
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 4px 12px rgba(16,24,40,0.06)",
    border: "1px solid rgba(14,165,233,0.12)",
    boxSizing: "border-box",
    margin: 8,
    flex: "1 1 300px",
    minWidth: 260
  };

  const cardsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    margin: "-8px"
  };

  const numberedStepStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: 16
  };

  const circleStyle = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#0EA5E9",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    marginRight: 12,
    flexShrink: 0
  };

  const statsNumberStyle = {
    color: "#0EA5E9",
    fontFamily: "Inter, sans-serif",
    fontSize: 40,
    fontWeight: 700,
    margin: 0
  };

  const statsLabelStyle = {
    color: "#6B7280",
    fontFamily: "Inter, sans-serif",
    margin: 0
  };

  const ctaSectionStyle = {
    background: "#0EA5E915",
    textAlign: "center",
    borderRadius: 8,
    padding: 24,
    border: "1px solid rgba(14,165,233,0.12)",
    marginTop: 12
  };

  const mutedCaptionStyle = {
    color: "#6B7280",
    fontFamily: "Inter, sans-serif",
    marginTop: 8
  };

  return (
    <main style={{ fontFamily: "Inter, sans-serif", background: "#EBF5FB", minHeight: "100vh" }}>
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
          background: "linear-gradient(135deg, #0EA5E915, #EBF5FB)"
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", fontSize: 28, marginBottom: 12 }}>
            TRT Blood Testing in Trinity, FL — Fast Results, Walk-Ins Welcome
          </h1>
          <p style={{ ...bodyTextStyle, fontSize: 18 }}>
            If you're on Testosterone Replacement Therapy, routine blood work isn't optional — it's essential. Sunshine Clinical Lab in Trinity, FL provides comprehensive TRT monitoring panels with next-day results, no appointment needed. We make it simple for Pasco County patients to stay on top of their therapy safely.
          </p>
          <p style={{ ...bodyTextStyle, fontWeight: 600, marginTop: 8 }}>
            Serving Trinity, New Port Richey, Land O Lakes, and all of Pasco County.
          </p>
          <div style={{ marginTop: 18 }}>
            <a href="#" style={ctaButtonStyle}>Walk In Today</a>
            <a href="tel:(727)233-5223" style={outlineButtonStyle}>Call (727) 233-5223</a>
            <a href="#mobile" style={ctaButtonStyle}>Book Mobile Blood Draw</a>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Most TRT Patients Aren't Testing Often Enough</h2>
        <p style={bodyTextStyle}>
          Testosterone Replacement Therapy changes more than just your testosterone levels. It affects estrogen, red blood cell production, liver function, and cardiovascular markers — all of which can drift into dangerous ranges without any obvious symptoms.
        </p>
        <p style={bodyTextStyle}>
          The problem: most patients only test when they feel off. By then, imbalances have already been building for months.
        </p>
        <p style={bodyTextStyle}>
          At Sunshine Clinical Lab, we see this regularly. Patients come in feeling great — then their results reveal elevated hematocrit, suppressed natural hormone production, or estrogen levels that have crept too high.
        </p>
        <p style={bodyTextStyle}>
          Feeling good is not the same as being safe. That's why consistent monitoring matters.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Complete TRT Monitoring Panels at Sunshine Clinical Lab</h2>
        <p style={bodyTextStyle}>
          We offer comprehensive TRT blood panels designed for accurate, fast monitoring. Our panels include everything your provider needs to manage your therapy safely.
        </p>

        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Core Hormone Tests:</h3>
            <ul style={{ paddingLeft: 0, marginTop: 8 }}>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Total Testosterone: Measures how much testosterone is circulating in your blood.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Free Testosterone: The biologically active portion — what your body actually uses.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Estradiol (Estrogen): TRT elevates estrogen in many patients. Monitoring prevents side effects like water retention, mood changes, and gynecomastia.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>SHBG (Sex Hormone Binding Globulin): Affects how much free testosterone is available to your tissues.</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Health and Safety Markers:</h3>
            <ul style={{ paddingLeft: 0, marginTop: 8 }}>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Complete Blood Count (CBC): Monitors red blood cell levels and overall blood health.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Hematocrit and Hemoglobin: TRT thickens the blood. Elevated hematocrit increases cardiovascular risk — this is one of the most critical markers to track.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Lipid Panel: Monitors cholesterol and cardiovascular health, which TRT can influence over time.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Liver Function Tests (LFTs): Especially important for oral testosterone or patients on additional supplements.</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Optional but Recommended:</h3>
            <ul style={{ paddingLeft: 0, marginTop: 8 }}>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>PSA (Prostate-Specific Antigen): Important for men over 40 or those with prostate concerns.</li>
              <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>LH and FSH: Measures natural hormone production suppression.</li>
            </ul>
          </div>
        </div>

        <p style={bodyTextStyle}>All panels available with next-day results. Walk in Monday through Friday during business hours — no appointment required.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>TRT Blood Test Frequency — A Simple Guide</h2>
        <p style={bodyTextStyle}>How often you test depends on where you are in your treatment.</p>

        <div style={{ marginTop: 12 }}>
          <div style={numberedStepStyle}>
            <div style={circleStyle}>1</div>
            <div>
              <strong style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif" }}>Starting TRT (First 3–6 Months):</strong>
              <p style={bodyTextStyle}>Test every 6–8 weeks. Your body is adapting and dosage adjustments are common. This is when frequent monitoring matters most.</p>
            </div>
          </div>

          <div style={numberedStepStyle}>
            <div style={circleStyle}>2</div>
            <div>
              <strong style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif" }}>Stabilizing (6–12 Months):</strong>
              <p style={bodyTextStyle}>Test every 3–4 months. Once levels stabilize, you can reduce frequency — but never stop.</p>
            </div>
          </div>

          <div style={numberedStepStyle}>
            <div style={circleStyle}>3</div>
            <div>
              <strong style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif" }}>Long-Term TRT (Ongoing):</strong>
              <p style={bodyTextStyle}>Test every 3–6 months. Some providers recommend quarterly monitoring for higher-risk patients. At Sunshine Clinical Lab, we recommend staying closer to every 3–4 months for optimal safety.</p>
            </div>
          </div>
        </div>

        <p style={bodyTextStyle}>Rule of thumb: if something changes — energy, mood, libido, weight — get tested. Don't wait for your next scheduled appointment.</p>
      </section>

      <section id="mobile" style={sectionStyle}>
        <h2 style={h2Style}>TRT Blood Testing That Comes to You</h2>
        <p style={bodyTextStyle}>Can't make it to our Trinity location? Our mobile blood draw service brings the lab to you.</p>
        <p style={bodyTextStyle}>A trained, certified phlebotomist visits your home, office, or preferred location across Pasco County. Same panels. Same fast results. Zero inconvenience.</p>

        <p style={{ ...bodyTextStyle, fontWeight: 600 }}>Mobile blood draw is ideal for:</p>
        <ul style={{ paddingLeft: 0, marginTop: 8 }}>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Busy professionals who can't take time off</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Patients with mobility limitations</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Those who prefer privacy and discretion</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Anyone who values consistency in their TRT monitoring</li>
        </ul>

        <p style={bodyTextStyle}>Coverage area: Trinity, New Port Richey, Wesley Chapel, Land O Lakes, Zephyrhills, Port Richey, Holiday, and surrounding Pasco County communities.</p>

        <div style={{ marginTop: 12 }}>
          <a href="#" style={ctaButtonStyle}>Schedule Mobile Blood Draw</a>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Why Pasco County TRT Patients Choose Sunshine Clinical Lab</h2>

        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Walk-In Convenience</h3>
            <p style={bodyTextStyle}>No appointment needed. Visit us during business hours and we'll take care of the rest.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Fast Turnaround</h3>
            <p style={bodyTextStyle}>Most results available within 24 hours. No waiting days for answers.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Affordable Panels</h3>
            <p style={bodyTextStyle}>Competitive self-pay pricing with no surprise fees. We believe quality lab work should be accessible.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>CLIA-Certified Lab</h3>
            <p style={bodyTextStyle}>All testing meets federal standards for accuracy and reliability.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Mobile Option</h3>
            <p style={bodyTextStyle}>Can't come to us? We come to you.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif", marginTop: 0 }}>Local and Trusted</h3>
            <p style={bodyTextStyle}>We're not a national chain. We're a local lab built for Pasco County patients.</p>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <p style={bodyTextStyle}><strong style={{ color: "#0EA5E9" }}>Address:</strong> 3600 Galileo Dr, Suite 104, Trinity, FL 34655</p>
          <p style={bodyTextStyle}><strong style={{ color: "#0EA5E9" }}>Phone:</strong> <a href="tel:(727)233-5223" style={{ color: "#0EA5E9", fontFamily: "Inter, sans-serif" }}>(727) 233-5223</a></p>
          <p style={bodyTextStyle}><strong style={{ color: "#0EA5E9" }}>Hours:</strong> Monday–Friday, 8am–5pm</p>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 12, border: "1px solid rgba(14,165,233,0.12)" }}>
            <div style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}>
              Map / Embed placeholder — replace with real map or embed as needed.
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Don't Wait — These Symptoms Mean Test Immediately</h2>
        <p style={bodyTextStyle}>If you're on TRT and experiencing any of the following, schedule blood work now — don't wait for your next routine appointment:</p>
        <ul style={{ paddingLeft: 0, marginTop: 8 }}>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Sudden fatigue or significant drop in energy</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Mood swings, irritability, or depression</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Headaches or feeling of pressure (can indicate elevated hematocrit)</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Water retention or unexpected weight gain</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Decreased libido despite being on therapy</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Difficulty sleeping or night sweats</li>
          <li style={bulletLiStyle}><span style={checkMarkStyle}>✓</span>Shortness of breath during light activity</li>
        </ul>

        <p style={bodyTextStyle}>These symptoms don't always mean something is wrong — but they're your body's signal to check. At Sunshine Clinical Lab, we make same-day walk-in testing easy so you never have to guess.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Frequently Asked Questions About TRT Blood Testing in Trinity, FL</h2>

        <div>
          <div style={faqQuestionStyle}>Q: How often should I get blood work while on TRT?</div>
          <div style={faqAnswerStyle}>A: During the first 3–6 months, every 6–8 weeks is standard. Once stable, every 3–4 months is recommended for most patients. Long-term patients should test at minimum every 6 months.</div>

          <div style={faqQuestionStyle}>Q: What blood tests are needed for TRT monitoring?</div>
          <div style={faqAnswerStyle}>A: A complete TRT panel includes total and free testosterone, estradiol, CBC, hematocrit, lipid panel, liver function tests, and SHBG. PSA is recommended for men over 40.</div>

          <div style={faqQuestionStyle}>Q: Can I walk in for a TRT blood test at Sunshine Clinical Lab?</div>
          <div style={faqAnswerStyle}>A: Yes. Walk-ins are welcome Monday through Friday during business hours at our Trinity, FL location. No appointment required.</div>

          <div style={faqQuestionStyle}>Q: How fast will I get my TRT blood test results?</div>
          <div style={faqAnswerStyle}>A: Most results are available within 24 hours. We'll notify you as soon as your results are ready.</div>

          <div style={faqQuestionStyle}>Q: Do you offer mobile blood draw for TRT testing?</div>
          <div style={faqAnswerStyle}>A: Yes. Our mobile phlebotomy service covers Trinity, New Port Richey, Wesley Chapel, Land O Lakes, and surrounding Pasco County areas.</div>

          <div style={faqQuestionStyle}>Q: What happens if I skip blood work while on TRT?</div>
          <div style={faqAnswerStyle}>A: Skipping monitoring allows imbalances to go undetected. Elevated hematocrit, estrogen spikes, and other complications can develop silently. Consistent testing is the only way to catch these issues early.</div>

          <div style={faqQuestionStyle}>Q: Is TRT blood testing expensive at Sunshine Clinical Lab?</div>
          <div style={faqAnswerStyle}>A: We offer competitive, affordable self-pay pricing with no hidden fees. Call us at (727) 233-5223 for current panel pricing.</div>
        </div>
      </section>

      <section style={{ ...sectionStyle, marginBottom: 80 }}>
        <h2 style={h2Style}>Ready to Schedule Your TRT Blood Test in Trinity, FL?</h2>
        <p style={bodyTextStyle}>Whether you're just starting TRT or have been on therapy for years, consistent monitoring is what keeps your treatment safe and effective. Sunshine Clinical Lab makes it simple — walk in, get tested, get results.</p>
        <p style={bodyTextStyle}>No runaround. No long waits. Just accurate, fast TRT blood testing from a lab that understands your needs.</p>

        <div style={ctaSectionStyle}>
          <a href="#" style={ctaButtonStyle}>Walk In Today</a>
          <a href="tel:(727)233-5223" style={outlineButtonStyle}>Call (727) 233-5223</a>
          <a href="#mobile" style={ctaButtonStyle}>Book Mobile Draw</a>

          <div style={{ marginTop: 12 }}>
            <p style={{ ...bodyTextStyle, marginBottom: 6 }}>Address: 3600 Galileo Dr, Suite 104, Trinity, FL 34655</p>
          </div>
        </div>
      </section>
    </main>
  );
}