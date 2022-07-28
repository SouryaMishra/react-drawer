import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Drawer from "./components/Drawer";
import { PositionType } from "./shared/model";

import "./App.css";

function App() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionType>("left");

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow--hidden");
      return;
    }
    document.body.classList.remove("overflow--hidden");
  }, [isOpen]);

  const onOpen = () => {
    const { value } = formRef.current?.elements.namedItem(
      "position"
    ) as RadioNodeList;
    setPosition(value as PositionType);
    setOpen(true);
  };

  const onClose = () => {
    buttonRef.current?.focus();
    setOpen(false);
  };

  return (
    <div className="app">
      <button ref={buttonRef} onClick={onOpen}>
        Show My Drawer
      </button>

      <form className="form" ref={formRef}>
        <div>
          <input
            id="left"
            type="radio"
            name="position"
            value="left"
            defaultChecked
          />
          <label htmlFor="left">Left</label>
        </div>
        <div>
          <input id="right" type="radio" name="position" value="right" />
          <label htmlFor="right">Right</label>
        </div>
        <div>
          <input id="top" type="radio" name="position" value="top" />
          <label htmlFor="top">Top</label>
        </div>
        <div>
          <input id="bottom" type="radio" name="position" value="bottom" />
          <label htmlFor="bottom">Bottom</label>
        </div>
      </form>

      {createPortal(
        <Drawer onClose={onClose} position={position} isOpen={isOpen}>
          <>
            <h1>Hello World</h1>
            <div>
              <input type="text" />
            </div>
          </>
        </Drawer>,
        document.getElementById("drawer") as HTMLElement
      )}
    </div>
  );
}

export default App;
