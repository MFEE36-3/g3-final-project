import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function TogoDateTime({ row }) {
    const [selectedTime, setSelectedTime] = useState(null);

    // 從資料庫取得的店家營業時間
    const shopOpenTime = dayjs(row.detail?.open_time, 'HH:mm');
    const shopCloseTime = dayjs(row.detail?.close_time, 'HH:mm');

    const availableTimes = [];
    let currentTime = shopOpenTime;
    while (currentTime.isBefore(shopCloseTime)) {
        availableTimes.push(currentTime.toDate());
        currentTime = currentTime.add(15, 'minute'); // 每次增加15分鐘
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
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
            <TimePicker
                label="請選擇取餐時間"
                value={selectedTime}
                onChange={handleTimeChange}
                minutesStep={30} // 可以調整時間的間隔，這裡設為15分鐘一格
                // disabled={!selectedTime} // 若未選擇日期，則禁用時間選擇
                renderInput={(props) => <input {...props} readOnly />} // 這裡將 input 設為唯讀，以避免手動輸入時間
                inputFormat="HH:mm" // 顯示格式為24小時制
                views={['hours', 'minutes']} // 只顯示「時」和「分」的選擇
                // mask="__:__" // 輸入框的輸入格式
                openTo="hours" // 預設展開時選擇「時」
                // disableOpenPicker // 關閉直接點選輸入框展開選擇器
                disableCloseOnSelect // 選擇時間後不要自動關閉選擇器
                ampm={false} // 不使用 AM/PM 制
                availableViews={['hours', 'minutes']} // 只能選擇「時」和「分」
                orientation="portrait" // 顯示方向
                disableTimeValidationIgnoreDate // 禁用時間選擇器內容改變時對日期的影響
                disableToolbar // 不顯示工具欄
                shouldDisableTime={(time) => !availableTimes.some((t) => t.getHours() === time.getHours() && t.getMinutes() === time.getMinutes())} // 禁用不在營業時間內的時間
            />
        </LocalizationProvider>
    );
}