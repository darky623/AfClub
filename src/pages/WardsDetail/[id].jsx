import Link from "next/link";
import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./WardsDetail.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Loader from "../../shared/ui/Loader";
import { useGetPurchaseQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";

const WardsDetail = () => {
  const [token, setToken ] = useState(null)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const { data: resultData, isError } = useGetPurchaseQuery({token, id}, {
    skip: !token,
  });

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

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
            <div key={purchase.member_id} className={s.wards_detail_links}>
              <Link href={`/Plan/${purchase.member_id}`}>
                Индивидуальный план
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <Link href={`/Analytics/${purchase.member_id}`}>
                Аналитика
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <Link href={`/Questionnaire/${purchase.member_id}`}>
                Анкета
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </Link>
              <a
                href={purchase.chat_id}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти в чат
                <Image src={"/tick.png"} width={17} height={17} alt="tick" />
              </a>
            </div>
          ))}
        </>
      ) : (
        <>
          <NoInform text="empty" />
        </>
      )}
    </div>
  );
};

export default WardsDetail;
