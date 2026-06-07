import { LegalPage } from '@/components/sections/LegalPage'

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      sections={[
        {
          title: 'Delivery Information',
          content: (
            <p>We currently ship to addresses within the United Kingdom. Orders are processed within 1–2 business days.</p>
          ),
        },
        {
          title: 'Delivery Times',
          content: (
            <p>Standard delivery (3–5 business days) is available for all UK orders. Express delivery options may be available at checkout.</p>
          ),
        },
        {
          title: 'Shipping Costs',
          content: (
            <p>Free standard shipping on orders over £30. A flat rate of £2.99 applies to orders below this threshold.</p>
          ),
        },
        {
          title: 'Tracking',
          content: (
            <p>Once your order has been dispatched, you will receive a confirmation email with tracking details.</p>
          ),
        },
        {
          title: 'Contact',
          content: (
            <p>For any shipping enquiries, please contact us at customercare@optilifewellbeing.co.uk or call 020 8264 9244.</p>
          ),
        },
      ]}
    />
  )
}
