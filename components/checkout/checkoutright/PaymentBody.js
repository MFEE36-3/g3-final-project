import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PiggyBank from '@/public/trycheckoutimage/Piggy.svg'
import Money from '@/public/trycheckoutimage/money.svg'
import styled from '@emotion/styled';
import Image from 'next/image';

const Money1 = styled.img`
    @keyframes MoneyRun{
        0%{
            transform:rotateY(0deg)
        }
        50%{
            transform:rotateY(360deg)
        }
        100%{
            transform:rotateY(720deg)
        }
    }
    animation: MoneyRun 8s ease infinite;
`
export default function CreditCardForm({selected}) {
  return (<>
    {selected === 0 &&<div style={{height:"40%"}} className='col-10 d-flex mx-auto align-items-center mt-3 border-bottom border-3 w-100 justify-content-center'>
      <div>
        <Image src={PiggyBank} className=' h-50' style={{width:"70%"}}></Image>
      </div>
      <div className='d-flex align-items-center'>
        <Money1 src={Money.src} style={{width:"60%"}}/>
        <div className='fs-1 text-danger' style={{width:"39%"}}>100</div>
      </div>
        
    </div>}
    {selected === 1 &&<Card
      className="mt-3 bg-light border-bottom pb-3 px-0 rounded-0 border-3"
      style={{boxShadow:'none',height:'40%'}}
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
      }}
    >
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
        className="overflow-hidden"
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>卡號</FormLabel>
          <Input endDecorator={<CreditCardIcon />}/>
        </FormControl>
        <FormControl>
          <FormLabel>到期日</FormLabel>
          <Input endDecorator={<CreditCardIcon />} />
        </FormControl>
        <FormControl>
          <FormLabel>安全碼</FormLabel>
          <Input endDecorator={<InfoOutlined />} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>持卡人姓名</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </CardContent>
    </Card>}
    {selected === 2 && <div style={{height:"40%"}}  className='mx-auto p-5 bg-warning-subtle w-50 d-flex justify-content-center mt-3'>QRCODE</div>}
    </>
  );
}