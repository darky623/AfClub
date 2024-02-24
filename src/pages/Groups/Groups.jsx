import React, { useEffect, useState } from "react";
import BackLink from "../../components/BackLink/BackLink";
import s from "./Groups.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useGetGroupsQuery } from "../../redux/api";
import Loader from "../../shared/ui/Loader";
import NoInform from "../../shared/ui/NoInform";

const Groups = () => {
  const [token, setToken ] = useState(null)

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])

  const { data: resultData, isError } = useGetGroupsQuery(token, {
    skip: !token,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
    <div className={s.groups}>
      <BackLink menuTitle="Меню" currentPage="Группы" />
      <div className={s.groups_transitions}>
        {data.length !== 0 ? (
          data.map((groups) => (
            <Link
              key={groups.group_id}
              href={`/GroupDetail/${groups.group_id}`}
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

export default Groups;
