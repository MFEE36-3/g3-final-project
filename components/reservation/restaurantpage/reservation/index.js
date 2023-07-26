import Calendar from './calendar'
import InteriorPic from './interior'
import SelectPerson from './person'
import { TextareaAutosize } from '@mui/base';
import style from '@/styles/reservation/style.module.css'


export default function Reservation({ date, setDate }) {
  return (
    <>
      <div className={style.divmb}>
        <p className={style.subtitle}>用餐日期</p>
        <Calendar date={date} setDate={setDate} />
      </div>

      <div className={style.divmb}>
        <p className={style.subtitle}>用餐人數</p>
        <SelectPerson />
        <InteriorPic />
      </div>

      <div className={style.divmb}>
        <p className={style.subtitle}>備註</p>
        <TextareaAutosize className='w-40' minRows={2} />
      </div>
    </>
  )
}
