'use client';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from 'tsparticles-engine';

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
          color: { value: '#00E5FF' },
          links: {
            color: '#00E5FF',
            distance: 120,
            enable: true,
            opacity: 0.12,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            outModes: { default: 'bounce' },
          },
          number: { density: { enable: true, area: 900 }, value: 70 },
          opacity: { value: 0.4 },
          size: { value: { min: 0.5, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
}
