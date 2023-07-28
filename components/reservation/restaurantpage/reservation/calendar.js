import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Calendar({ row, date, setDate, setTime, setPerson, setSeat }) {
    const today = new Date();
    const minDate = dayjs(today).add(1, 'day').startOf('day').toDate(); // 明天的开始时间
    const maxDate = dayjs(today).add(31, 'day').endOf('day').toDate(); // 31天后的结束时间

    // 從資料庫取得的店家營業時間
    const shopOpenTimeInfo = {
        Monday: row.detail?.Monday, // 1 表示營業，0 表示不營業
        Tuesday: row.detail?.Tuesday,
        Wednesday: row.detail?.Wednesday,
        Thursday: row.detail?.Thursday,
        Friday: row.detail?.Friday,
        Saturday: row.detail?.Saturday,
        Sunday: row.detail?.Sunday,
    };

    const isShopOpenOnDate = (date) => {
        const dayOfWeek = date.day(); // 将 date 转换为 dayjs 对象，然后获取星期几的数值
        const dayOfWeekString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
        return shopOpenTimeInfo[dayOfWeekString] === 1;
    };


    const shouldDisableDate = (date) => {
        if (!date || date.isBefore(minDate) || date.isAfter(maxDate)) {
            return true;
        }
        return !isShopOpenOnDate(date);
    };

    const handleDateChange = (selectedDate) => {
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        setDate(formattedDate);
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
