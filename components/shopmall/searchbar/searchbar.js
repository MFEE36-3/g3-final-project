import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { css, keyframes } from '@emotion/react';

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
      border: "none",
      background: "#E4E2DF",
      borderRadius:"20px"
      
    },
    "& input": {
      color: "black",
      zIndex: 2,
      fontSize: "var(--h4)",
    },
    "& button": {
      color: "black",
      zIndex: 2,
    },
    "&:hover fieldset": {
      borderColor: "var(--main-color)",
      border: "2px solid var(--main-color)",
    },
  },
});
//這邊去把你的商品名稱用進來
const items = [
    { title: '超級好' },
    { title: '讚讚' },
    { title: '吃吃' },
    { title: 'go eat' },
    { title: 'run run run' },
    { title: '臺北科技大學愛吃白飯系' },
    { title: '熱炒店停業' },
    { title: '台灣媒體素質' },
    { title: '可撥' },
  ];
//隨機產生五筆
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }  
const randomItems = shuffleArray(items).slice(0, 5);
///
export default function FreeSolo() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  const handleSearch = () => {
    const keywordValue = keyword?.trim() || '';
  
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
    setKeyword(value || '');  }
    ,[router.query]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className='mx-5 d-flex justify-content-center align-items-center my-4'>
      <Stack spacing={2} sx={{}} className='w-25'>
        <Autocomplete
          id="free-solo-demo"
          className=''
          freeSolo
          value={keyword}
          onChange={(event, value) => setKeyword(value)}
          options={randomItems.map((option) => option.title)}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder="搜尋商品"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}
        />
        {console.log(router.query)}
        {console.log(keyword)}
      </Stack>
      <StyledBiSearch className='fs-1 ms-3 ' onClick={handleSearch} />
    </div>
  );
}

