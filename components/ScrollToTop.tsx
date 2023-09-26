import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything, it's just for scrolling
};

export default ScrollToTop;
