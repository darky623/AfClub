import React from "react";
import Image from "next/image";
import s from "./EditingBtn.module.scss";

const EditingBtn = ({onClick}) => {
  return (
    <button onClick={onClick} className={s.editing_btn}>
      <Image src={"/editing.svg"} width={14} height={14} alt="edited" />
    </button>
  );
};

export default EditingBtn;
