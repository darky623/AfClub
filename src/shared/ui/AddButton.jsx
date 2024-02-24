import React from "react";
import s from "./AddButton.module.scss";

const addButoon = ({ onClick, mt = "25px" }) => {
  const buttonStyle = {
    marginTop: mt,
  };

  return (
    <button onClick={onClick} className={s.add_button} style={buttonStyle}>
      +
    </button>
  );
};

export default addButoon;
