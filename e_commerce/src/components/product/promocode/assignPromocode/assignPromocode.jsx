import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { assignPromocode } from '../../../../slice/discountSlice';
import { useDispatch } from 'react-redux';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AssignPromocode = ({userData,promocodes,setOpen,open }) => {
    console.log("getPromocode",promocodes);
    const [users, setUsers] = React.useState('');
    const [promocodeData, setPromocode] = React.useState('');
const dispatch=useDispatch()
    const handleChange = (event) => {
      setUsers(event.target.value);
    };
    
    const handleOpen = () => {
      
      setOpen(true);
    }
    const handleClose = () => setOpen(false);
  console.log("open",open);
    return (
      <div>
        <Button onClick={handleOpen}>Assign Promocode</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >            
            <Box sx={style}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <label>users:</label>
                <Select
                  value={users}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>select user</em>
                  </MenuItem>
                  {userData && userData !== undefined && userData.length > 0 && userData.map((user)=>(            
                      <MenuItem value={user._id} key={user._id}>{user.name}</MenuItem>          
                  ))}        
                </Select>        
              </FormControl><br></br>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
              <label>promocode:</label>
                <Select
                  value={promocodeData}
                  onChange={(e)=>{setPromocode(e.target.value)}}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>select promocode</em>
                  </MenuItem>
                  {promocodes && promocodes !== undefined && promocodes.length > 0 && promocodes.map((promocode)=>{      
                    
                    let date=new Date(promocode.expiryDate).toLocaleDateString();
                    const currentDate = new Date().toLocaleDateString();
                    if(date >= currentDate){
                    console.log("currentDate.expiryDate",date);                    
                     return(<MenuItem value={promocode._id} key={promocode._id}>{promocode.promocode}</MenuItem>)
                    }
                  })}        
                </Select>        
              </FormControl>
              <button  onClick={(e)=>{dispatch(assignPromocode({users,promocodeData}))}}>save</button>              
          </Box>
        </Modal>
      </div>
    );
}
