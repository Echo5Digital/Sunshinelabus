'use client';

import { useState, useCallback } from 'react';
import { submitBooking, uploadDocuments } from '@/lib/api';

const initialData = {
  // Step 1
  service: null,
  // Step 2
  locationType: null,
  // Step 3
  date: '',
  // Step 4
  timeSlot: '',
  // Step 5
  patientName: '',
  patientDob: '',
  patientPhone: '',
  patientEmail: '',
  addressStreet: '',
  addressCity: '',
  addressState: 'FL',
  addressZip: '',
  // Step 6
  documents: [], // Array of { file: File, docType: string }
  // Step 7 — populated on success
  confirmedAppointmentId: null,
};

export function useBookingState() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const goToStep = useCallback((n) => {
    setStep(Math.min(7, Math.max(1, n)));
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(7, s + 1));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const updateBookingData = useCallback((updates) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetWizard = useCallback(() => {
    setStep(1);
    setBookingData(initialData);
    setSubmitError(null);
    setIsSubmitting(false);
  }, []);

  const submitBookingHandler = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        service_id: bookingData.service.id,
        location_type: bookingData.locationType,
        appointment_date: bookingData.date,
        appointment_time: bookingData.timeSlot,
        patient_name: bookingData.patientName,
        patient_dob: bookingData.patientDob || undefined,
        patient_phone: bookingData.patientPhone,
        patient_email: bookingData.patientEmail,
        address_street: bookingData.addressStreet || undefined,
        address_city: bookingData.addressCity || undefined,
        address_state: bookingData.addressState || 'FL',
        address_zip: bookingData.addressZip || undefined,
      };

      const result = await submitBooking(payload);
      const appointmentId = result.id;

      // Upload documents if any were attached
      if (bookingData.documents.length > 0) {
        const formData = new FormData();
        const docTypes = [];

        bookingData.documents.forEach(({ file, docType }) => {
          formData.append('files', file);
          docTypes.push(docType);
        });

        // Append doc types
        docTypes.forEach((dt) => formData.append('docTypes', dt));

        try {
          await uploadDocuments(appointmentId, formData);
        } catch (uploadErr) {
          // Document upload failure doesn't block the booking confirmation
          console.warn('Document upload failed:', uploadErr.message);
        }
      }

      updateBookingData({ confirmedAppointmentId: appointmentId });
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.error || 'Booking failed. Please try again.';

      if (status === 409) {
        // Race condition — slot taken
        setSubmitError({ type: 'slot_taken', message });
      } else {
        setSubmitError({ type: 'general', message });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [bookingData, updateBookingData]);

  return {
    step,
    bookingData,
    updateBookingData,
    goToStep,
    nextStep,
    prevStep,
    resetWizard,
    isSubmitting,
    submitError,
    submitBooking: submitBookingHandler,
  };
}
