import { useState } from 'react';

const useSetNav = (status?: boolean) => {
  const [open, setOpen] = useState(false);

  const onSetNav = () => {
    if (status) return setOpen(status);
    setOpen(!open);
  };
  return { open, onSetNav };
};
export default useSetNav;
