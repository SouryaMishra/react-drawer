import { useState, useEffect } from "react";

export const useTransition = (isOpen: boolean, delay: number) => {
  const [isTransitionEnd, setIsTransitionEnd] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      setIsTransitionEnd(true);
      return;
    }
    if (!isOpen && isTransitionEnd)
      timeout = setTimeout(() => setIsTransitionEnd(false), delay);

    return () => clearTimeout(timeout);
  }, [isOpen, isTransitionEnd, delay]);

  return isTransitionEnd;
};
