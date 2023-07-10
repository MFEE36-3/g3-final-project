
import BookingCalendar from './calendar'
import InteriorPic from './interior'
import SelectPerson from './person'
import { TextareaAutosize } from '@mui/base';


export default function Reservation() {
  return (
    <>
      <p>用餐日期</p>

      <p>用餐人數</p>

      <SelectPerson className='w-10'/>
      <InteriorPic />
      <p>備註</p>
      <TextareaAutosize className='w-40' minRows={2} />

    </>
  )
}
