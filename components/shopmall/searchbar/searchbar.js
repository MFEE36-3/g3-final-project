import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { css, keyframes } from '@emotion/react';
import { Host } from '@/components/shopmall/shopmallfinal';
import { debounce } from 'lodash';
const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
const StyledBiSearch = styled(BiSearch)`
  cursor: pointer;
  animation: ${css`${scaleAnimation} 2s ease-in-out infinite`};
  &:hover {
    animation: none; 
  }
`;
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      background: "#FFF",
      borderRadius:"20px",
      border:"2px solid #adadad",
    },
    "& input": {
      color: "black",
      zIndex: 1,
      fontSize: "var(--h4)",
    },
    "& button": {
      color: "black",
      zIndex: 1,
    },
    "&:hover fieldset": {
      borderColor: "var(--main-color)",
      border: "2px solid var(--main-color)",
    },
    "&:focus fieldset": {
      borderColor: "var(--main-color)",
      border: "2px solid var(--main-color)",
    },
  },
});

export default function SearchBar() {
  const {host, dispatch, setSelectedCategory,categories} = React.useContext(Host);
  const [currKey, setCurrKey] = React.useState("");
  const [commandItems, setCommandItems] = React.useState([])
  const router = useRouter();
  const handleSearch = () => {
    const keywordValue = currKey ? currKey.trim() : '';
    if(keywordValue === "") {
      setCurrKey('')
      return
    }
    const selectedCategoryIds = Object.keys(categories).filter((key) => categories[key].checked);
    setSelectedCategory(selectedCategoryIds);
    dispatch({
      type:"SET_KEYWORD",
      payload: keywordValue
    })
    const query = {};

    if (selectedCategoryIds.length > 0) {
      query.cate_id = selectedCategoryIds.join('%'); 
    }
  
    if (keywordValue !== '') {
      query.keyword = keywordValue;
    }
  
    router.push({
      pathname: '/shopmall',
      query: query,
    }, undefined, {scroll: false});
  };
  React.useEffect(()=> {
  const fetchCommandItems = async () => {
    const response = await fetch(`${host}/ecshop/item`) 
    const { data } = await response.json()
    setCommandItems(data)
  }
  fetchCommandItems()
  },[])  
  const comItems = commandItems.map(v => ({
    title: v.item_name
  }))
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
      }
  };
  return (
    <div className=' mx-0 d-flex pe-0 pt-2 justify-content-center align-items-center my-xl-4'>
      <Stack spacing={2} className='w-75'>
        <Autocomplete
          id="free-solo-demo"
          className=''
          freeSolo
          value={currKey}
          onInputChange={(event, newValue) => {
            setCurrKey(newValue);
        }}
          options={comItems.map((option) => option.title)}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder="搜尋商品"
              onChange={e => {
                setCurrKey(e.target.value)
              }}
              onKeyDown={handleKeyDown}  
            />
          )}
        />
      </Stack>
      <StyledBiSearch className='fs-1 ms-3 ' onClick={handleSearch} />
    </div>
  );
}

