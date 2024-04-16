import React from "react";
import s from "./ClientLinks.module.scss";
import Link from "next/link";
import Image from "next/image";
import BtnCounter from "../../shared/counter/BtnCounter";

const ClientLinks = () => {
  return (
    <div className={s.clients_links}>
      <p className={s.clients_link}>
        Услуги <span className={s.beta}>( Beta версия )</span>
      </p>
      <div className={s.clients_transitions}>
        <Link href={"/Experts/Experts"}>
          <BtnCounter />
          Эксперты
          <Image src={"/tick.png"} width={17} height={17} alt="tick" />
        </Link>
        <Link href={"/TargetGroups/TargetGroups"}>
          Целевые группы
          <Image src={"/tick.png"} width={17} height={17} alt="tick" />
        </Link>
        <Link href={"/QuestionnaireClient/QuestionnaireClient"}>
          Моя анкета
          <Image src={"/tick.png"} width={17} height={17} alt="tick" />
        </Link>
        <div className={s.wrapper_img}>
          <Image
            src="/Logo.PNG"
            alt="Logo"
            className={s.img}
            width={320}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientLinks;
