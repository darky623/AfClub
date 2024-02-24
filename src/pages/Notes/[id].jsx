import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import s from "./Notes.module.scss";
import BackLink from "../../components/BackLink/BackLink";
import SaveBtn from "../../shared/ui/SaveBtn";
import NoInform from "../../shared/ui/NoInform";
import Loader from "../../shared/ui/Loader";
import { useEditNotesMutation, useGetNotesQuery } from "../../redux/api";
import { useRouter } from "next/router";
import UiModal from "../../shared/ui/UiModal";
import EditingBtn from "../../shared/ui/EditingBtn";

const Notes = () => {
  const router = useRouter();
  const [token, setToken ] = useState(null)
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueNotes, setValueNotes] = useState({
    notes: "",
  });
  const { data: resultData, isError, refetch } = useGetNotesQuery({token, id}, {
    skip: !token,
  });
  const [editNotes] = useEditNotesMutation();
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

  const sendNotes = async () => {
    const createData = {
      ...valueNotes,
    };
    try {
      await editNotes({ token, id, createData });
      toast.success("Успешно изменено");
      refetch()
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setValueNotes({ notes: "" });
    setIsModalOpen(false);
  };

  const showModal = () => setIsModalOpen(true);

  if (isError) {
    return (
      <>
        <BackLink menuTitle="Группы" currentPage="О группе" />
        <NoInform text="error" />
      </>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.notes}>
      <BackLink menuTitle="Группа" currentPage="Заметки" />
      <div className={s.notes_desc}>
        {data.length !== 0 ? (
          <>
            {data.map((note, index) => (
              <h3 key={index}>
                <span>Заметки: </span>
                {valueNotes.notes ? valueNotes.notes : note.notes}
              </h3>
            ))}
          </>
        ) : (
          <h3>
            <span>Заметки:</span> Заметок нет
          </h3>
        )}
        <EditingBtn onClick={() => showModal()} />
        <UiModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          nameModal={"Заметки"}
          isModalOpen={isModalOpen}
        >
          <input
            type="text"
            placeholder="Напишите заметку"
            maxLength={350}
            value={valueNotes.notes}
            onChange={(e) =>
              setValueNotes({ ...valueNotes, notes: e.target.value })
            }
          />
        </UiModal>
      </div>
      <SaveBtn nameBtn={"Сохранить"} onClick={sendNotes} />
    </div>
  );
};

export default Notes;
