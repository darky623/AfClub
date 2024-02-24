import React, { useState, useEffect } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./TargetGroups.module.scss";
import Link from "next/link";
import Image from "next/image";
import Loader from "../../shared/ui/Loader";
import { useGetAllGroupsClientsQuery } from "../../redux/api";
import NoInform from "../../shared/ui/NoInform";

const TargetGroups = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const [token, setToken ] = useState(null)

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const { data: resultData, isError } = useGetAllGroupsClientsQuery(token, {
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
        <BackLink menuTitle="Услуги" currentPage="Целевые группы" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.target_Groups}>
      <BackLink menuTitle="Услуги" currentPage="Целевые группы" />
      <div className={s.targetGroups_transitions}>
        {data?.length !== 0 ? (
          data?.map((groups) => (
            <Link
              key={groups.group_id}
              href="/AboutGroupClient/[id]"
              as={`/AboutGroupClient/${groups.group_id}`}
            >
              {groups.title}
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

export default TargetGroups;
