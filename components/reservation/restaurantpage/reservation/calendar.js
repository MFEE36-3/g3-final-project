import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Calendar({ row, date, setDate, setTime, setPerson, setSeat }) {
    const today = new Date();
    const minDate = dayjs(today).toDate(); // 計算今天往後一天的日期
    const maxDate = dayjs(today).add(30, 'day').toDate(); // 計算30天後的日期

    // 從資料庫取得的店家營業時間
    const shopOpenTimeInfo = {
        Monday: row?.Monday, // 1 表示營業，0 表示不營業
        Tuesday: row?.Tuesday,
        Wednesday: row?.Wednesday,
        Thursday: row?.Thursday,
        Friday: row?.Friday,
        Saturday: row?.Saturday,
        Sunday: row?.Sunday,
    };

    const isShopOpenOnDate = (date) => {
        const dayOfWeek = date.day(); // 取得星期幾的數字，0 為星期日，1 為星期一，依此類推
        const dayOfWeekString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
        return shopOpenTimeInfo[dayOfWeekString] === 1;
    };

    const shouldDisableDate = (date) => {
        if (!date || !date.isAfter(minDate) || !date.isBefore(maxDate)) {
            return true;
        }
        return !isShopOpenOnDate(date);
    };

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate.format('YYYY-MM-DD'));
        setTime('');
        setPerson('');
        setSeat('');
    };

    return (
        <div style={{ width: "600px", display: "flex", justifyContent: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    shouldDisableDate={shouldDisableDate} // 禁用小於等於今天的日期
                    value={date}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
        </div>
    );
}
