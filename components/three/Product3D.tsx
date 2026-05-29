'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * A product photo presented as a rotating 3D object.
 *
 * The image is mapped onto the front face of a thin slab (so a sliver of
 * edge gives real depth), which gently swivels like a turntable, floats,
 * and parallaxes toward the cursor. A full 360° spin is avoided on purpose —
 * these are single front-facing photos, so we keep the front toward camera.
 */

const ASPECT = 1500 / 2000 // product photos are portrait 3:4
const HEIGHT = 2.4
const WIDTH = HEIGHT * ASPECT
const DEPTH = 0.16

function Slab({ image, reduced }: { image: string; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture(image)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  // Image on the front face (+Z = index 4); soft white on the rest.
  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#f3f2ee', roughness: 0.6, metalness: 0 })
    const front = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0 })
    return [edge, edge, edge, edge, front, edge]
  }, [texture])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const swivel = reduced ? 0 : Math.sin(t * 0.6) * 0.32
    const pointer = reduced ? 0 : state.pointer.x * 0.25
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, swivel + pointer, 0.08)
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      reduced ? 0 : -state.pointer.y * 0.12,
      0.08
    )
    ref.current.position.y = reduced ? 0 : Math.sin(t * 1.1) * 0.05
  })

  return (
    <mesh ref={ref} material={materials}>
      <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
    </mesh>
  )
}

export default function Product3D({ image, className }: { image: string; className?: string }) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4.2], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-4, 2, 2]} intensity={0.5} color="#3A7D3C" />
      <Suspense fallback={null}>
        <Slab image={image} reduced={reduced} />
      </Suspense>
    </Canvas>
  )
}
