import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {

    // const minDate = new Date();
    // const maxDate = new Date('2023-07-30');

    return (
        <div className='d-flex'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    disablePast
                // maxDate={maxDate}
                />
                <DateCalendar

                />
            </LocalizationProvider>
        </div>
    );
}