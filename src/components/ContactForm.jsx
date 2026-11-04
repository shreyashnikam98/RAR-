import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { companyInfo, services } from '../data/websiteData';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = '8b67ad90-469d-40af-b193-a644112dc3db';
const THROTTLE_STORAGE_KEY = 'rar_enquiry_sent_at';
const THROTTLE_DURATION_MS = 60000;

function formatIndiaTime(date = new Date()) {
  return `${new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)} IST`;
}

function cleanText(text = '') {
  return text.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function formatMobileNumber(num = '') {
  const digits = num.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.slice(1)}`;
  const clean = num.replace(/[\s-]/g, '').trim();
  return clean.startsWith('+') ? clean : `+${clean}`;
}

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const initialServiceSlug = searchParams.get('service') || '';
  const matchedService = services.find(
    (s) => s.slug === initialServiceSlug || s.title.toLowerCase() === initialServiceSlug.toLowerCase()
  );

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    service: matchedService ? matchedService.title : '',
    message: '',
    consent: false,
    botcheck: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [remainingThrottle, setRemainingThrottle] = useState(0);

  useEffect(() => {
    if (matchedService) {
      setFormData((prev) => ({ ...prev, service: matchedService.title }));
    }
  }, [initialServiceSlug]);

  useEffect(() => {
    const checkThrottle = () => {
      try {
        const lastSent = Number(localStorage.getItem(THROTTLE_STORAGE_KEY));
        if (Number.isFinite(lastSent) && lastSent > 0) {
          const rem = Math.max(0, THROTTLE_DURATION_MS - (Date.now() - lastSent));
          setRemainingThrottle(rem);
        } else {
          setRemainingThrottle(0);
        }
      } catch (e) {
        setRemainingThrottle(0);
      }
    };

    checkThrottle();
    const interval = setInterval(checkThrottle, 1000);
    return () => clearInterval(interval);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName': {
        const trimmed = value.trim();
        if (!trimmed) return 'Please include your name.';
        if (trimmed.length < 2) return 'Please enter at least 2 characters.';
        if (trimmed.length > 60) return 'Please keep your name under 60 characters.';
        if (!/^[\p{L} .'-]+$/u.test(trimmed)) {
          return "Use letters, spaces, dots, hyphens, or apostrophes only.";
        }
        return '';
      }
      case 'mobile': {
        const trimmed = value.trim();
        const digits = trimmed.replace(/\D/g, '');
        if (!trimmed || digits.length < 10) return 'Please enter a valid 10-digit mobile number.';
        if (trimmed.length > 20) return 'Phone number must be under 20 characters.';
        if (
          !(
            digits.length === 10 ||
            (digits.length === 12 && digits.startsWith('91')) ||
            (digits.length === 11 && digits.startsWith('0')) ||
            digits.length >= 10
          )
        ) {
          return 'Enter a valid 10-digit mobile number.';
        }
        return '';
      }
      case 'email': {
        const trimmed = value.trim().toLowerCase();
        if (!trimmed) return 'Enter a valid email address.';
        if (trimmed.length > 100) return 'Email must be 100 characters or fewer.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return 'Enter a valid email address.';
        }
        return '';
      }
      case 'service': {
        const titles = services.map((s) => s.title);
        if (!value || !titles.includes(value)) {
          return 'Please select one of the listed services.';
        }
        return '';
      }
      case 'message': {
        const cleaned = cleanText(value);
        if (!cleaned || cleaned.length < 5) {
          return 'Please share at least 5 characters so we can understand your needs.';
        }
        if (cleaned.length > 500) {
          return 'Please keep your description under 500 characters.';
        }
        return '';
      }
      case 'consent': {
        if (!value) {
          return 'Please agree to the Privacy Policy and Terms and Conditions to proceed.';
        }
        return '';
      }
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'botcheck') {
        const err = validateField(key, formData[key]);
        if (err) newErrors[key] = err;
      }
    });
    setErrors(newErrors);
    setTouched({
      fullName: true,
      mobile: true,
      email: true,
      service: true,
      message: true,
      consent: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (remainingThrottle > 0) return;
    if (!validateAll()) return;

    setStatus('loading');
    setErrorMessage('');

    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Enquiry from ${formData.fullName} – ${formData.service} | RAR Consultant Website`,
      from_name: 'RAR Consultant Website',
      name: formData.fullName.trim(),
      mobile: formatMobileNumber(formData.mobile),
      email: formData.email.trim().toLowerCase(),
      service: formData.service,
      message: cleanText(formData.message),
      consent: 'Yes',
      consent_timestamp_ist: formatIndiaTime(),
      consent_version: 'v1.0',
      botcheck: '',
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (response.ok && result.success) {
        try {
          localStorage.setItem(THROTTLE_STORAGE_KEY, String(Date.now()));
        } catch (err) {}
        setRemainingThrottle(THROTTLE_DURATION_MS);
        setStatus('success');
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          service: '',
          message: '',
          consent: false,
          botcheck: '',
        });
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
        setErrorMessage(
          'We could not send your enquiry right now. Please try again or use the contact options below.'
        );
      }
    } catch (err) {
      setStatus('error');
      if (err.name === 'AbortError') {
        setErrorMessage('The request took longer than expected, so we could not confirm delivery.');
      } else {
        setErrorMessage('We could not connect to the enquiry service. Please try again later.');
      }
    }
  };

  const messageCount = cleanText(formData.message).length;
  const isSubmitDisabled = status === 'loading' || remainingThrottle > 0;

  return (
    <section
      className="bg-white rounded-3xl p-6 sm:p-10 shadow-card-subtle border border-slate-200/80 relative"
      aria-labelledby="form-title"
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 shadow-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <span>A good first step</span>
        </p>
        <h2 id="form-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B]">
          Tell us what you{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            need.
          </span>
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
          Share a few details. We’ll use them only to respond to your enquiry and prepare a relevant quote.
        </p>
      </div>

      {/* Success Notification */}
      {status === 'success' && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-base text-emerald-950">
                Thank you! We will contact you within 24 hours.
              </h3>
              <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
                Your enquiry has been sent. We appreciate you getting in touch.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {status === 'error' && (
        <div className="mb-6 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-sm text-rose-950">
                Could not send enquiry
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-rose-800 leading-relaxed">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <input
          type="text"
          name="botcheck"
          value={formData.botcheck}
          onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
            Full name <span className="text-blue-600">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            placeholder="e.g. Aditi Sharma"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : 'fullName-hint'}
            className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.fullName && touched.fullName
                ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                : 'border-slate-200 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:ring-blue-100 focus:border-blue-600'
            }`}
          />
          {!errors.fullName || !touched.fullName ? (
            <p id="fullName-hint" className="mt-1.5 text-[11px] text-slate-500">
              Use letters, spaces, dots, hyphens, or apostrophes only.
            </p>
          ) : (
            <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Mobile & Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
              Mobile number <span className="text-blue-600">*</span>
            </label>
            <input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              onBlur={() => handleBlur('mobile')}
              placeholder="e.g. 98765 43210"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? 'mobile-error' : 'mobile-hint'}
              className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.mobile && touched.mobile
                  ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                  : 'border-slate-200 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:ring-blue-100 focus:border-blue-600'
              }`}
            />
            {!errors.mobile || !touched.mobile ? (
              <p id="mobile-hint" className="mt-1.5 text-[11px] text-slate-500 leading-snug">
                Include your 10-digit mobile number. We format it with the India country code (+91).
              </p>
            ) : (
              <p id="mobile-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle size={13} />
                <span>{errors.mobile}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
              Email address <span className="text-blue-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="e.g. aditi@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : 'email-hint'}
              className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.email && touched.email
                  ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                  : 'border-slate-200 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:ring-blue-100 focus:border-blue-600'
              }`}
            />
            {!errors.email || !touched.email ? (
              <p id="email-hint" className="mt-1.5 text-[11px] text-slate-500">
                We’ll send a confirmation and proposal to this address.
              </p>
            ) : (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle size={13} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-1.5">
            Select a service <span className="text-blue-600">*</span>
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            onBlur={() => handleBlur('service')}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : 'service-hint'}
            className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 ${
              errors.service && touched.service
                ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                : 'border-slate-200 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:ring-blue-100 focus:border-blue-600'
            }`}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          {!errors.service || !touched.service ? (
            <p id="service-hint" className="mt-1.5 text-[11px] text-slate-500">
              Choose the service that best matches your immediate need.
            </p>
          ) : (
            <p id="service-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.service}</span>
            </p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="message" className="block text-xs font-bold text-[#0B132B] uppercase tracking-wider">
              Tell us about your project <span className="text-blue-600">*</span>
            </label>
            <span
              id="message-count"
              className={`text-[11px] font-mono font-bold ${
                messageCount > 470 ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              {messageCount}/500
            </span>
          </div>
          <textarea
            id="message"
            rows="4"
            maxLength={500}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            placeholder="What would you like to build or improve?"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
              errors.message && touched.message
                ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                : 'border-slate-200 bg-[#F8FAFC] hover:bg-white focus:bg-white focus:ring-blue-100 focus:border-blue-600'
            }`}
          />
          {!errors.message || !touched.message ? (
            <p id="message-hint" className="mt-1.5 text-[11px] text-slate-500">
              Please share 5–500 characters so we can understand your needs.
            </p>
          ) : (
            <p id="message-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Privacy Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              id="consent-checkbox"
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleChange('consent', e.target.checked)}
              onBlur={() => handleBlur('consent')}
              aria-invalid={!!errors.consent}
              aria-describedby="consent-error"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
              I have read and agree to the{' '}
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:underline"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                to="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:underline"
              >
                Terms and Conditions
              </Link>
              , and I consent to RAR Consultant processing my personal data to respond to my enquiry.
            </span>
          </label>
          {errors.consent && touched.consent && (
            <p id="consent-error" role="alert" className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{errors.consent}</span>
            </p>
          )}

          <p className="mt-2 text-[11px] text-slate-400 leading-normal pl-7">
            Your enquiry details are transmitted through Web3Forms, a third-party form service acting as a Data Processor. It may process your data on servers outside India.
          </p>
        </div>

        {/* Throttle Note */}
        {remainingThrottle > 0 && status !== 'loading' && (
          <p className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-2.5 rounded-xl" role="status">
            Please wait {Math.ceil(remainingThrottle / 1000)} seconds before sending another enquiry.
          </p>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-blue-500/25 border border-white/20 transition-all duration-200 hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                <span>Sending…</span>
              </>
            ) : (
              <>
                <span>Send enquiry</span>
                <Send size={15} />
              </>
            )}
          </button>
        </div>

        {/* Footer Notes */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>We use your details only to respond to this enquiry and provide a relevant quote.</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a href={`mailto:${companyInfo.email}`} className="text-blue-600 font-bold hover:underline">
              {companyInfo.email}
            </a>
            <span aria-hidden="true">·</span>
            <Link to="/privacy-policy" className="text-blue-600 font-bold hover:underline">
              How we handle your data
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
