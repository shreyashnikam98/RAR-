import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { privacyPolicySections } from '../data/websiteData';

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="How RAR Consultant collects, uses, and safeguards information under India’s Digital Personal Data Protection Act, 2023."
      sections={privacyPolicySections}
    />
  );
}

