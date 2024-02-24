import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGetLoginQuery } from "../../redux/api";
import BurgerMenu from "../Burger/BurgerMenu";
import s from "./Header.module.scss";

const Header = () => {
  const [token, setToken] = useState(null);
  const { data, isError } = useGetLoginQuery(token);
  const [coachData, setCoachData] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  
  useEffect(() => {
    if (data && data.length > 0) {
      setCoachData(data[0]);
    }
  }, [data, isError]);

  return (
    <div className={s.header}>
      <div className={s.header_logo}>
        <Link href={`/?token=${token}`}>AF CLUB</Link>
      </div>
      <div className={s.header_burger}>
        <BurgerMenu coachData={coachData} />
      </div>
    </div>
  );
};

export default Header;
