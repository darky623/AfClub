import React from "react";
import s from "./BtnCounter.module.scss";

const BtnCounter = ({ data }) => {
  const count = data || 0;

  if (count === 0) {
    return null;
  }

  return <span className={s.btn_counter}>{count}</span>;
};

export default BtnCounter;
