import React from "react";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import s from "./DeletBtn.module.scss";

const DeletBtn = ({ onClick, rightOutlined = false }) => {
  return (
    <button onClick={onClick} className={s.delete_btn}>
      {rightOutlined ? <RightOutlined /> : <DeleteOutlined />}
    </button>
  );
};

export default DeletBtn;
