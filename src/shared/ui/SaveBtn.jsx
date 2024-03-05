import React, { useState } from "react";
import s from "./SaveBtn.module.scss";

const SaveBtn = ({
  analytic = false,
  nameBtn,
  onClick,
  background = "54B54C",
  color = "#fff",
}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    setX(offsetX);
    setY(offsetY);
  };

  return (
    <div
      className={s.save_btn}
      style={analytic ? { position: "absolute" } : {}}
    >
      <button
        href="#"
        id="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        style={{
          "--mouse-x": `${x}px`,
          "--mouse-y": `${y}px`,
          backgroundColor: background,
          color: color,
        }}
      >
        {nameBtn}
      </button>
    </div>
  );
};

export default SaveBtn;
