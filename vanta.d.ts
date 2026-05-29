declare module 'vanta/dist/vanta.fog.min' {
  const effect: (opts: Record<string, unknown>) => { destroy?: () => void }
  export default effect
}
