import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { MissionBanner } from '@/components/sections/MissionBanner'
import { Testimonials } from '@/components/sections/Testimonials'
import { PromoVideo } from '@/components/sections/PromoVideo'
import { CtaBand } from '@/components/sections/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhyChooseUs />
      <FeaturedProducts />
      <MissionBanner />
      <Testimonials />
      <PromoVideo />
      <CtaBand />
    </>
  )
}
