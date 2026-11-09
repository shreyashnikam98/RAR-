/**
 * RAR Consultant - Core Static JavaScript
 * Pure vanilla JavaScript with 0 external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTestimonialSlider();
  initFaqAccordion();
  initContactForm();
  initCookieConsent();
  initSmoothScroll();
});

/* ----------------------------------------------------
 * 1. NAVBAR & NAVIGATION
 * ---------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  // Sticky header scroll behavior
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('bg-[#070D1E]/95', 'backdrop-blur-xl', 'shadow-xl', 'shadow-black/20', 'border-b', 'border-cyan-500/10', 'py-3.5');
      header?.classList.remove('bg-[#070D1E]', 'py-4', 'sm:py-5', 'border-b', 'border-white/5');
    } else {
      header?.classList.remove('bg-[#070D1E]/95', 'backdrop-blur-xl', 'shadow-xl', 'shadow-black/20', 'border-b', 'border-cyan-500/10', 'py-3.5');
      header?.classList.add('bg-[#070D1E]', 'py-4', 'sm:py-5', 'border-b', 'border-white/5');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileDrawer.classList.contains('hidden');
      if (isHidden) {
        mobileDrawer.classList.remove('hidden');
        menuIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileDrawer.classList.add('hidden');
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on click of any mobile nav link
    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-desktop-link');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('text-white', 'bg-gradient-to-r', 'from-blue-600/90', 'to-cyan-600/90', 'shadow-md', 'shadow-blue-500/20');
      link.classList.remove('text-slate-300', 'hover:text-white', 'hover:bg-white/5');
    }
  });
}

/* ----------------------------------------------------
 * 2. TESTIMONIALS SLIDER (Homepage)
 * ---------------------------------------------------- */
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  const testimonials = [
    {
      quote: "“The team made our website project feel clear and manageable, from the first conversation to launch.”",
      source: "Sample testimonial — replace with an approved client review."
    },
    {
      quote: "“We appreciated the practical guidance and the way the solution was shaped around our business.”",
      source: "Sample testimonial — replace with an approved client review."
    },
    {
      quote: "“A responsive partner who helped us understand the next step in our digital setup.”",
      source: "Sample testimonial — replace with an approved client review."
    }
  ];

  let currentIndex = 0;
  const quoteEl = document.getElementById('testimonial-quote');
  const sourceEl = document.getElementById('testimonial-source');
  const counterEl = document.getElementById('testimonial-counter');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  function updateSlide(index) {
    if (!quoteEl || !sourceEl || !counterEl) return;
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(6px)';
    setTimeout(() => {
      quoteEl.textContent = testimonials[index].quote;
      sourceEl.textContent = testimonials[index].source;
      counterEl.innerHTML = `<span class="text-blue-600 text-sm font-extrabold">${String(index + 1).padStart(2, '0')}</span> / ${String(testimonials.length).padStart(2, '0')}`;
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 150);
  }

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + testimonials.length - 1) % testimonials.length;
    updateSlide(currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlide(currentIndex);
  });
}

/* ----------------------------------------------------
 * 3. FAQ ACCORDION (Services Page)
 * ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    btn?.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          const otherBtn = other.querySelector('.faq-btn');
          const otherAns = other.querySelector('.faq-answer');
          const otherIcon = other.querySelector('.faq-icon');
          otherBtn?.setAttribute('aria-expanded', 'false');
          otherAns?.classList.add('hidden');
          otherIcon?.classList.remove('rotate-180', 'bg-blue-600', 'text-white');
          otherIcon?.classList.add('bg-slate-100', 'text-slate-600');
          other.classList.remove('shadow-md', 'border-blue-400/50', 'ring-1', 'ring-blue-400/30');
        }
      });

      // Toggle current
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer?.classList.add('hidden');
        icon?.classList.remove('rotate-180', 'bg-blue-600', 'text-white');
        icon?.classList.add('bg-slate-100', 'text-slate-600');
        item.classList.remove('shadow-md', 'border-blue-400/50', 'ring-1', 'ring-blue-400/30');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer?.classList.remove('hidden');
        icon?.classList.add('rotate-180', 'bg-blue-600', 'text-white');
        icon?.classList.remove('bg-slate-100', 'text-slate-600');
        item.classList.add('shadow-md', 'border-blue-400/50', 'ring-1', 'ring-blue-400/30');
      }
    });
  });
}

/* ----------------------------------------------------
 * 4. CONTACT FORM & WEB3FORMS INTEGRATION
 * ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  const ACCESS_KEY = '8b67ad90-469d-40af-b193-a644112dc3db';
  const THROTTLE_KEY = 'rar_enquiry_sent_at';
  const THROTTLE_MS = 60000;

  // Pre-select service from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const serviceSelect = document.getElementById('service');
  if (serviceParam && serviceSelect) {
    const slugMap = {
      'website-development': 'Website Development',
      'custom-software-development': 'Custom Software Development',
      'search-engine-optimization': 'Search Engine Optimization (SEO)',
      'e-commerce-platform-portal': 'E-Commerce Platform / Portal',
      'local-business-digital-setup': 'Local Business Digital Setup',
      'website-maintenance': 'Website Maintenance'
    };
    const targetTitle = slugMap[serviceParam] || serviceParam;
    for (let opt of serviceSelect.options) {
      if (opt.value.toLowerCase() === targetTitle.toLowerCase()) {
        serviceSelect.value = opt.value;
        break;
      }
    }
  }

  // Character counter for message textarea
  const messageEl = document.getElementById('message');
  const countEl = document.getElementById('message-count');
  if (messageEl && countEl) {
    const updateCount = () => {
      const len = messageEl.value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim().length;
      countEl.textContent = `${len}/500`;
      if (len > 470) {
        countEl.classList.add('text-amber-600');
        countEl.classList.remove('text-slate-400');
      } else {
        countEl.classList.remove('text-amber-600');
        countEl.classList.add('text-slate-400');
      }
    };
    messageEl.addEventListener('input', updateCount);
    updateCount();
  }

  // Throttle check
  const throttleMsg = document.getElementById('throttle-message');
  const submitBtn = document.getElementById('submit-btn');

  function checkThrottle() {
    try {
      const last = Number(localStorage.getItem(THROTTLE_KEY));
      if (Number.isFinite(last) && last > 0) {
        const remaining = Math.max(0, THROTTLE_MS - (Date.now() - last));
        if (remaining > 0) {
          if (throttleMsg) {
            throttleMsg.textContent = `Please wait ${Math.ceil(remaining / 1000)} seconds before sending another enquiry.`;
            throttleMsg.classList.remove('hidden');
          }
          if (submitBtn) submitBtn.disabled = true;
          return true;
        }
      }
    } catch (e) {}
    if (throttleMsg) throttleMsg.classList.add('hidden');
    if (submitBtn) submitBtn.disabled = false;
    return false;
  }
  checkThrottle();
  setInterval(checkThrottle, 1000);

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (checkThrottle()) return;

    // Validate fields
    const fullName = document.getElementById('fullName');
    const mobile = document.getElementById('mobile');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent-checkbox');
    const botcheck = document.getElementById('botcheck');

    let isValid = true;

    // Helper error display
    const setError = (field, errorId, msg) => {
      const errEl = document.getElementById(errorId);
      if (msg) {
        isValid = false;
        field.classList.add('border-rose-300', 'bg-rose-50/30');
        field.classList.remove('border-slate-200', 'bg-[#F8FAFC]');
        if (errEl) {
          errEl.textContent = msg;
          errEl.classList.remove('hidden');
        }
      } else {
        field.classList.remove('border-rose-300', 'bg-rose-50/30');
        field.classList.add('border-slate-200', 'bg-[#F8FAFC]');
        if (errEl) errEl.classList.add('hidden');
      }
    };

    // Full name
    const nameVal = fullName.value.trim();
    if (!nameVal) setError(fullName, 'fullName-error', 'Please include your name.');
    else if (nameVal.length < 2) setError(fullName, 'fullName-error', 'Please enter at least 2 characters.');
    else if (nameVal.length > 60) setError(fullName, 'fullName-error', 'Please keep your name under 60 characters.');
    else if (!/^[\p{L} .'-]+$/u.test(nameVal)) setError(fullName, 'fullName-error', "Use letters, spaces, dots, hyphens, or apostrophes only.");
    else setError(fullName, 'fullName-error', '');

    // Mobile
    const mobVal = mobile.value.trim();
    const digits = mobVal.replace(/\D/g, '');
    if (!mobVal || digits.length < 10) setError(mobile, 'mobile-error', 'Please enter a valid 10-digit mobile number.');
    else if (mobVal.length > 20) setError(mobile, 'mobile-error', 'Phone number must be under 20 characters.');
    else setError(mobile, 'mobile-error', '');

    // Email
    const emailVal = email.value.trim().toLowerCase();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) setError(email, 'email-error', 'Enter a valid email address.');
    else if (emailVal.length > 100) setError(email, 'email-error', 'Email must be 100 characters or fewer.');
    else setError(email, 'email-error', '');

    // Service
    if (!service.value) setError(service, 'service-error', 'Please select one of the listed services.');
    else setError(service, 'service-error', '');

    // Message
    const msgVal = message.value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
    if (!msgVal || msgVal.length < 5) setError(message, 'message-error', 'Please share at least 5 characters so we can understand your needs.');
    else if (msgVal.length > 500) setError(message, 'message-error', 'Please keep your description under 500 characters.');
    else setError(message, 'message-error', '');

    // Consent
    const consentErr = document.getElementById('consent-error');
    if (!consent.checked) {
      isValid = false;
      if (consentErr) {
        consentErr.textContent = 'Please agree to the Privacy Policy and Terms and Conditions to proceed.';
        consentErr.classList.remove('hidden');
      }
    } else {
      if (consentErr) consentErr.classList.add('hidden');
    }

    if (!isValid) return;

    // Honeypot check
    const successBanner = document.getElementById('success-banner');
    const errorBanner = document.getElementById('error-banner');
    const errorText = document.getElementById('error-banner-text');

    if (botcheck && botcheck.value) {
      if (successBanner) successBanner.classList.remove('hidden');
      form.reset();
      return;
    }

    // Prepare payload
    function formatIndiaTime() {
      return `${new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())} IST`;
    }

    function formatMobile(num) {
      const d = num.replace(/\D/g, '');
      if (d.length === 10) return `+91${d}`;
      if (d.length === 12 && d.startsWith('91')) return `+${d}`;
      if (d.length === 11 && d.startsWith('0')) return `+91${d.slice(1)}`;
      const c = num.replace(/[\s-]/g, '').trim();
      return c.startsWith('+') ? c : `+${c}`;
    }

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Enquiry from ${nameVal} – ${service.value} | RAR Consultant Website`,
      from_name: 'RAR Consultant Website',
      name: nameVal,
      mobile: formatMobile(mobVal),
      email: emailVal,
      service: service.value,
      message: msgVal,
      consent: 'Yes',
      consent_timestamp_ist: formatIndiaTime(),
      consent_version: 'v1.0',
      botcheck: ''
    };

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Sending…</span>
      `;
    }

    if (errorBanner) errorBanner.classList.add('hidden');
    if (successBanner) successBanner.classList.add('hidden');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const result = await res.json();
      if (res.ok && result.success) {
        try {
          localStorage.setItem(THROTTLE_KEY, String(Date.now()));
        } catch (e) {}
        checkThrottle();
        if (successBanner) successBanner.classList.remove('hidden');
        form.reset();
        if (countEl) countEl.textContent = '0/500';
      } else {
        if (errorBanner && errorText) {
          errorText.textContent = 'We could not send your enquiry right now. Please try again or use the contact options below.';
          errorBanner.classList.remove('hidden');
        }
      }
    } catch (err) {
      if (errorBanner && errorText) {
        if (err.name === 'AbortError') {
          errorText.textContent = 'The request took longer than expected, so we could not confirm delivery.';
        } else {
          errorText.textContent = 'We could not connect to the enquiry service. Please try again later.';
        }
        errorBanner.classList.remove('hidden');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send enquiry</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        `;
      }
    }
  });
}

/* ----------------------------------------------------
 * 5. COOKIE BANNER & PREFERENCES MODAL
 * ---------------------------------------------------- */
function initCookieConsent() {
  const STORAGE_KEY = 'rar_cookie_consent_v1';
  const banner = document.getElementById('cookie-banner');
  const simpleView = document.getElementById('cookie-simple-view');
  const manageView = document.getElementById('cookie-manage-view');
  const bannerTitle = document.getElementById('cookie-banner-title');

  const acceptAllBtn = document.getElementById('cookie-accept-all');
  const rejectBtn = document.getElementById('cookie-reject');
  const manageBtn = document.getElementById('cookie-manage');
  const savePrefsBtn = document.getElementById('cookie-save-prefs');
  const closeBannerBtn = document.getElementById('cookie-close');

  const prefCheckbox = document.getElementById('cookie-pref-checkbox');
  const analyticsCheckbox = document.getElementById('cookie-analytics-checkbox');

  function saveConsent(prefs) {
    try {
      const payload = {
        preferences: {
          essential: true,
          preferences: !!prefs.preferences,
          analytics: !!prefs.analytics
        },
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
    if (banner) banner.classList.add('hidden');
  }

  // Check stored
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setTimeout(() => {
        if (banner) banner.classList.remove('hidden');
      }, 1200);
    } else {
      const parsed = JSON.parse(stored);
      if (parsed?.preferences) {
        if (prefCheckbox) prefCheckbox.checked = !!parsed.preferences.preferences;
        if (analyticsCheckbox) analyticsCheckbox.checked = !!parsed.preferences.analytics;
      }
    }
  } catch (e) {
    if (banner) banner.classList.remove('hidden');
  }

  // Open preferences view
  manageBtn?.addEventListener('click', () => {
    if (simpleView) simpleView.classList.add('hidden');
    if (manageView) manageView.classList.remove('hidden');
    if (bannerTitle) bannerTitle.textContent = 'Your privacy choices';
  });

  // Reopen from footer button (any page)
  const reopenTriggers = document.querySelectorAll('.open-cookie-settings');
  reopenTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (banner) banner.classList.remove('hidden');
      if (simpleView) simpleView.classList.add('hidden');
      if (manageView) manageView.classList.remove('hidden');
      if (bannerTitle) bannerTitle.textContent = 'Your privacy choices';
    });
  });

  acceptAllBtn?.addEventListener('click', () => {
    saveConsent({ preferences: true, analytics: true });
  });

  rejectBtn?.addEventListener('click', () => {
    saveConsent({ preferences: false, analytics: false });
  });

  savePrefsBtn?.addEventListener('click', () => {
    saveConsent({
      preferences: prefCheckbox ? prefCheckbox.checked : false,
      analytics: analyticsCheckbox ? analyticsCheckbox.checked : false
    });
  });

  closeBannerBtn?.addEventListener('click', () => {
    if (banner) banner.classList.add('hidden');
  });
}

/* ----------------------------------------------------
 * 6. SMOOTH SCROLL FOR HASH LINKS
 * ---------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

