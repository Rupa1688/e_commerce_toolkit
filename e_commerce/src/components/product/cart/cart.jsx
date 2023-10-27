import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  decrementQuantity,
  incrementQuantity,
  makePayment,
  removeItem,
} from "../../../slice/cartSlice"
import { useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import styles from "./cart.module.css";
import { Card } from "@mui/material";
import { applyPromocode } from "../../../slice/discountSlice";
import { toast, ToastContainer } from "react-toastify";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Cart = ({ cartData,setcartData }) => {
let total=0
let discount=0
let des=0
  const dispatch = useDispatch()
  
  const addapplyPromocode=useSelector((state)=>state.services?.addapplyPromocode)
  useEffect(() => {
    if(addapplyPromocode && addapplyPromocode.message){
      toast.success(addapplyPromocode.message)
      // setTimeout(() => {
      //   dispatch(clearState())
      // }, 1000);
    }
  },[addapplyPromocode])    
  console.log("addapplyPromocode",addapplyPromocode);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    // console.log("ghg",data);
    dispatch(applyPromocode(data))
  };

  return (
    <div>     
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={{ xs: 0, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.grid_container}>              
        {cartData &&
          cartData.length > 0 &&
          cartData?.map((item) => {
            total+=item.price*item.quantity  
             discount= addapplyPromocode && addapplyPromocode.discount ? total*addapplyPromocode.discount/100:0  
          
              des=total-discount
              console.log("des",des);
          return (
            
              <Grid key={item._id} xs={16}>
                <Item><img src={`../../variant/${item.image}`} className={styles.prouct_img}  alt=""  height={"200px"} width={"250px"} /></Item>
                <Item>{item.name}</Item>
                <Item>{item.desc}</Item>
                <Item> <strong>size:{item.size}</strong></Item>
                <Item> <strong>price:{item.price}</strong></Item>
                <Item >
                  <h6>quantity:</h6>
                <div className={styles.quantity}>
                <div className={styles.dec}>
                
                <button
                  className={styles.cart_decr}
                  onClick={() => dispatch(decrementQuantity({_id:item._id,setcartData:(data)=>setcartData(data)}))}
                >
                   -
               </button>
               </div>
                <p>{item.quantity}</p>
                <div className={styles.inc}>
                    <button
                    className={styles.cart_incr}
                    onClick={() => dispatch(incrementQuantity({_id:item._id,setcartData:(data)=>setcartData(data)}))}
                      >
                    +
                  </button>
                </div>
                </div>
                <div className={styles.emptyItem}>
                <button
                  className="cartItem__removeButton"
                  onClick={() => dispatch(removeItem({_id:item._id,setcartData:(data)=>setcartData(data)}))}
                >
                  Remove
                </button>
                </div>
                </Item>
                <Item> <strong>price:{item.price*item.quantity}</strong></Item>
              </Grid>                      
          )          
        })        
        }
       <div>
           <button onClick={()=>dispatch(makePayment({cartData,des})) }> Buy Now</button>
        </div>
      
 <div>Grand Total:
 {total-discount}
  </div>
          </Grid>
          </Box> 
        
          
          <form onSubmit={handleSubmit(onSubmit)}>
          
        <div className="form-control">
          <label>apply promocode</label>
          <input type="text" name="promocode" {...register("promocode")} />
          <button type="submit">Submit</button>
        </div>                           
      </form>
      <ToastContainer />       
    </div>
    
  )
}
