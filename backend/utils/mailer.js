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
        3600 Galileo Dr<br/>
        Trinity, FL 34655, USA
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

/**
 * Sends 24-hour reminder email with cancel/reschedule link. Never throws.
 */
async function sendReminder24Email({
  patientEmail,
  patientName,
  serviceName,
  appointmentDate,
  appointmentTime,
  locationType,
  manageUrl,
}) {
  const displayDate = formatDate(appointmentDate);
  const displayTime = formatTime(appointmentTime);
  const displayLocation = locationType === 'home_visit' ? 'Home Visit' : 'On-Site Visit (Clinic)';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <h2 style="color:#1B5E9B">Appointment Reminder &#8211; Tomorrow</h2>
      <p>Hello ${patientName},</p>
      <p>This is a friendly reminder that you have an appointment scheduled for <strong>tomorrow</strong>.</p>
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
      <p>Need to make changes? You can cancel or reschedule using the link below:</p>
      <p style="margin:24px 0">
        <a href="${manageUrl}"
           style="background:#1B5E9B;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block">
          Manage My Appointment
        </a>
      </p>
      <p>If you need immediate assistance, call us at <strong>(727) 233-5223</strong>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#555;font-size:13px">
        Thank you,<br/>
        <strong>Sunshine Clinical Lab</strong><br/>
        3600 Galileo Dr<br/>
        Trinity, FL 34655, USA
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sunshine Clinical Lab" <no-reply@sunshineclinicallab.com>',
      to: patientEmail,
      subject: 'Appointment Reminder \u2013 Tomorrow',
      html,
    });
    console.log(`24h reminder email sent to ${patientEmail}`);
  } catch (err) {
    console.error('24h reminder email failed:', err.message);
  }
}

/**
 * Sends 2-hour final reminder email. Never throws.
 */
async function sendReminder2HrEmail({
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
      <h2 style="color:#1B5E9B">Upcoming Appointment Reminder</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment is coming up in approximately <strong>2 hours</strong>. We look forward to seeing you!</p>
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
      <p>If you need to reach us, please call <strong>(727) 233-5223</strong>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#555;font-size:13px">
        Thank you,<br/>
        <strong>Sunshine Clinical Lab</strong><br/>
        3600 Galileo Dr<br/>
        Trinity, FL 34655, USA
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sunshine Clinical Lab" <no-reply@sunshineclinicallab.com>',
      to: patientEmail,
      subject: 'Upcoming Appointment Reminder',
      html,
    });
    console.log(`2h reminder email sent to ${patientEmail}`);
  } catch (err) {
    console.error('2h reminder email failed:', err.message);
  }
}

/**
 * Sends notification email when admin edits an appointment. Never throws.
 */
async function sendAppointmentUpdatedEmail({
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
      <h2 style="color:#1B5E9B">Appointment Updated &#8211; Sunshine Clinical Lab</h2>
      <p>Hello ${patientName},</p>
      <p>Your appointment details have been updated by our staff. Please review the new details below.</p>
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
      <p>If you have any questions or need further changes, please call us at <strong>(727) 233-5223</strong>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#555;font-size:13px">
        Thank you,<br/>
        <strong>Sunshine Clinical Lab</strong><br/>
        3600 Galileo Dr<br/>
        Trinity, FL 34655, USA
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sunshine Clinical Lab" <no-reply@sunshineclinicallab.com>',
      to: patientEmail,
      subject: 'Appointment Updated \u2013 Sunshine Clinical Lab',
      html,
    });
    console.log(`Appointment updated email sent to ${patientEmail}`);
  } catch (err) {
    console.error('Appointment updated email failed:', err.message);
  }
}

/**
 * Sends rejection/cancellation email when admin deletes an appointment. Never throws.
 */
async function sendAppointmentRejectedEmail({
  patientEmail,
  patientName,
  serviceName,
  appointmentDate,
  appointmentTime,
}) {
  const displayDate = formatDate(appointmentDate);
  const displayTime = formatTime(appointmentTime);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <h2 style="color:#1B5E9B">Appointment Cancelled &#8211; Sunshine Clinical Lab</h2>
      <p>Hello ${patientName},</p>
      <p>We regret to inform you that your upcoming appointment has been cancelled by our staff.</p>
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
      </table>
      <p>We apologise for any inconvenience. To rebook or for further assistance, please call us at <strong>(727) 233-5223</strong>.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="color:#555;font-size:13px">
        Thank you,<br/>
        <strong>Sunshine Clinical Lab</strong><br/>
        3600 Galileo Dr<br/>
        Trinity, FL 34655, USA
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Sunshine Clinical Lab" <no-reply@sunshineclinicallab.com>',
      to: patientEmail,
      subject: 'Appointment Cancelled \u2013 Sunshine Clinical Lab',
      html,
    });
    console.log(`Appointment rejected email sent to ${patientEmail}`);
  } catch (err) {
    console.error('Appointment rejected email failed:', err.message);
  }
}

module.exports = {
  sendConfirmationEmail,
  sendReminder24Email,
  sendReminder2HrEmail,
  sendAppointmentUpdatedEmail,
  sendAppointmentRejectedEmail,
};
