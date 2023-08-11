import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#911010',
      darker: '#053e85',
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, dist, theme) {
  return {
    fontWeight:
      dist.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Dist({ keyword, setKeyword, ddata, setDdata }) {

  const router = useRouter();

  const theme = useTheme();
  const [dist, setDist] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDist(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    const selectedDist = event.target.value;
    setKeyword({ ...keyword, dist: selectedDist })

    const arrfoodtype = router.query.foodtype ? router.query.foodtype.split(',') : [];
    const strfoodtype = arrfoodtype.join();

    const strcity = router.query.city;
    const slideval = router.query.price;
    const numstar = router.query.star;
    const searchkeyword = router.query.searchkeyword;

    const usp = new URLSearchParams();
    if (strfoodtype) {
      usp.set('foodtype', strfoodtype);
    }
    if (strcity) {
      usp.set('city', strcity);
    }
    if (selectedDist && selectedDist.length !== 0) {
      usp.set('dist', selectedDist);
    }
    if (slideval) {
      usp.set('price', slideval);
    }
    if (numstar) {
      usp.set('star', numstar);
    }
    if (searchkeyword) {
      usp.set('searchkeyword', searchkeyword);
    }

    // 使用 toString() 將 URL 查詢參數轉換成字串
    const queryString = usp.toString();

    // 修改 router.push 部分
    let url = '';
    if (queryString) {
      url += '?' + queryString.replaceAll('%2C', ',');
    }

    router.push({
      pathname: router.pathname,
      search: url
    }, undefined, { scroll: false });

  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <FormControl sx={{
          width: '100%',
          '&.MuiFormControl-root': {
            '&.Mui-focused': {
              borderColor: '#911010',
            },
          },
        }} color="primary">
          <InputLabel
            id="demo-multiple-chip-label"
            color="primary"
            sx={{
              '&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                color: '#911010 !important',
              },
              '&.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.Mui-focused:focus': {
                color: '#911010 !important',
                border: '1px solid #911010',
              },
              '&.MuiSelect-root:focus': {
                color: '#911010 !important',
                border: '1px solid #911010',
              },
            }}>
            --請選擇區域--
          </InputLabel>


          <Select
            sx={{
              '&.MuiSelect-root': {
                '&:focus': {
                  backgroundColor: 'rgba(145, 16, 16, 0.04)',
                },
              },
            }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            disabled={keyword.city ? false : true}
            multiple
            value={keyword.dist}
            onChange={handleChange}
            color="primary"
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >


            {ddata.map((v) => {
              const { area_sid, city_id, area_id, areaname } = v;
              return (
                <MenuItem
                  key={area_sid}
                  value={areaname}
                  style={getStyles(areaname, dist, theme)}
                >
                  {areaname}
                </MenuItem>)
            }
            )}

          </Select>

        </FormControl>
      </StyledEngineProvider>
    </div>
  );
}
