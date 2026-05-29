'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Realistic human DNA double helix, "regenerating".
 *
 * - Smooth phosphate backbones built as tube geometry along a helix curve.
 * - Capsule base-pair rungs joining the two strands.
 * - A warm-gold energy front travels up the helix on a loop (the
 *   "regeneration" pulse): a moving point light + additive glow sprite +
 *   per-rung emissive band — faked bloom that keeps the canvas transparent.
 * - Floating particles for depth.
 *
 * Brand palette: green strands, gold base pairs + glow.
 */

const TURNS = 2.4
const RADIUS = 1.2
const HEIGHT = 8
const RUNGS = 26

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private strand: number) {
    super()
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * TURNS * Math.PI * 2 + this.strand * Math.PI
    return target.set(
      Math.cos(angle) * RADIUS,
      (t - 0.5) * HEIGHT,
      Math.sin(angle) * RADIUS
    )
  }
}

function strandPoint(t: number, strand: number) {
  const angle = t * TURNS * Math.PI * 2 + strand * Math.PI
  return new THREE.Vector3(
    Math.cos(angle) * RADIUS,
    (t - 0.5) * HEIGHT,
    Math.sin(angle) * RADIUS
  )
}

/** Soft radial-gradient texture used as an additive glow sprite. */
function makeGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,232,160,1)')
  g.addColorStop(0.3, 'rgba(224,172,64,0.55)')
  g.addColorStop(1, 'rgba(224,172,64,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function DNA({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const rungsGroup = useRef<THREE.Group>(null)
  const core = useRef<THREE.Group>(null)

  const glowTex = useMemo(() => makeGlowTexture(), [])
  const curves = useMemo(() => [new HelixCurve(0), new HelixCurve(1)], [])
  const rungs = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0)
    return Array.from({ length: RUNGS }, (_, i) => {
      const t = i / (RUNGS - 1)
      const a = strandPoint(t, 0)
      const b = strandPoint(t, 1)
      const dir = new THREE.Vector3().subVectors(b, a)
      return {
        t,
        mid: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
        len: dir.length(),
        quat: new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize()),
      }
    })
  }, [])

  const autoY = useRef(0)
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // Slow auto-drift plus strong pointer steering — turns toward the cursor.
    if (!reduced) autoY.current += delta * 0.18
    const targetY = autoY.current + (reduced ? 0 : state.pointer.x * 0.7)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.07)
    const targetX = (reduced ? 0 : -state.pointer.y * 0.35) + 0.12
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.07)

    // Regeneration front travels 0 → 1 up the helix, then loops.
    const f = reduced ? 0.5 : (state.clock.elapsedTime * 0.12) % 1

    if (core.current) core.current.position.y = (f - 0.5) * HEIGHT

    rungsGroup.current?.children.forEach((child) => {
      const mesh = child as THREE.Mesh
      let d = (mesh.userData.t as number) - f
      if (d > 0.5) d -= 1 // wrap for a seamless loop
      if (d < -0.5) d += 1
      const band = Math.exp(-((d * 7) ** 2)) // bright near the front
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.25 + band * 3
      mesh.scale.setScalar(1 + band * 0.25)
    })
  })

  return (
    <group ref={group} rotation={[0.12, 0, 0.15]} position={[0, -0.8, 0]} scale={1.05}>
      {/* Backbone strands — pale, glossy: pops against both green and cream */}
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 240, 0.16, 18, false]} />
          <meshStandardMaterial
            color="#2C5F2E"
            emissive="#2C5F2E"
            emissiveIntensity={0.15}
            roughness={0.28}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Base-pair rungs — alternating brand green / gold */}
      <group ref={rungsGroup}>
        {rungs.map((r, i) => (
          <mesh key={i} position={r.mid} quaternion={r.quat} userData={{ t: r.t }}>
            <capsuleGeometry args={[0.085, Math.max(r.len - 0.17, 0.01), 8, 14]} />
            <meshStandardMaterial
              color={i % 2 ? '#C9952A' : '#2C5F2E'}
              emissive={i % 2 ? '#E0AC40' : '#3A7D3C'}
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.5}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Travelling regeneration glow */}
      <group ref={core}>
        <pointLight color="#FFE08A" intensity={6} distance={6} />
        <sprite scale={[3, 3, 3]}>
          <spriteMaterial
            map={glowTex}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            transparent
            opacity={0.9}
          />
        </sprite>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFE08A" emissiveIntensity={4} toneMapped={false} />
        </mesh>
      </group>

      {/* Floating particles */}
      <Sparkles count={70} scale={[5, 9, 5]} size={3} speed={reduced ? 0 : 0.4} color="#E0AC40" opacity={0.7} />
    </group>
  )
}

export default function HeroScene() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 5]} intensity={2} />
      <directionalLight position={[-5, 2, 4]} intensity={1} color="#E0AC40" />
      <pointLight position={[-4, -2, 3]} intensity={1} color="#3A7D3C" />
      <DNA reduced={reduced} />
    </Canvas>
  )
}
