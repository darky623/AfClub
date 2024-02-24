import React from "react";
import s from "./NoInform.module.scss";

const NoInform = ({ text }) => {
  let message;

  if (text === "error") {
    message = "Упс, что-то пошло не так, пожалуйста перезагрузите страницу";
  }

  if (text === "empty") {
    message = "К сожалению, для Вас в этом разделе ничего не найдено";
  }

  return (
    <div className={s.container}>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>!</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>@</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <br />
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>#</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <span className={s.particle}>/</span>
      <article className={s.content}>{message}</article>
    </div>
  );
};

export default NoInform;
