import React, { useState, useEffect } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Experts.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useGetAllExpertsClientsQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";
import Loader from "../../shared/ui/Loader";

const Experts = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { data: resultData, isError } = useGetAllExpertsClientsQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (resultData) {
      setData(resultData);
      setLoading(false);
    }
    isError ? setLoading(false) : null;
  }, [resultData]);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Услуги" currentPage="Эксперты" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.experts}>
      <BackLink menuTitle="Услуги" currentPage="Витрина" />
      <div className={s.experts_transitions}>
        {data?.length !== 0 ? (
          data?.map((expert) => (
            <Link
              key={expert.expert_id}
              href="/ExpertDesc/[id]"
              as={`/ExpertDesc/${expert.expert_id}`}
            >
              {expert.title}
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

export default Experts;
