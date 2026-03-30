'use client';

import { format, parseISO } from 'date-fns';
import {
  Calendar, Clock, MapPin, User, Phone, Mail, FileText,
  ChevronLeft, Loader2, CheckCircle, AlertCircle, Edit2, Home,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { formatTimeSlot } from '@/lib/booking-constants';

const LOCATION_LABELS = { on_site: 'Clinic Visit', home_visit: 'Home Visit' };
const DOC_LABELS = {
  id: 'Photo ID',
  lab_order: 'Lab Order / Rx',
  insurance_front: 'Insurance (Front)',
  insurance_back: 'Insurance (Back)',
  other: 'Other',
};

function ReviewSection({ title, icon: Icon, onEdit, step, children }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-sunshine-blue" />
          <span className="text-sm font-semibold text-sunshine-dark">{title}</span>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-sunshine-blue hover:underline font-medium"
        >
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
      <div className="space-y-1.5 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
      <span className="text-gray-500 flex-shrink-0">{label}:</span>
      <span className="text-sunshine-dark font-medium break-words">{value}</span>
    </div>
  );
}

export default function Step7Review({
  bookingData,
  isSubmitting,
  submitError,
  submitBooking,
  onPrev,
  onGoToStep,
  resetWizard,
}) {
  const { service, locationType, date, timeSlot, patientName, patientDob,
    patientPhone, patientEmail, addressStreet, addressCity, addressZip,
    documents, confirmedAppointmentId } = bookingData;

  const formattedDate = date ? format(parseISO(date), 'EEEE, MMMM d, yyyy') : '';
  const formattedTime = timeSlot ? formatTimeSlot(timeSlot) : '';

  // ── SUCCESS STATE ──────────────────────────────────────────────────────────
  if (confirmedAppointmentId) {
    return (
      <div className="flex flex-col items-center text-center py-6">
        <div className="w-20 h-20 rounded-full bg-sunshine-soft/60 flex items-center justify-center mb-5 shadow-md">
          <CheckCircle className="w-10 h-10 text-sunshine-blue" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl font-bold text-sunshine-dark mb-1">Appointment Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-1">
          A confirmation email has been sent to <span className="text-sunshine-dark font-medium">{patientEmail}</span>
        </p>
        <span className="inline-block bg-sunshine-soft text-sunshine-dark text-xs font-bold px-3 py-1 rounded-full border border-sunshine-sky/30 mb-6">
          Ref: #{confirmedAppointmentId.slice(0, 8).toUpperCase()}
        </span>

        <div className="bg-sunshine-soft/40 rounded-2xl p-5 w-full max-w-sm text-left border border-sunshine-sky/20 mb-8">
          <div className="space-y-2 text-sm">
            <Row icon={Calendar} label="Date" value={formattedDate} />
            <Row icon={Clock} label="Time" value={formattedTime} />
            <Row icon={FileText} label="Service" value={service?.name} />
            <Row icon={MapPin} label="Location" value={LOCATION_LABELS[locationType]} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <button
            onClick={resetWizard}
            className="flex-1 py-3 px-4 border-2 border-sunshine-blue/30 text-sunshine-blue rounded-full text-sm font-semibold hover:bg-sunshine-soft transition-colors"
          >
            Book Another
          </button>
          <ShimmerButton
            onClick={() => (window.location.href = '/')}
            className="flex-1 bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white py-3 px-4 rounded-full text-sm font-semibold shadow-md"
          >
            <Home className="w-4 h-4 mr-1" />
            Return Home
          </ShimmerButton>
        </div>
      </div>
    );
  }

  // ── REVIEW STATE ───────────────────────────────────────────────────────────
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Review & Confirm</h2>
        <p className="text-gray-500 text-sm mt-1">Please verify your booking details below.</p>
      </div>

      <div className="space-y-4">
        {/* Service & Schedule */}
        <ReviewSection title="Service & Schedule" icon={Calendar} onEdit={() => onGoToStep(1)}>
          <Row icon={FileText} label="Service" value={service?.name} />
          <Row icon={MapPin} label="Location" value={LOCATION_LABELS[locationType]} />
          <Row icon={Calendar} label="Date" value={formattedDate} />
          <Row icon={Clock} label="Time" value={formattedTime} />
          {service?.duration_minutes && (
            <Row icon={Clock} label="Duration" value={`${service.duration_minutes} minutes`} />
          )}
        </ReviewSection>

        {/* Patient Information */}
        <ReviewSection title="Patient Information" icon={User} onEdit={() => onGoToStep(5)}>
          <Row icon={User} label="Name" value={patientName} />
          {patientDob && <Row icon={Calendar} label="DOB" value={patientDob} />}
          <Row icon={Phone} label="Phone" value={patientPhone} />
          <Row icon={Mail} label="Email" value={patientEmail} />
          {locationType === 'home_visit' && addressStreet && (
            <Row
              icon={MapPin}
              label="Address"
              value={`${addressStreet}, ${addressCity}, FL ${addressZip}`}
            />
          )}
        </ReviewSection>

        {/* Documents */}
        <ReviewSection title="Documents" icon={FileText} onEdit={() => onGoToStep(6)}>
          {documents.length === 0 ? (
            <p className="text-gray-400 text-xs">No documents attached</p>
          ) : (
            documents.map((d) => (
              <div key={d.docType} className="flex items-center gap-2 text-xs text-sunshine-dark">
                <FileText className="w-3 h-3 text-sunshine-blue" />
                <span className="font-medium">{DOC_LABELS[d.docType] || d.docType}</span>
                <span className="text-gray-400">({d.file.name})</span>
              </div>
            ))
          )}
        </ReviewSection>
      </div>

      {/* Error display */}
      {submitError && (
        <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p>{submitError.message}</p>
            {submitError.type === 'slot_taken' && (
              <button
                onClick={() => onGoToStep(4)}
                className="text-xs underline mt-1 font-medium hover:text-red-900"
              >
                ← Go back and choose another time
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <ShimmerButton
          onClick={submitBooking}
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-5 sm:px-8 py-3 rounded-full font-semibold text-sm shadow-md disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Confirming...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              Confirm Appointment
            </>
          )}
        </ShimmerButton>
      </div>
    </div>
  );
}
