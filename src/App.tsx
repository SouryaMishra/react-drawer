import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent
} from "react";
import { createPortal } from "react-dom";
import Drawer from "./components/Drawer";
import { PositionType } from "./shared/model";
import { useKeyUp } from "./shared/useKeyup";
import "./App.css";

function App() {
  const [isOpen, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);

  const [position, setPosition] = useState<PositionType>("left");

  const onClose = () => setOpen(false);

  useKeyUp(onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow--hidden");
      return;
    }
    document.body.classList.remove("overflow--hidden");
  }, [isOpen]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value as PositionType);
  };

  return (
    <div className="app">
      <button onClick={() => setOpen(true)}>Show My Drawer</button>

      <form className="form">
        <div>
          <input
            id="left"
            type="radio"
            name="position"
            value="left"
            checked={position === "left"}
            onChange={onChange}
          />

          <label htmlFor="left">Left</label>
        </div>
        <div>
          <input
            id="right"
            type="radio"
            name="position"
            value="right"
            checked={position === "right"}
            onChange={onChange}
          />
          <label htmlFor="right">Right</label>
        </div>
        <div>
          <input
            id="top"
            type="radio"
            name="position"
            value="top"
            checked={position === "top"}
            onChange={onChange}
          />
          <label htmlFor="top">Top</label>
        </div>
        <div>
          <input
            id="bottom"
            type="radio"
            name="position"
            value="bottom"
            checked={position === "bottom"}
            onChange={onChange}
          />
          <label htmlFor="bottom">Bottom</label>
        </div>
      </form>

      {createPortal(
        <Drawer onClose={onClose} position={position} isOpen={isOpen}>
          <h1>Hello World</h1>
        </Drawer>,
        document.getElementById("drawer") as HTMLElement
      )}
    </div>
  );
}

export default App;
