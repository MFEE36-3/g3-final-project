import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputArea from '../common/input';

export default function OpenShopForm({ openForm, handleopenFormClose, opentargetstore, data }) {

    return (<>

        <Dialog open={openForm} onClose={handleopenFormClose}>

            {/* 記得要用全部的資料去map 不是篩選後的 */}
            {data.filter((v) => opentargetstore === v.sid).map((v) => {
                return (<>
                    <DialogTitle style={{ textAlign: 'center' }}>開團單</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>開團店家:{v.shop}</div>
                            <div>{v.res_desc}</div>
                        </DialogContentText>

                        <div style={{ width: '100%' }}>
                            <InputArea fullWidth />
                        </div>
                    </DialogContent>
                </>)
            })}


            <DialogActions>
                {/* <div onClick={handlebuyformeClose}>Cancel</div>
    <div onClick={handlebuyformeClose}>Subscribe</div> */}
            </DialogActions>
        </Dialog>
    </>)
};