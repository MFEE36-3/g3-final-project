import { set } from 'lodash'
import React from 'react'
import style from '@/styles/reservation/style.module.css'

export default function Memo({ memo, setMemo }) {

    const handleNoteChange = (e) => {
        const memoVal = e.target.value;
        setMemo(memoVal);
    }

    return (
        <>
            <textarea
                className={style.memostyle}
                id="note"
                name="note"
                value={memo}
                onChange={handleNoteChange}
                rows={2}
                cols={40}
                wrap="soft"
            />
        </>
    )
}
