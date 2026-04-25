'use client';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

export default function ParticlesBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: '#A855F7' },
          links: {
            color: '#A855F7',
            distance: 130,
            enable: true,
            opacity: 0.08,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: true,
            outModes: { default: 'bounce' },
          },
          number: { 
            density: { enable: true, area: 1000 }, 
            value: 60 
          },
          opacity: { value: { min: 0.1, max: 0.3 } },
          size: { value: { min: 0.5, max: 1.5 } },
        },
        detectRetina: true,
      }}
    />
  );
}
