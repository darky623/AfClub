import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useGetLoginQuery } from "../../redux/api";
import { useRouter } from "next/router";
import BurgerMenu from "../Burger/BurgerMenu";
import s from "./Header.module.scss";

const Header = () => {
  const [token, setToken] = useState(null);
  const { data, isError } = useGetLoginQuery(token);
  const [coachData, setCoachData] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
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
        {canGoBack ? <BurgerMenu coachData={coachData} /> : null}
      </div>
    </div>
  );
};

export default Header;
