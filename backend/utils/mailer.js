const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatTime(timeString) {
  const [h, m] = timeString.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function formatDate(dateString) {
  const d = new Date(dateString + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

/**
 * Sends patient confirmation email. Never throws — errors are logged only.
 */
async function sendConfirmationEmail({
  patientEmail,
  patientName,
  serviceName,
  appointmentDate,
  appointmentTime,
  locationType,
}) {
  const displayDate = formatDate(appointmentDate);
  const displayTime = formatTime(appointmentTime);
  const displayLocation = locationType === 'home_visit' ? 'Home Visit' : 'On-Site Visit (Clinic)';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <h2 style="color:#1B5E9B">Appointment Confirmed &#8211; Sunshine Clinical Lab</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment has been successfully booked.</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0">
        <tr>
          <td style="padding:8px 0;color:#555;width:120px"><strong>Service</strong></td>
          <td>${serviceName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#555"><strong>Date</strong></td>
          <td>${displayDate}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#555"><strong>Time</strong></td>
          <td>${displayTime}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#555"><strong>Location</strong></td>
          <td>${displayLocation}</td>
        </tr>
      </table>
      ${locationType === 'home_visit'
        ? '<p>Our team will come to your provided address for the home visit.</p>'
        : ''}
      <p>If you need to make changes, please call us at <strong>(727) 233-5223</strong>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#555;font-size:13px">
        Thank you,<br/>
        <strong>Sunshine Clinical Lab</strong><br/>
        3600 Galileo Dr, Suite 104<br/>
        New Port Richey, FL 34655
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sunshine Clinical Lab" <no-reply@sunshineclinicallab.com>',
      to: patientEmail,
      subject: 'Appointment Confirmed \u2013 Sunshine Clinical Lab',
      html,
    });
    console.log(`Confirmation email sent to ${patientEmail}`);
  } catch (err) {
    console.error('Email send failed (booking still confirmed):', err.message);
  }
}

module.exports = { sendConfirmationEmail };
