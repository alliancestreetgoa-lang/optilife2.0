import { LegalPage } from '@/components/sections/LegalPage'

export default function ReturnsPolicyPage() {
  return (
    <LegalPage
      title="Returns Policy"
      sections={[
        {
          title: '30-Day Money Back Guarantee',
          content: (
            <p>We stand behind our products. If you are not satisfied with your purchase for any reason, you may return it within 30 days of delivery for a full refund.</p>
          ),
        },
        {
          title: 'How to Return',
          content: (
            <p>Contact our team at customercare@optilifewellbeing.co.uk with your order number and reason for return. We will provide a prepaid returns label.</p>
          ),
        },
        {
          title: 'Conditions',
          content: (
            <p>Products must be returned in their original packaging. Opened products are eligible for return under our satisfaction guarantee provided at least 50% of the product remains.</p>
          ),
        },
        {
          title: 'Refunds',
          content: (
            <p>Refunds are processed within 5–7 business days of receiving your return and will be issued to your original payment method.</p>
          ),
        },
      ]}
    />
  )
}
