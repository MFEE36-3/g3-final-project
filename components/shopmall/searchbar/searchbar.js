import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { css, keyframes } from '@emotion/react';
import { Host } from '@/components/shopmall/shopmallfinal';
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
} 
const customFilterOptions = (options, { inputValue }) => {
  const inputRegex = new RegExp(inputValue, 'i'); 
  return options.filter((option) => inputRegex.test(option.title));
};

export default function FreeSolo() {
  const {host, dispatch, } = React.useContext(Host);
  const [currKey, setCurrKey] = React.useState("");
  const [commandItems, setCommandItems] = React.useState([])
  const router = useRouter();
  const handleSearch = () => {
    const keywordValue = currKey ? currKey.trim() : '';
    dispatch({
      type:"SET_KEYWORD",
      payload:currKey
    })
    if (keywordValue === '') {
      router.push({
        pathname: '/shopmall/shopmall',
        query: {},
      });
    } else {
      router.push({
        pathname: '/shopmall/shopmall',
        query: { keyword: keywordValue },
      });
    }
  };

  React.useEffect(()=>{
    const {keyword: value} = router.query;
    dispatch({
      type:'SET_KEYWORD',
      payload:value || ''
    }) }
    ,[router.query]);

  React.useEffect(()=> {
  const fetchCommandItems = async () => {
    const response = await fetch(`${host}/api/item`)
    const {data} = await response.json()
    setCommandItems(data)
  }
  fetchCommandItems()
  },[currKey])  
  const comItems = commandItems.map(v => ({
    title: v.item_name
  }))
  const randomItems = shuffleArray(comItems).slice(0, 5);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className='mx-5 d-flex justify-content-center align-items-center my-4'>
      <Stack spacing={2} sx={{}} className='w-75'>
        <Autocomplete
          id="free-solo-demo"
          className=''
          freeSolo
          value={currKey}
          onInputChange={(event, newValue) => {
            setCurrKey(newValue); 
          }}
          options={randomItems.map((option) => option.title)}
          filterOptions={customFilterOptions}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder="搜尋商品"
              onChange={ e => {
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

