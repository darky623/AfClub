import Link from "next/link";
import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./WardsDetail.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "../../shared/ui/Loader";
import { useGetPurchaseQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import { Collapse } from "antd";
import AnalyticsComponets from "../../components/AnalyticsComponets/AnalyticsComponets";
import PlanComponets from "../../components/PlanComponets/PlanComponets";
import QuestionnaireComponets from "../../components/QuestionnaireComponets/QuestionnaireComponets";
import ScrollToTopButton from "../../shared/ui/ScrollToTopButton";
import Templates from "../Templates/Templates";

const WardsDetail = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const { data: resultData, isError } = useGetPurchaseQuery(
    { token, id },
    {
      skip: !token,
    }
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (isError) {
    return (
      <>
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.wards_detail}>
      <BackLink menuTitle="Покупки" currentPage="Консультация 23.10" />
      {data?.length !== 0 ? (
        <>
          {data.map((purchase) => (
            <div key={purchase.member_id} className={s.wards_detail_goal}>
              <p>
                <span>Услуга:</span> {purchase.title}
              </p>
              <p>
                <span>Покупатель:</span> {purchase.member_name}
              </p>
              <p>
                <span>Дата:</span> {purchase.date_start} -{" "}
                {purchase.date_finish}
              </p>
            </div>
          ))}
          {data.map((purchase) => (
            <Collapse
              accordion={false}
              expandIconPosition="end"
              key={purchase.member_id}
            >
              <Collapse.Panel
                header="Индивидуальный план"
                key="1"
                className={s.wards_detail_Collapse}
              >
                <PlanComponets id={purchase.member_id} />
              </Collapse.Panel>
              <Collapse.Panel
                header="Методики"
                key="5"
                className={s.wards_detail_Collapse}
              >
                <Templates main={false} />
              </Collapse.Panel>
              <Collapse.Panel
                header="Аналитика"
                key="2"
                className={s.wards_detail_Collapse}
              >
                <AnalyticsComponets id={purchase.member_id} />
              </Collapse.Panel>
              <Collapse.Panel
                header="Анкета"
                key="3"
                className={s.wards_detail_Collapse}
              >
                <QuestionnaireComponets id={purchase.member_id} />
              </Collapse.Panel>
              <Collapse.Panel
                onClick={() => {
                  window.open(`${purchase.chat_id}`, "_blank");
                }}
                header={<p className={s.collapse_link}>Перейти в чат</p>}
                key="4"
                className={s.wards_detail_Collapse}
              ></Collapse.Panel>
            </Collapse>
          ))}
        </>
      ) : (
        <>
          <NoInform text="empty" />
        </>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default WardsDetail;
