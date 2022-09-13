import { useState } from 'react';

const useSetNav = () => {
  const [open, setOpen] = useState(false);
  const onSetNav = () => {
    setOpen(!open);
  };
  return { open, onSetNav };
};
export default useSetNav;
