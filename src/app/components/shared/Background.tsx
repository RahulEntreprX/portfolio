export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-white/60" />
      <div className="absolute inset-0 bg-grid opacity-60 animate-grid-pan" />
      <div className="absolute inset-0 bg-radial-fade" />
    </div>
  );
}

