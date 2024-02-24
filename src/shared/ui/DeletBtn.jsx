import React from 'react';
import { DeleteOutlined } from "@ant-design/icons"
import s from "./DeletBtn.module.scss"

const DeletBtn = ({onClick}) => {
    return (
        <button onClick={onClick} className={s.delete_btn}>
            <DeleteOutlined />
        </button>
    );
};

export default DeletBtn;