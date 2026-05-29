'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const GREEN_DARK = '#1E4220'
const GREEN = '#2C5F2E'
const GOLD = '#C9952A'

type Product = { name: string; dose: string; count: string }

/** Brand label drawn to a canvas (white sticker + logo + name + swoosh). */
function makeLabelTexture(p: Product) {
  const W = 2048
  const H = 1024
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')!
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  const cx = W / 2

  const draw = (logo?: HTMLImageElement) => {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (logo) {
      const lw = 430
      const lh = (lw * logo.height) / logo.width
      ctx.drawImage(logo, cx - lw / 2, 150, lw, lh)
    }

    // Product name
    ctx.fillStyle = GREEN_DARK
    ctx.font = 'bold 120px Georgia, "Times New Roman", serif'
    const lines = p.name.toUpperCase().split('\n')
    let y = 470
    lines.forEach((ln, i) => ctx.fillText(ln, cx, y + i * 122))
    y += (lines.length - 1) * 122

    if (p.dose) {
      ctx.fillStyle = GOLD
      ctx.font = '600 92px Georgia, serif'
      ctx.fillText(p.dose, cx, y + 110)
    }

    // Swoosh
    const sy = p.dose ? y + 210 : y + 130
    ctx.lineCap = 'round'
    ctx.lineWidth = 16
    ctx.strokeStyle = GREEN
    ctx.beginPath()
    ctx.moveTo(cx - 320, sy)
    ctx.bezierCurveTo(cx - 120, sy - 46, cx + 120, sy + 36, cx + 320, sy - 12)
    ctx.stroke()
    ctx.strokeStyle = GOLD
    ctx.beginPath()
    ctx.moveTo(cx - 320, sy + 26)
    ctx.bezierCurveTo(cx - 120, sy - 20, cx + 120, sy + 60, cx + 320, sy + 14)
    ctx.stroke()

    // Count + footer
    ctx.fillStyle = GREEN_DARK
    ctx.font = '600 86px Georgia, serif'
    ctx.fillText(p.count, cx, sy + 150)
    ctx.fillStyle = GOLD
    ctx.font = '600 50px Arial, sans-serif'
    ctx.fillText('FOOD SUPPLEMENT', cx, sy + 240)

    tex.needsUpdate = true
  }

  draw()
  const img = new window.Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => draw(img)
  img.src = `${BP}/optilife-logo.png`
  return tex
}

function Bottle({ product, speed = 0.4 }: { product: Product; speed?: number }) {
  const group = useRef<THREE.Group>(null)
  const labelTex = useMemo(() => makeLabelTexture(product), [product])

  const bodyGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, -1.2),
      new THREE.Vector2(0.62, -1.2),
      new THREE.Vector2(0.64, -1.06),
      new THREE.Vector2(0.64, 0.52),
      new THREE.Vector2(0.6, 0.74),
      new THREE.Vector2(0.42, 0.96),
      new THREE.Vector2(0.3, 1.06),
      new THREE.Vector2(0.28, 1.2),
    ]
    return new THREE.LatheGeometry(pts, 96)
  }, [])

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed
  })

  return (
    <group ref={group} rotation={[0.04, 0, 0]}>
      {/* Glossy white body */}
      <mesh geometry={bodyGeo} castShadow>
        <meshStandardMaterial color="#f6f6f3" roughness={0.16} metalness={0.04} envMapIntensity={1.3} />
      </mesh>
      {/* Wrapped label */}
      <mesh position={[0, -0.12, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.648, 0.648, 1.08, 96, 1, true]} />
        <meshStandardMaterial map={labelTex} roughness={0.5} metalness={0} side={THREE.DoubleSide} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 1.17, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.34, 64]} />
        <meshStandardMaterial color="#d9ccc5" roughness={0.55} metalness={0.04} />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.335, 0.335, 0.04, 64]} />
        <meshStandardMaterial color="#cdbfb8" roughness={0.55} />
      </mesh>
    </group>
  )
}

const PRODUCTS: { product: Product; x: number; s: number; speed: number }[] = [
  { product: { name: 'TURMERIC', dose: '400 mg', count: '30 capsules' }, x: -1.7, s: 0.8, speed: 0.45 },
  { product: { name: 'MULTIVITAMIN\n& MINERALS', dose: '', count: '30 tablets' }, x: 0, s: 0.95, speed: 0.38 },
  { product: { name: 'ASHWAGANDHA', dose: '1300 mg', count: '30 capsules' }, x: 1.7, s: 0.8, speed: 0.5 },
]

export default function HeroBottles() {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 10], fov: 30 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 7, 6]} intensity={1.7} />
      <directionalLight position={[-6, 2, 3]} intensity={0.7} color="#eef3ea" />
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 5]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.1} position={[-5, 1, 3]} scale={[3, 7, 1]} />
        <Lightformer intensity={1.1} position={[5, 1, 3]} scale={[3, 7, 1]} />
      </Environment>
      {PRODUCTS.map((b) => (
        <group key={b.product.name} position={[b.x, -0.1, 0]} scale={b.s}>
          <Bottle product={b.product} speed={b.speed} />
        </group>
      ))}
      <ContactShadows position={[0, -1.35, 0]} opacity={0.32} scale={9} blur={2.4} far={3} />
    </Canvas>
  )
}
