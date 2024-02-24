import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Wards.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useGetPurchasesQuery } from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";

const Wards = () => {
  const [token, setToken ] = useState(null)
  const { data: resultData, isError } = useGetPurchasesQuery(token, {
    skip: !token,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
  }, [resultData]);

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <NoInform text="error" />;
  }

  return (
    <div className={s.wards}>
      <BackLink menuTitle="Меню" currentPage="Подопечные" />
      <div className={s.wards_transitions}>
        {data.length !== 0 ? (
          data.map((purchases) => (
            <Link
              key={purchases.purchase_id}
              href={`/WardsDetail/${purchases.purchase_id}`}
            >
              <p>{purchases.name}</p>
              <Image src={"/tick.png"} width={17} height={17} alt="tick" />
            </Link>
          ))
        ) : (
          <NoInform text="empty" />
        )}
      </div>
    </div>
  );
};

export default Wards;
