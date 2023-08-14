import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#911010',
            darker: '#911010',
        },
    },
});

export default function Calendar({ row, date, setDate, setTime, setPerson, setSeat, setMemo }) {
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
        setDate(formattedDate);
        setTime('');
        setPerson('');
        setSeat('');
        setMemo('');
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar

                        sx={{
                            '&.MuiDateCalendar-root': {
                                width: '500px',
                                minHeight: '480px',
                                maxHeight: '505px'
                            },
                            '& .MuiPickersCalendarHeader-root': {
                                padding: '0',
                            },
                            '& .MuiPickersCalendarHeader-labelContainer': {
                                fontSize: '32px',
                                paddingLeft: '15%',
                                paddingBottom: '15px',
                                margin: '0 auto',
                                color: 'var(--main-color)',
                                fontFamily: 'var(--ff1)'
                                // textShadow: '1px 1px 1px black',
                            },
                            '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiPickersCalendarHeader-switchViewIcon': {
                                display: 'none',
                            },
                            '& .MuiDayCalendar-header': {
                                width: '500px',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                background: 'var(--main-color)',
                                borderRadius: '5px 5px 0px 0px',
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                margin: '10px -13px'
                            },
                            '& .MuiDayCalendar-weekContainer': {
                                width: '500px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            },
                            '& .MuiPickersDay-root': {
                                color: '#911010',
                                fontSize: '20px',
                                borderRadius: '20%',
                                border: '1px solid #a8a8a8',
                                padding: '22px',
                                margin: '8px 9px'
                            },
                            '& .MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition': {
                                minHeight: '500px',
                            },
                            '& .MuiDayCalendar-monthContainer ': {
                                border: '2px solid #a8a8a8',
                                borderTop: 'none',
                                borderRadius: '0px 0px 5px 5px',
                            },
                            '& .MuiDayCalendar-weekContainer': {
                                width: '500px',
                                display: 'flex',
                                justifyContent: 'center',
                            },
                            '& .Mui-selected': {
                                color: 'white',
                                background: '#911010',
                                '&:focus': {
                                    background: '#911010',
                                },
                                '&:active': {
                                    background: '#911010',
                                },
                            },
                            '@media (max-width: 390px)': {
                                '&.MuiDateCalendar-root': {
                                    width: '100%',
                                    minHeight: '380px',
                                    maxHeight: '420px'
                                },
                                '& .MuiPickersCalendarHeader-root': {
                                    padding: '0',
                                },
                                '& .MuiPickersCalendarHeader-labelContainer': {
                                    fontSize: '20px',
                                    paddingLeft: '15%',
                                    paddingBottom: '10px',
                                    margin: '0 auto',
                                    color: 'var(--main-color)',
                                    fontFamily: 'var(--ff1)'
                                    // textShadow: '1px 1px 1px black',
                                },
                                '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiPickersCalendarHeader-switchViewIcon': {
                                    display: 'none',
                                },
                                '& .MuiDayCalendar-header': {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    background: 'var(--main-color)',
                                    borderRadius: '5px 5px 0px 0px',
                                },
                                '& .MuiDayCalendar-weekDayLabel': {
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '10px -13px'
                                },
                                '& .MuiDayCalendar-weekContainer': {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                },
                                '& .MuiPickersDay-root': {
                                    color: '#911010',
                                    fontSize: '18px',
                                    borderRadius: '20%',
                                    border: '1px solid #a8a8a8',
                                    padding: '20px',
                                    margin: '3px 4px'
                                },
                                '& .MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition': {
                                    minHeight: '500px',
                                },
                                '& .MuiDayCalendar-monthContainer ': {
                                    border: '2px solid #a8a8a8',
                                    borderTop: 'none',
                                    borderRadius: '0px 0px 5px 5px',
                                },
                                '& .MuiDayCalendar-weekContainer': {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                },
                                '& .Mui-selected': {
                                    color: 'white',
                                    background: '#911010',
                                    '&:focus': {
                                        background: '#911010',
                                    },
                                    '&:active': {
                                        background: '#911010',
                                    },
                                },
                            }

                        }}


                        shouldDisableDate={shouldDisableDate} // 禁用日期
                        // value={date}

                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
}
