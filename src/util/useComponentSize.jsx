import { useState, useEffect } from 'react';

export default function useComponentSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;

    if (node) {
      const { width, height } = node.getBoundingClientRect();
      setSize({ width, height });
    }

    function handleResize() {
      const { width, height } = node.getBoundingClientRect();
      setSize({ width, height });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return size;
}
