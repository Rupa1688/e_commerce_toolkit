import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getProduct } from '../../../../slice/productSlice'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import { getProduct } from '../../../../slice/productSlice';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const GetProduct = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {id} = useParams();
  const product = useSelector((state) => { return state?.product?.productData?.productCategory})
  console.log("pr",product);
  // console.log("iss",id);
  useEffect(()=>{        
    dispatch(getProduct(id))
    },[dispatch])
    
    const logout=()=>{
        navigate("/user/login")
    }
    
  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {product && product !== undefined && product.length > 0 &&(
              
        <Grid item xs={2} sm={4} md={4} >
            <Item><img src={`../../products/${product[0].image}`} alt=""  height={"200px"} width={"250px"} /></Item>
            <Item>{product[0].name}</Item>
            <Item>{product[0].desc}</Item>
            <Item>price:{product[0].price}</Item>
            <Item><a href={`/product/product_id/${product._id}`}>show more Details</a></Item>
            
        </Grid>
   
  )}
  </Grid>
</Box> 
    <button onClick={logout}>logout</button> 
</div>
  )
}
