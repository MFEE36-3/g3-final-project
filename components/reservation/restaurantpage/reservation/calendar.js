// import * as React from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// export default function Calendar() {


//     return (
//         <div className='d-flex'>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar

//                 />
//             </LocalizationProvider>
//         </div>
//     );
// }

import * as React from 'react';
import { DatePicker } from '@mui/lab';

const TwoMonthsDatePicker = () => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    return (
        <DatePicker
            label="Select Date"
            value={selectedDate}
            views={['month', 'year']}
            minDate={new Date()} // 禁用過去的日期
            maxDate={new Date('2100-12-31')} // 設置一個最大日期（可選）
            onChange={(date) => {
                setSelectedDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
};

export default TwoMonthsDatePicker;
