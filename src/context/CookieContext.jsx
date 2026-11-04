import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'rar_cookie_consent_v1';

const CookieContext = createContext(null);

export function CookieProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    preferences: false,
    analytics: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show banner after brief delay
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.preferences === 'object') {
          setPreferences(parsed.preferences);
        }
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (prefs) => {
    try {
      const payload = {
        preferences: {
          essential: true,
          preferences: !!prefs.preferences,
          analytics: !!prefs.analytics,
        },
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setPreferences(payload.preferences);
      setVisible(false);
      setManaging(false);
    } catch (e) {
      setVisible(false);
      setManaging(false);
    }
  };

  const acceptAll = () => {
    saveConsent({ essential: true, preferences: true, analytics: true });
  };

  const rejectNonEssential = () => {
    saveConsent({ essential: true, preferences: false, analytics: false });
  };

  const openPreferences = () => {
    setManaging(true);
    setVisible(true);
  };

  const reopen = () => {
    setManaging(true);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setManaging(false);
  };

  return (
    <CookieContext.Provider
      value={{
        visible,
        managing,
        preferences,
        setPreferences,
        acceptAll,
        rejectNonEssential,
        openPreferences,
        saveConsent,
        reopen,
        close,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}

