import { useEffect, useState } from 'react';

const useIFMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const ismobile = global?.window?.matchMedia('(max-width: 768px)').matches;
    setIsMobile(ismobile);
  }, []);

  return isMobile;
};

export default useIFMobile;

export const isPhone = global?.window?.matchMedia('(max-width: 425px)').matches;
