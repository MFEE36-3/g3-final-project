import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from '@/styles/reservation/style.module.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#911010',
            darker: '#053e85',
        },
    },
});

export default function SelectPerson({ time, setTime, person, setPerson, setSeat, setMemo }) {

    const handleChange = (event) => {
        setPerson(event.target.value);
        setSeat('');
        setMemo('');
    };

    return (
        <>
            <div className={style.selectperson}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ Width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">--請選擇人數--</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={person}
                                label="Age"
                                onChange={handleChange}
                                color="primary"
                            // disabled={!time}
                            >
                                <MenuItem value={1}>1人</MenuItem>
                                <MenuItem value={2}>2人</MenuItem>
                                <MenuItem value={3}>3人</MenuItem>
                                <MenuItem value={4}>4人</MenuItem>
                                <MenuItem value={5}>5人</MenuItem>
                                <MenuItem value={6}>6人</MenuItem>
                                <MenuItem value={7}>7人</MenuItem>
                                <MenuItem value={8}>8人</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </ThemeProvider>
            </div>
        </>
    );
}
