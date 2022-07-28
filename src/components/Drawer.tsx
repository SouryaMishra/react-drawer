import { ReactNode, useEffect } from "react";
import classNames from "../shared/classNames";
import { PositionType } from "../shared/model";
import { useKeyUp } from "../shared/useKeyup";
import { useTransition } from "../shared/useTransition";
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

  useEffect(
    () =>
      document.documentElement.style.setProperty(
        "--transition-delay",
        `${delay}ms`
      ),
    [delay]
  );

  return (
    <>
      {(isOpen || isTransitionEnd) && (
        <div
          className={classNames(
            "drawer__container",
            className,
            isOpen ? "open" : ""
          )}
        >
          <div
            className={classNames(
              "drawer__content",
              position,
              isOpen ? "open" : "",
              isTransitionEnd ? "slide" : ""
            )}
          >
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
