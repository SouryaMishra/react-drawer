import { ReactNode } from "react";
import classNames from "../shared/classNames";
import { PositionType } from "../shared/model";
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
  return (
    <>
      {isOpen && (
        <div className={classNames("drawer__container", className, position)}>
          <div className={`drawer__content`}>
            <button onClick={onClose}>Close</button>
            <div>{children}</div>
          </div>

          <div className="drawer__overlay" onClick={onClose}></div>
        </div>
      )}
    </>
  );
};

export default Drawer;
