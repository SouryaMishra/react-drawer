import { ReactNode } from "react";
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
};

const Drawer = ({
  isOpen,
  children,
  onClose,
  position = "left",
  className = ""
}: DrawerProps) => {
  useKeyUp(onClose);

  const isTransitionEnd = useTransition(isOpen, 300);

  return (
    <>
      {(isOpen || isTransitionEnd) && (
        <div className={classNames("drawer__container", className)}>
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
          <div
            className={classNames("drawer__overlay", isOpen ? "open" : "")}
            onClick={onClose}
          />
        </div>
      )}
    </>
  );
};

export default Drawer;
