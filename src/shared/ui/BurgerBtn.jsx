import React, { useState, useEffect } from "react";
import s from "./BurgerBtn.module.scss";

const BurgerBtn = ({ isActive, onClick }) => {
  const [activeState, setActiveState] = useState(isActive);

  const toggleActive = () => {
    setActiveState(!activeState);
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    setActiveState(isActive);
  }, [isActive]);

  return (
    <svg
      className={`${s.ham} ${s.hamRotate180} ${s.ham1} ${
        activeState ? s.active : ""
      }`}
      viewBox="0 0 100 100"
      width="20"
      height="20"
      onClick={toggleActive}
    >
      <path
        className={`${s.line} ${s.top}`}
        d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429"
      />
      <path className={`${s.line} ${s.middle}`} d="m 70,50 h -40" />
      <path
        className={`${s.line} ${s.bottom}`}
        d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429"
      />
    </svg>
  );
};

export default BurgerBtn;