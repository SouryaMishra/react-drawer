import { MutableRefObject, useEffect, useRef } from "react";
import { getFocusableElements } from "../utils";

export type UseFocusTrapArgsType = {
  isOpen: boolean;
  containerToTrapFocusWithin: MutableRefObject<HTMLElement | null>;
  elementToFocusWhenOpened: MutableRefObject<HTMLElement | null>;
};

export const useFocusTrap = ({
  isOpen,
  containerToTrapFocusWithin,
  elementToFocusWhenOpened,
}: UseFocusTrapArgsType) => {
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerToTrapFocusWithin.current || !isOpen) return;

    const focusableElements = getFocusableElements(
      containerToTrapFocusWithin.current
    );

    firstFocusableElement.current = focusableElements[0];
    lastFocusableElement.current =
      focusableElements[focusableElements.length - 1];

    elementToFocusWhenOpened.current?.focus();

    const keyDownListener = (e: any) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement.current) {
            e.preventDefault();
            lastFocusableElement.current?.focus();
          }
          return;
        }
        if (document.activeElement === lastFocusableElement.current) {
          e.preventDefault();
          firstFocusableElement.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", keyDownListener);
    return () => document.removeEventListener("keydown", keyDownListener);
  }, [isOpen, containerToTrapFocusWithin, elementToFocusWhenOpened]);
};
