'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, AlertCircle, Check } from 'lucide-react';
import { fetchAdminAppointmentById, updateAppointment, fetchServices } from '@/lib/api';

const inputCls =
  'w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06] placeholder-white/25';

const labelCls = 'block text-xs font-semibold text-white/40 uppercase tracking-wide mb-1.5';

function Field({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export default function AppointmentEditModal({ appointmentId, onClose, onSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);

  // Form fields
  const [serviceId, setServiceId] = useState('');
  const [locationType, setLocationType] = useState('on_site');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('FL');
  const [addressZip, setAddressZip] = useState('');
  const [apptId, setApptId] = useState(null);

  useEffect(() => {
    if (!appointmentId) {
      setError('');
      return;
    }
    setLoading(true);
    setError('');

    Promise.all([
      fetchAdminAppointmentById(appointmentId),
      fetchServices(),
    ])
      .then(([appt, svcs]) => {
        setApptId(appt.id);
        setServiceId(appt.service_id || '');
        setLocationType(appt.location_type || 'on_site');
        setDate(appt.appointment_date || '');
        setTime(appt.appointment_time?.slice(0, 5) || '');
        setPatientName(appt.patient_name || '');
        setPatientDob(appt.patient_dob || '');
        setPatientPhone(appt.patient_phone || '');
        setPatientEmail(appt.patient_email || '');
        setAddressStreet(appt.address_street || '');
        setAddressCity(appt.address_city || '');
        setAddressState(appt.address_state || 'FL');
        setAddressZip(appt.address_zip || '');
        setServices(Array.isArray(svcs) ? svcs : svcs?.data || []);
      })
      .catch(() => setError('Failed to load appointment details.'))
      .finally(() => setLoading(false));
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateAppointment(apptId, {
        service_id: serviceId || undefined,
        location_type: locationType,
        appointment_date: date,
        appointment_time: time,
        patient_name: patientName,
        patient_dob: patientDob || null,
        patient_phone: patientPhone,
        patient_email: patientEmail,
        address_street: locationType === 'home_visit' ? addressStreet : null,
        address_city: locationType === 'home_visit' ? addressCity : null,
        address_state: locationType === 'home_visit' ? addressState : null,
        address_zip: locationType === 'home_visit' ? addressZip : null,
      });
      onSaved?.();
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.error || err?.response?.data?.errors?.[0]?.msg || 'Failed to save changes.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {appointmentId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#1a2535] shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
              <div>
                <h2 className="font-bold text-white text-base">Edit Appointment</h2>
                {apptId && (
                  <p className="text-xs text-white/35 mt-0.5">
                    #{apptId.slice(0, 8).toUpperCase()}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-7 h-7 text-sunshine-blue animate-spin" />
                </div>
              )}

              {error && (
                <div className="mx-6 mt-6 flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {!loading && apptId && (
                <form id="edit-appt-form" onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                  {/* Appointment section */}
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Appointment</p>
                    <div className="space-y-4">
                      <Field label="Service">
                        <select
                          value={serviceId}
                          onChange={(e) => setServiceId(e.target.value)}
                          className={inputCls + ' bg-[#1a2535]'}
                        >
                          <option value="">— Select service —</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Location">
                        <select
                          value={locationType}
                          onChange={(e) => setLocationType(e.target.value)}
                          className={inputCls + ' bg-[#1a2535]'}
                        >
                          <option value="on_site">Clinic Visit</option>
                          <option value="home_visit">Home Visit</option>
                        </select>
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Date">
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className={inputCls + ' [color-scheme:dark]'}
                          />
                        </Field>
                        <Field label="Time">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className={inputCls + ' [color-scheme:dark]'}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* Patient section */}
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Patient</p>
                    <div className="space-y-4">
                      <Field label="Full Name">
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          required
                          maxLength={100}
                          placeholder="Full name"
                          className={inputCls}
                        />
                      </Field>

                      <Field label="Date of Birth (optional)">
                        <input
                          type="date"
                          value={patientDob}
                          onChange={(e) => setPatientDob(e.target.value)}
                          className={inputCls + ' [color-scheme:dark]'}
                        />
                      </Field>

                      <Field label="Phone">
                        <input
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          required
                          placeholder="Phone number"
                          className={inputCls}
                        />
                      </Field>

                      <Field label="Email">
                        <input
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          required
                          placeholder="Email address"
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Address — only for home visits */}
                  {locationType === 'home_visit' && (
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-3">Address</p>
                      <div className="space-y-4">
                        <Field label="Street">
                          <input
                            type="text"
                            value={addressStreet}
                            onChange={(e) => setAddressStreet(e.target.value)}
                            required
                            placeholder="Street address"
                            className={inputCls}
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="City">
                            <input
                              type="text"
                              value={addressCity}
                              onChange={(e) => setAddressCity(e.target.value)}
                              required
                              placeholder="City"
                              className={inputCls}
                            />
                          </Field>
                          <Field label="State">
                            <input
                              type="text"
                              value={addressState}
                              onChange={(e) => setAddressState(e.target.value)}
                              placeholder="State"
                              maxLength={2}
                              className={inputCls}
                            />
                          </Field>
                        </div>
                        <Field label="ZIP Code">
                          <input
                            type="text"
                            value={addressZip}
                            onChange={(e) => setAddressZip(e.target.value)}
                            required
                            placeholder="ZIP code"
                            maxLength={10}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Footer */}
            {!loading && apptId && (
              <div className="px-6 py-4 border-t border-white/[0.07] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm text-white/50 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="edit-appt-form"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-sunshine-blue text-white text-sm font-semibold rounded-xl hover:bg-sunshine-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {saving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
