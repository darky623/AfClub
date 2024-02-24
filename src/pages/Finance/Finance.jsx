import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import { useGetBillingQuery } from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";
import s from "./Finance.module.scss";

const Finance = () => {

  const [token, setToken ] = useState(null)

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const { data: resultData, isError } = useGetBillingQuery({token}, {
    skip: !token,
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const formatDate = (dateString) => {
    const months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const [day, month, year] = dateString.split("/");
    const monthIndex = parseInt(month, 10) - 1;

    return `${day} ${months[monthIndex]}`;
  };

  useEffect(() => {
    if (resultData) {
      const groupedByDate = resultData.reduce((acc, event) => {
        const date = event?.date?.split(" ")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      }, {});
      setData(groupedByDate);
      setLoading(false);
    }
    isError ? setLoading(false) : null;
  }, [resultData, isError]);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Меню" currentPage="Финансы" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {data.length !== 0 ? (
        <>
          <div className={s.finance}>
            <BackLink menuTitle="Меню" currentPage="Финансы" />
            {Object.entries(data).map(([date, events]) => (
              <div key={date} className={s.finance_expeneses}>
                <div className={s.finance_expeneses_title}>
                  <h3>{formatDate(date)}</h3>
                </div>
                {events.map((event) => (
                  <div className={s.finance_expeneses_card}>
                    <p>{event.title}</p>
                    <h3>{event.amount}</h3>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <BackLink menuTitle="Меню" currentPage="Финансы" />
          <NoInform text="empty" />
        </>
      )}
    </>
  );
};

export default Finance;
