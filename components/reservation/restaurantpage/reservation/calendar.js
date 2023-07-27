import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';


export default function Calendar({ date, setDate, setTime, setPerson, setSeat }) {

    const today = new Date();
    const minDate = dayjs(today).add(1, 'day').toDate(); // 計算今天往後一天的日期
    const maxDate = dayjs(today).add(30, 'day').toDate(); // 計算30天後的日期


    const shouldDisableDate = (date) => {
        // 將今天的日期以及之前的日期禁用
        const minSelectableDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), 0, 0, 0, 0);
        const maxSelectableDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 0, 0, 0, 0);
        return date < minSelectableDate || date > maxSelectableDate;
    };

    const handleDateChange = (selectedDate) => {
        console.log(selectedDate);
        // const formattedDate = selectedDate.toISOString().split('T')[0];
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        console.log(formattedDate)
        setDate(formattedDate);
        setTime('');
        setPerson('');
        setSeat('');
    }

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

