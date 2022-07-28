import { ReactNode, useEffect, useState } from "react";
import classNames from "../shared/classNames";
import { PositionType } from "../shared/model";
import { useKeyUp } from "../shared/useKeyup";
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
  const [isTransitionEnd, setIsTransitionEnd] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setIsTransitionEnd(true);
  }, [isOpen]);

  const onCloseDrawer = () => {
    setIsTransitionEnd(false);
    setTimeout(onClose, 300);
  };

  useKeyUp(onCloseDrawer);

  return (
    <>
      {isOpen && (
        <div className={classNames("drawer__container", className)}>
          <div
            className={classNames(
              "drawer__content",
              position,
              isTransitionEnd ? "slide" : ""
            )}
          >
            <button onClick={onCloseDrawer}>Close</button>
            <div>{children}</div>
          </div>
          <div className="drawer__overlay" onClick={onCloseDrawer} />
        </div>
      )}
    </>
  );
};

export default Drawer;
