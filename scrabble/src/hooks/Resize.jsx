import { useState, useEffect } from 'react';

const useScreenSize = (threshold) => {
  const [isBelowThreshold, setIsBelowThreshold] = useState(window.screen.width < threshold);

  useEffect(() => {
    const handleResize = () => {
      setIsBelowThreshold(window.screen.width < threshold);
    };

    //set initial value on page load
    handleResize();

    //add event listener for resize
    window.addEventListener('resize', handleResize);

    //clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  return isBelowThreshold;
};

export default useScreenSize;