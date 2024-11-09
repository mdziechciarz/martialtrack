// useRipple.js
import {useCallback, useState} from 'react';

export const useRipple = (duration = 600, color = 'rgba(0, 0, 0, 0.3)') => {
  const [ripples, setRipples] = useState([]);

  const createRipple = useCallback(
    event => {
      const container = event.currentTarget.getBoundingClientRect();
      const size = Math.max(container.width, container.height);
      const x = event.clientX - container.left - size / 2;
      const y = event.clientY - container.top - size / 2;

      const newRipple = {
        x,
        y,
        size,
        key: Date.now(),
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, duration);
    },
    [duration]
  );

  const ripplesElements = ripples.map(ripple => (
    <span
      key={ripple.key}
      style={{
        position: 'absolute',
        left: ripple.x,
        top: ripple.y,
        width: ripple.size,
        height: ripple.size,
        backgroundColor: color,
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: `ripple-effect ${duration}ms linear`,
        pointerEvents: 'none',
      }}
    />
  ));

  return {ripples: ripplesElements, createRipple};
};
