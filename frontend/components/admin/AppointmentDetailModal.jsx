'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Calendar, Clock, MapPin, Phone, Mail,
  FileText, Download, Loader2, Check, AlertCircle,
} from 'lucide-react';
import { fetchAdminAppointmentById, updateAppointmentStatus, updateAppointmentNotes } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';

const LOCATION_LABELS = { on_site: 'Clinic Visit', home_visit: 'Home Visit' };
const DOC_LABELS = {
  id: 'Photo ID', lab_order: 'Lab Order / Rx',
  insurance_front: 'Insurance (Front)', insurance_back: 'Insurance (Back)', other: 'Other',
};

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
      <span className="text-gray-500 min-w-[80px] flex-shrink-0">{label}</span>
      <span className="text-sunshine-dark font-medium break-words">{value}</span>
    </div>
  );
}

export default function AppointmentDetailModal({ appointmentId, onClose }) {
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusSaving, setStatusSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!appointmentId) return;
    setLoading(true);
    fetchAdminAppointmentById(appointmentId)
      .then((data) => {
        setAppt(data);
        setNotes(data.admin_notes || '');
        setSelectedStatus(data.status);
      })
      .catch(() => setError('Failed to load appointment details.'))
      .finally(() => setLoading(false));
  }, [appointmentId]);

  const handleStatusSave = async () => {
    if (!selectedStatus || selectedStatus === appt.status) return;
    setStatusSaving(true);
    try {
      await updateAppointmentStatus(appt.id, selectedStatus);
      setAppt((prev) => ({ ...prev, status: selectedStatus }));
    } catch {
      setError('Failed to update status.');
    } finally {
      setStatusSaving(false);
    }
  };

  const handleNotesSave = async () => {
    try {
      await updateAppointmentNotes(appt.id, notes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    } catch {
      setError('Failed to save notes.');
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
            className="fixed inset-0 z-40 bg-sunshine-dark/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-sunshine-dark text-base">
                  {loading ? 'Loading...' : appt?.patient_name}
                </h2>
                {appt && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    #{appt.id.slice(0, 8).toUpperCase()}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-sunshine-dark hover:bg-gray-100 transition-colors"
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
                <div className="m-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {!loading && appt && (
                <div className="px-6 py-5 space-y-6">
                  {/* Status control */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</p>
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleStatusSave}
                        disabled={statusSaving || selectedStatus === appt.status}
                        className="px-4 py-2.5 bg-sunshine-blue text-white text-sm font-semibold rounded-xl hover:bg-sunshine-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                      >
                        {statusSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Appointment details */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Appointment</p>
                    <div className="space-y-2">
                      <InfoRow icon={FileText} label="Service" value={appt.services?.name} />
                      <InfoRow icon={MapPin} label="Location" value={LOCATION_LABELS[appt.location_type]} />
                      <InfoRow icon={Calendar} label="Date" value={appt.appointment_date} />
                      <InfoRow icon={Clock} label="Time" value={appt.appointment_time?.slice(0, 5)} />
                      <InfoRow icon={Clock} label="Duration" value={appt.services?.duration_minutes ? `${appt.services.duration_minutes} min` : null} />
                    </div>
                  </div>

                  {/* Patient info */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Patient</p>
                    <div className="space-y-2">
                      <InfoRow icon={User} label="Name" value={appt.patient_name} />
                      <InfoRow icon={Calendar} label="DOB" value={appt.patient_dob} />
                      <InfoRow icon={Phone} label="Phone" value={appt.patient_phone} />
                      <InfoRow icon={Mail} label="Email" value={appt.patient_email} />
                      {appt.location_type === 'home_visit' && appt.address_street && (
                        <InfoRow
                          icon={MapPin}
                          label="Address"
                          value={`${appt.address_street}, ${appt.address_city}, ${appt.address_state} ${appt.address_zip}`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Documents</p>
                    {(!appt.documents || appt.documents.length === 0) ? (
                      <p className="text-sm text-gray-400">No documents uploaded.</p>
                    ) : (
                      <div className="space-y-2">
                        {appt.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                            <FileText className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-sunshine-dark">{DOC_LABELS[doc.document_type] || doc.document_type}</p>
                              <p className="text-xs text-gray-400 truncate">{doc.file_name}</p>
                            </div>
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-sunshine-blue hover:bg-sunshine-soft transition-colors flex-shrink-0"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Admin notes */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Admin Notes</p>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Add internal notes about this appointment..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue resize-none transition-colors"
                      maxLength={2000}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-300">{notes.length}/2000</span>
                      <button
                        onClick={handleNotesSave}
                        className="flex items-center gap-2 px-4 py-2 bg-sunshine-blue text-white text-xs font-semibold rounded-lg hover:bg-sunshine-blue/90 transition-colors"
                      >
                        {notesSaved ? (
                          <><Check className="w-3.5 h-3.5" /> Saved</>
                        ) : (
                          'Save Notes'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
