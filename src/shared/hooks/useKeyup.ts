import { useEffect } from "react";

export const useKeyUp = (callback: Function) => {
  useEffect(() => {
    const keyUpHandler = (e: any) => {
      if (e.key === "Escape") callback();
    };
    document.addEventListener("keyup", keyUpHandler);
    return () => document.removeEventListener("keyup", keyUpHandler);
  }, [callback]);
};
