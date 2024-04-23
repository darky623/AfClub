import React from "react";
import { CopyOutlined } from "@ant-design/icons";
import s from "./DeletBtn.module.scss";

const CopyBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.delete_btn}>
      <CopyOutlined />
    </button>
  );
};

export default CopyBtn;
