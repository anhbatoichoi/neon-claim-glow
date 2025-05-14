
import { useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
  id: number;
}

const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const colors = ["#00fff5", "#ff00ff", "#8B5CF6", "#ff6bcb", "#C4B5FD"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 6 + 3;
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2 - 1; // Slightly bias upward
      
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        size,
        color: randomColor,
        opacity: 0.8,
        speedX,
        speedY,
        id: Date.now() + Math.random(),
      };

      setParticles((prevParticles) => [...prevParticles, newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            opacity: particle.opacity - 0.01,
            size: particle.size * 0.99
          }))
          .filter(particle => particle.opacity > 0)
      );
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [particles]);

  // Limit max particles for performance
  useEffect(() => {
    if (particles.length > 50) {
      setParticles(prev => prev.slice(prev.length - 50));
    }
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
