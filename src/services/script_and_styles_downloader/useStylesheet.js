import { useState, useEffect } from 'react';

const useStylesheet = (href) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => setLoaded(true);
    link.onerror = () => setLoaded(false);

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href]);

  return loaded;
};

export default useStylesheet;
