import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { termsSections } from '../data/websiteData';

export default function Terms() {
  return (
    <LegalLayout
      title="Terms and Conditions"
      description="The standard terms governing our digital services, client engagements, deliverables, and website usage."
      sections={termsSections}
    />
  );
}

