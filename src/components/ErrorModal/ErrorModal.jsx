import Image from "next/image";
import React from "react";
import s from "./ErrorModal.module.scss";

const ErrorModal = ({ onClose, visible }) => {
  const modalClass = visible ? s.errorVisible : s.error;

  return (
    <div className={modalClass}>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>4</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <span className={s.particle}>0</span>
      <article className={s.content}>
        <p>
          Ошибка авторизации <span> 404</span>
        </p>
        <p>Пожалуйста попробуйте снова.</p>
        <button onClick={onClose}>
          <Image src={"/backtick.png"} width={15} height={15} alt="tick" />
          Вернуться назад
        </button>
      </article>
    </div>
  );
};

export default ErrorModal;
