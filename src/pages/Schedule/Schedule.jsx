import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import AddButton from "../../shared/ui/AddButton";
import { useGetScheduleQuery } from "../../redux/api";
import s from "./Schedule.module.scss";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";

const Shchedule = () => {
  const [token, setToken ] = useState(null)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const router = useRouter();

  const handleAddClick = () => {
    router.push("/SheduleDetail/SheduleDetail");
  };
  const handleTrnsition = (id) => {
    router.push(`/WardsDetail/${id}`)
  }

  const handleItemClick = (event) => {
    if (event.status !== "free") {
      handleTrnsition(event.purchase_id);
    }
  };

  const { data: resultData, isError, refetch } = useGetScheduleQuery(token, {
    skip: !token,
  });

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
      refetch()
      const groupedByDate = resultData.reduce((acc, event) => {
        const date = event.date_start.split(" ")[0];
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
        <BackLink menuTitle="Меню" currentPage="График" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.schedule}>
      <div className={s.schedule_shared}>
        <BackLink menuTitle="Меню" currentPage="График" />
        <AddButton onClick={() => handleAddClick()} />
      </div>
      <div className={s.schedule_info}>
        {Object.entries(data).map(([date, events]) => (
          <div key={date}>
            <h3>{formatDate(date)}</h3>
            <div className={s.schedule_info_time}>
              {events.map((event) => (
                <div

                onClick={() => handleItemClick(event)}
                  key={event.id}
                  className={
                    event.status === "busy"
                      ? s.schedule_info_busy
                      : s.schedule_info_anactive
                  }
                >
                  <p>
                    <span>
                      {event.date_start.split(" ")[1]} -{" "}
                      {event.date_finish.split(" ")[1]}
                    </span>{" "}
                    {event.title}
                  </p>
                  {event.status !== "free" && (
                    <Image
                      src={"/tick.png"}
                      alt="Portrait"
                      width={8}
                      height={10}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shchedule;
