import React, { useState, useEffect } from "react";
import s from "./BurgerMenu.module.scss";
import BurgerBtn from "../../shared/ui/BurgerBtn";
import Link from "next/link";
import { useRouter } from "next/router";

const BurgerMenu = ({ coachData }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setMenuOpened(!menuOpened);
  };

  const handleCloseMenu = () => {
    setMenuOpened(false);
  };

  const handleRouteChange = () => {
    handleCloseMenu();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div
        className={`${s.header_burger} ${
          menuOpened ? s.header_menu_opened : ""
        }`}
      >
        <div className={s.header_burger_container}>
          <div
            className={s.header_burger_container_btn}
            onClick={handleButtonClick}
          >
            <BurgerBtn isActive={menuOpened} onClick={handleCloseMenu} />
          </div>
        </div>
        <ul className={s.header_burger_menu}>
          {coachData?.status === "expert" ? (
            <>
              <li>
                <Link href={"/Wards/Wards"}>Подопечные</Link>
              </li>
              <li>
                <Link href={"/Schedule/Schedule"}>График</Link>
              </li>
              <li>
                <Link href={"/Groups/Groups"}>Группы</Link>
              </li>
              <li>
                <Link href={"/Tariffs/Tariffs"}>Услуги</Link>
              </li>
              <li>
                <Link href={"/Templates/Templates"}>Методики</Link>
              </li>
              <li>
                <Link href={"/Finance/Finance"}>Финансы</Link>
              </li>
            </>
          ) : coachData?.status === "user" ? (
            <>
              <li>
                <Link href={"/Experts/Experts"}>Эксперты</Link>
              </li>
              <li>
                <Link href={"/TargetGroups/TargetGroups"}>Услуги</Link>
              </li>
            </>
          ) : coachData?.status === "helper" ? (
            <>
              <li>
                <Link href={"/Wards/Wards"}>Подопечные</Link>
              </li>
              <li>
                <Link href={"/Templates/Templates"}>Методики</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
};

export default BurgerMenu;
