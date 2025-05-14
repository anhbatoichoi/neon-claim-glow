
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
  const colors = ["#FF9500", "#FF00FF", "#8B5CF6", "#00fff5", "#ff6bcb"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create multiple particles at once for a denser effect
      for (let i = 0; i < 3; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 10; // Larger particles
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5; // Less upward bias for more natural movement
        
        const newParticle = {
          x: e.clientX + (Math.random() - 0.5) * 5, // Slight position variation
          y: e.clientY + (Math.random() - 0.5) * 5,
          size,
          color: randomColor,
          opacity: 0.7, // Start slightly more transparent
          speedX,
          speedY,
          id: Date.now() + Math.random(),
        };

        setParticles((prevParticles) => [...prevParticles, newParticle]);
      }
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
            opacity: particle.opacity - 0.005, // Slower fade for longer trails
            size: particle.size * 1.01 // Grow slightly for smoke effect
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
    if (particles.length > 100) { // Increased max particles for denser effect
      setParticles(prev => prev.slice(prev.length - 100));
    }
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full cursor-trail"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
            filter: `blur(${particle.size / 1.5}px)`, // More blur for smoke effect
            mixBlendMode: "screen", // Better color blending like in the image
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`, // Stronger glow
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
