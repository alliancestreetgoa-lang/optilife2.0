import type { Handler } from '@netlify/functions'
import Stripe from 'stripe'
import { buildLineItems, shippingOption, validateItems } from '../../lib/checkout-core'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Stripe is not configured' }) }
  }

  let items
  try {
    const body = JSON.parse(event.body ?? '{}')
    items = validateItems(body.items)
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: (err as Error).message }) }
  }

  const siteUrl =
    process.env.SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.URL ||
    (event.headers.origin ?? 'http://localhost:8888')

  const stripe = new Stripe(secret)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: buildLineItems(items),
      shipping_options: [shippingOption(items)],
      shipping_address_collection: { allowed_countries: ['GB'] },
      success_url: `${siteUrl}/shop/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/`,
    })
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) }
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: (err as Error).message }) }
  }
}

export { handler }
