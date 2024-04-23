import React from "react";
import Image from "next/image";
import s from "./EditingBtn.module.scss";

const CopyBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.editing_btn}>
      <Image src={"/copy.svg"} width={14} height={14} alt="copy" />
    </button>
  );
};

export default CopyBtn;
