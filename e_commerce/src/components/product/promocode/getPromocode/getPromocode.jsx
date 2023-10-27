import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearState, getAllPromocode } from '../../../../slice/discountSlice'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { AssignPromocode } from '../assignPromocode/assignPromocode';
import { getAllUser } from '../../../../slice/userSlice';
import { toast, ToastContainer } from 'react-toastify';
// import { ToastContainer } from 'react-bootstrap';

export const GetPromoCode = () => {
const getPromocode= useSelector((state)=>state?.services?.getPromocode.promocodeData)
const userData= useSelector((state)=>state?.user?.userData?.users)
console.log("userData",userData);
const addAssignPromocode= useSelector((state)=>state?.services?.addAssignPromocode?.message)
console.log("addAssignPromocode",addAssignPromocode);
    const dispatch=useDispatch()
    const [open, setOpen] = React.useState(false);
    useEffect(()=>{
        dispatch(getAllPromocode())
        dispatch(getAllUser())
    },[dispatch])
    useEffect(() => {
        if(addAssignPromocode){
          toast.success(addAssignPromocode)
          setTimeout(() => {
            dispatch(clearState())
            setOpen(false)
          }, 1000);
        }     
        
      }, [dispatch,addAssignPromocode])
  return (
<>
    <List sx={{ width: '100%', maxWidth: 512}} className="listItem_cust">
        <ListItem>
            <ListItem>title</ListItem>
            <ListItem>promocode</ListItem>
            <ListItem>discount</ListItem>
            <ListItem>expiry date</ListItem>
            <ListItem>expire</ListItem>
        </ListItem>       
{getPromocode && getPromocode.length>0 && getPromocode!== undefined && getPromocode.map((value,key) => {
let date=new Date(value.expiryDate).toLocaleDateString();
const currentDate = new Date().toLocaleDateString();
if(date < currentDate){
console.log("currentDate.expiryDate",date);
}

return(   
        <ListItem key={value._id}>
        <ListItem>{value.title}</ListItem>
        <ListItem>{value.promocode}</ListItem>
        <ListItem>{value.discount}</ListItem>
        <ListItem>{value.expiryDate}</ListItem>
        <ListItem>{date < currentDate ? "expire" : "active"}</ListItem>
        
    </ListItem>
    )   

})}
    
  </List>
  <AssignPromocode userData={userData} promocodes={getPromocode} setOpen={setOpen} open={open}/>
  <ToastContainer />       
  </>
  )
        
}
