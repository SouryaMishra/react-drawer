import { ReactNode, useEffect, useRef } from "react";
import classNames from "../shared/classNames";
import { PositionType } from "../shared/model";
import { useKeyUp } from "../shared/useKeyup";
import { useTransition } from "../shared/useTransition";
import { getFocusableElements } from "../shared/util";
import "./styles.css";

export type DrawerProps = {
  className?: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  position?: PositionType;
  delay?: number;
};

const Drawer = ({
  isOpen,
  children,
  onClose,
  position = "left",
  className = "",
  delay = 300
}: DrawerProps) => {
  useKeyUp(onClose);

  const isTransitionEnd = useTransition(isOpen, delay);

  const drawerContentRef = useRef<HTMLDivElement | null>(null);
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      document.documentElement.style.setProperty(
        "--transition-delay",
        `${delay}ms`
      ),
    [delay]
  );

  useEffect(() => {
    if (!drawerContentRef.current || !isTransitionEnd) return;

    const focusableElements = getFocusableElements(drawerContentRef.current);

    firstFocusableElement.current = focusableElements[0];
    lastFocusableElement.current =
      focusableElements[focusableElements.length - 1];

    checkBoxRef.current?.focus();

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
  }, [isTransitionEnd]);

  return (
    <>
      {(isOpen || isTransitionEnd) && (
        <div
          aria-hidden={!isOpen}
          className={classNames(
            "drawer__container",
            className,
            isOpen ? "open" : ""
          )}
        >
          <div
            role="dialog"
            ref={drawerContentRef}
            className={classNames(
              "drawer__content",
              position,
              isOpen ? "open" : "",
              isTransitionEnd ? "slide" : ""
            )}
          >
            <input
              aria-hidden="true"
              className="hidden"
              ref={checkBoxRef}
              type="checkbox"
              tabIndex={-1}
            />
            <button onClick={onClose}>Close</button>
            <div>{children}</div>
          </div>
          <div className={classNames("drawer__overlay")} onClick={onClose} />
        </div>
      )}
    </>
  );
};

export default Drawer;
