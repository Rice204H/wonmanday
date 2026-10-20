const petals = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 17 + 8) % 100}%`,
  delay: `${-i * 3.7}s`,
  duration: `${17 + (i % 4) * 4}s`,
  size: `${7 + (i % 3) * 3}px`,
  drift: `${i % 2 ? -85 : 85}px`,
}));

export default function FallingPetals() {
  return (
    <div className="falling-petals" aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={i}
          style={{
            left: petal.left,
            width: petal.size,
            height: `calc(${petal.size} * 1.45)`,
            "--delay": petal.delay,
            "--duration": petal.duration,
            "--drift": petal.drift,
          }}
        />
      ))}
    </div>
  );
}
