'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, CreditCard, FileText, Shield, X, Upload, Image, AlertCircle } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { DOCUMENT_TYPES } from '@/lib/booking-constants';

const TYPE_ICONS = {
  id: CreditCard,
  lab_order: FileText,
  insurance_front: Shield,
  insurance_back: Shield,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

function DocumentCard({ docType, uploaded, onUpload, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const Icon = TYPE_ICONS[docType.key] || FileText;

  const handleFile = (file) => {
    if (!file) return;
    setSizeError(false);
    if (!ACCEPTED_TYPES.includes(file.type)) return;
    if (file.size > MAX_FILE_SIZE) {
      setSizeError(true);
      return;
    }
    onUpload(docType.key, file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed p-4 transition-all"
      style={{ borderColor: dragging ? '#2B7DBF' : uploaded ? '#6BB6E8' : '#E5E7EB' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
          ${uploaded ? 'bg-sunshine-blue/10 text-sunshine-blue' : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sunshine-dark truncate">{docType.label}</p>
          <p className="text-xs text-gray-400">{docType.hint}</p>
        </div>
        <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
          Optional
        </span>
      </div>

      {/* Drop zone or preview */}
      {uploaded ? (
        <div className="flex items-center gap-2 bg-sunshine-soft/50 rounded-xl px-3 py-2">
          {uploaded.file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(uploaded.file)}
              alt="preview"
              className="w-8 h-8 rounded object-cover flex-shrink-0"
            />
          ) : (
            <FileText className="w-5 h-5 text-sunshine-blue flex-shrink-0" />
          )}
          <span className="text-xs text-sunshine-dark truncate flex-1">{uploaded.file.name}</span>
          <button
            onClick={onRemove}
            className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl cursor-pointer transition-colors
            ${dragging ? 'bg-sunshine-soft/60' : 'bg-gray-50 hover:bg-sunshine-soft/40'}`}
        >
          <Upload className="w-5 h-5 text-gray-300" />
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Drop file here or <span className="text-sunshine-blue font-medium">browse</span>
          </p>
          <p className="text-[10px] text-gray-300">JPG, PNG or PDF · max 10MB</p>
        </div>
      )}

      {sizeError && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5" />
          File exceeds 10MB limit
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

export default function Step6Documents({ bookingData, updateBookingData, onNext, onPrev }) {
  // documents: Array<{ docType: string, file: File }>
  const docs = bookingData.documents;

  const getUploaded = (key) => docs.find((d) => d.docType === key);

  const handleUpload = (key, file) => {
    const filtered = docs.filter((d) => d.docType !== key);
    updateBookingData({ documents: [...filtered, { docType: key, file }] });
  };

  const handleRemove = (key) => {
    updateBookingData({ documents: docs.filter((d) => d.docType !== key) });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Upload Documents</h2>
        <p className="text-gray-500 text-sm mt-1">
          All fields are optional. Upload any relevant documents to speed up your visit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DOCUMENT_TYPES.map((docType) => (
          <DocumentCard
            key={docType.key}
            docType={docType}
            uploaded={getUploaded(docType.key)}
            onUpload={handleUpload}
            onRemove={() => handleRemove(docType.key)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onNext}
            className="text-sm text-gray-400 hover:text-sunshine-dark font-medium transition-colors"
          >
            Skip this step
          </button>
          <ShimmerButton
            onClick={onNext}
            className="bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}
