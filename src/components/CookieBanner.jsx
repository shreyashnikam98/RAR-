import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { useCookieConsent } from '../context/CookieContext';

export default function CookieBanner() {
  const {
    visible,
    managing,
    preferences,
    setPreferences,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    saveConsent,
    close,
  } = useCookieConsent();

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#070D1E]/95 text-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-cyan-500/20">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-sm">
              <Cookie size={20} />
            </span>
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-white">
              {managing ? 'Your privacy choices' : 'Your privacy matters'}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close cookie banner"
          >
            <X size={18} />
          </button>
        </div>

        {managing ? (
          <div className="space-y-3 mb-6">
            {/* Essential */}
            <div className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div>
                <strong className="block text-sm font-bold text-white">Essential</strong>
                <small className="text-xs text-slate-300">Needed for basic site features; always on.</small>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled={true}
                className="mt-1 h-4 w-4 rounded accent-blue-600 cursor-not-allowed opacity-75"
                aria-label="Essential cookies always active"
              />
            </div>

            {/* Preferences */}
            <label className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-colors">
              <div>
                <strong className="block text-sm font-bold text-white">Preferences</strong>
                <small className="text-xs text-slate-300">Remember optional interface choices.</small>
              </div>
              <input
                type="checkbox"
                checked={preferences.preferences}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, preferences: e.target.checked }))
                }
                className="mt-1 h-4 w-4 rounded accent-blue-600 cursor-pointer"
              />
            </label>

            {/* Analytics */}
            <label className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-colors">
              <div>
                <strong className="block text-sm font-bold text-white">Analytics</strong>
                <small className="text-xs text-slate-300">No analytics are active by default.</small>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                }
                className="mt-1 h-4 w-4 rounded accent-blue-600 cursor-pointer"
              />
            </label>
          </div>
        ) : (
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            Essential storage keeps this site working. Optional preferences and analytics stay off unless you choose them. You can change your choice anytime in Cookie Settings. Read our{' '}
            <Link to="/privacy-policy" className="text-cyan-400 font-semibold underline hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {managing ? (
            <>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="flex-1 px-4 py-2.5 text-xs font-bold rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => saveConsent(preferences)}
                className="flex-1 px-4 py-2.5 text-xs font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-95 shadow-md shadow-blue-500/25 transition-opacity"
              >
                Save preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="px-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="px-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-95 shadow-md shadow-blue-600/30 transition-all"
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
