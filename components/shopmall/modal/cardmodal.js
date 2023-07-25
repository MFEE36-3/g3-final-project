import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import jayni from '@/public/trycheckoutimage/jayni.png'
import Image from 'next/image';
import { styled } from 'styled-components';
import {  AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height:'50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Inputborder = styled.input`
  &:focus{
    outline:none
  }
`
export default function CardModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='container-fulid '
      >
        <Box sx={style} className='d-flex row'>
          <div className='col-7 h-100'>
            <img src={jayni.src} className='w-100'></img>
          </div>
          <div className='col-5 h-100'>
          <Typography id="modal-modal-title" variant="h3" component="h2" className='h-25 d-flex justify-content-center pt-3'>
            ItemName
            </Typography>
            <Typography id="modal-modal-description" variant="h5" sx className='d-flex flex-column justify-content-between h-75'>
              <div className='d-flex justify-content-between'>
                <div>Price</div>
                <div>
                  <div>廠商:</div>
                  <div>庫存:</div>
                </div>
              </div>
              <div className='position-relative'>
                <div className='w-75 d-flex align-items-center mx-auto border border-secondary border-2 justify-content-center rounded-5 mb-4 position-relative'>
                <Button variant="text" className='p-0 h-100 rounded-start-5 text-danger'>
                  <AiOutlineMinus className='fs-1 p-1'/>
                </Button>
                <Inputborder className='w-50 fs-3 border-0 text-center mx-5' value={1} readOnly></Inputborder>
                <Button variant="text" className='p-0 rounded-end-5 text-danger'>
                  <AiOutlinePlus className='fs-1 p-1'/>
                </Button>
                </div>
                <Button variant="text" className='border-0 rounded-3 w-100 text-light fs-3' style={{background:"#911010"}}>加入購物車</Button>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}