import { LegalPage } from '@/components/sections/LegalPage'

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="May 2026"
      sections={[
        {
          title: 'Use of This Website',
          content: (
            <p>By accessing optilifewellbeing.co.uk, you agree to these terms. The site is intended for UK residents aged 18 and over.</p>
          ),
        },
        {
          title: 'Products & Descriptions',
          content: (
            <p>We make every effort to ensure product descriptions are accurate. Our supplements are food supplements and are not intended to diagnose, treat, cure, or prevent any disease.</p>
          ),
        },
        {
          title: 'Pricing',
          content: (
            <p>All prices are in GBP and include VAT where applicable. We reserve the right to change prices without notice.</p>
          ),
        },
        {
          title: 'Intellectual Property',
          content: (
            <p>All content on this website including text, images, and logos is the property of Optilifewellbeing and may not be reproduced without permission.</p>
          ),
        },
        {
          title: 'Governing Law',
          content: (
            <p>These terms are governed by the laws of England and Wales.</p>
          ),
        },
      ]}
    />
  )
}
