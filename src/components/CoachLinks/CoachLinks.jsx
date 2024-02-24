import React from "react";
import s from "./CoachLinks.module.scss";
import Link from "next/link";
import Image from "next/image";
import BtnCounter from "../../shared/counter/BtnCounter";

const CoachLinks = ({ coachData, status = "expert" }) => {
  return (
    <div className={s.coach_links}>
      <Link href={"/Wards/Wards"}>
        <BtnCounter data={coachData && coachData.q_members} />
        Подопечные
        <Image src={"/tick.png"} width={17} height={17} alt="tick" />
      </Link>
      {status === "expert" ? (
        <>
          <Link href={"/Schedule/Schedule"}>
            <BtnCounter data={coachData && coachData.q_purchases} />
            График
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />
          </Link>
          <Link href={"/Groups/Groups"}>
            <BtnCounter data={coachData && coachData.q_groups} />
            Группы
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />
          </Link>
          <Link href={"/Tariffs/Tariffs"}>
            Услуги
            <Image src={"/tick.png"} width={17} height={17} alt="tick" />
          </Link>
        </>
      ) : null}
      <Link href={"/Templates/Templates"}>
        Методики
        <Image src={"/tick.png"} width={17} height={17} alt="tick" />
      </Link>
      {status === "expert" ? (
        <Link href={"/Finance/Finance"}>
          Финансы
          <Image src={"/tick.png"} width={17} height={17} alt="tick" />
        </Link>
      ) : null}
    </div>
  );
};

export default CoachLinks;
