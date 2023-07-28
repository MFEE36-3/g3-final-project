import Calendar from './calendar'
import DateTime from './datetime';
import InteriorPic from './interior'
import SelectPerson from './person'
import { TextareaAutosize } from '@mui/base';
import style from '@/styles/reservation/style.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Reservation({ row, date, setDate, time, setTime, person, setPerson, seat, setSeat }) {

  return (
    <>
      <div className={style.divmb}>
        <p className={style.subtitle}>用餐日期</p>
        <Calendar row={row} date={date} setDate={setDate} setTime={setTime} setPerson={setPerson} setSeat={setSeat} />
      </div>

      {date ? <div className={style.divmb}>
        <DateTime row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} setSeat={setSeat} />
      </div> : ''}

      {time ?
        <div className={style.divmb}>
          <p className={style.subtitle}>用餐人數</p>
          <SelectPerson row={row} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} />
          <InteriorPic row={row} seat={seat} setSeat={setSeat} person={person} />
        </div> : ''}

      {seat ?
        <div className={style.divmb}>
          <p className={style.subtitle}>備註</p>
          <TextareaAutosize className='w-40' minRows={2} />
        </div> : ''}
    </>
  )
}
