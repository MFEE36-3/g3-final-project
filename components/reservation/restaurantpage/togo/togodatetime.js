import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function TogoDateTime({ row }) {

    const [togodate, setTogodate] = useState();
    const [togotime, setTogotime] = useState();

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
        const dayOfWeek = date.day(); // 將 date 轉換為 dayjs，取得星期幾的值
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
        setTogodate(formattedDate);
    };


    // 從資料庫取得的店家營業時間
    const shopOpenTime = dayjs(row.detail?.open_time, 'HH:mm');
    const shopCloseTime = dayjs(row.detail?.close_time, 'HH:mm');

    // 設定最後可取餐的時間（比 shopCloseTime 提前一小時）
    const lastPickupTime = shopCloseTime.subtract(1, 'hour');

    const availableTimes = [];
    let currentTime = shopOpenTime;
    while (currentTime.isBefore(shopCloseTime)) {
        availableTimes.push(currentTime.format('HH:mm'));
        currentTime = currentTime.add(15, 'minute'); // 每次增加15分鐘
    }

    const handleTimeChange = (selectedTime) => {
        const formattedTime = selectedTime.format('HH:mm');
        setTogotime(formattedTime);
    };

    const shouldDisableTime = (time) => {
        if (!time) {
            return false;
        }

        const selectedTime = dayjs(time, 'HH:mm');
        return (
            selectedTime.isBefore(shopOpenTime, 'hour') || selectedTime.isAfter(lastPickupTime, 'hour')
        );
    };



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DateTimePicker
                label="請選擇取餐時間"
                value={ordertime}
                shouldDisableDate={shouldDisableDate} // 禁用日期
                shouldDisableTime={shouldDisableTime} // 禁用時間
                onChange={handledatetime}
            /> */}
            <DatePicker
                label="請選擇取餐日期"
                shouldDisableDate={shouldDisableDate} // 禁用日期
                // value={togodate}
                onChange={handleDateChange}
            />

            <TimePicker
                label="請選擇取餐時間"
                shouldDisableTime={shouldDisableTime}
                // value={togotime}
                onChange={handleTimeChange}
                minutesStep={15}
                ampm={false}
            />
        </LocalizationProvider>
    );
}