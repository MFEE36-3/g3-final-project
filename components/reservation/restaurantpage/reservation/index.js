import Calendar from './calendar'
import DateTime from './datetime';
import InteriorPic from './interior'
import SelectPerson from './person'
import { TextareaAutosize } from '@mui/base';
import style from '@/styles/reservation/style.module.css'


export default function Reservation({ date, setDate, time, setTime, person, setPerson }) {
  return (
    <>
      <div className={style.divmb}>
        <p className={style.subtitle}>用餐日期</p>
        <Calendar date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} />
      </div>

      {date ? <div className={style.divmb}>
        <DateTime date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} />
      </div> : ''}

      <div className={style.divmb}>
        <p className={style.subtitle}>用餐人數</p>
        <SelectPerson time={time} setTime={setTime} person={person} setPerson={setPerson} />
        <InteriorPic />
      </div>

      <div className={style.divmb}>
        <p className={style.subtitle}>備註</p>
        <TextareaAutosize className='w-40' minRows={2} />
      </div>
    </>
  )
}
