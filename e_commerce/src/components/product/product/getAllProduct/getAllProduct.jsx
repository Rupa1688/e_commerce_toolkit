import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../../../slice/productSlice'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export const GetAllProduct = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id} = useParams();
    console.log("iss",id);

    const products = useSelector((state) => { return state?.product?.allProduct?.productCategory})
    // console.log("pr",products);
    useEffect(()=>{        
    dispatch(getAllProduct(id))
    },[dispatch])
  
    
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {products && products !== undefined && products.length > 0 && products.map((product,k)=>{  
        return(             
            <Grid item xs={2} sm={4} md={4} key={k}>
                <Item><img src={`../../products/${product.image}`} alt=""  height={"200px"} width={"250px"} /></Item>
                <Item>{product.name}</Item>
                <Item>{product.desc}</Item>
                <Item>price:{product.price}</Item>
                <Item><a href={`/product/variant/${product._id}`}>show more Details</a></Item>
                
            </Grid>)
      })}
      </Grid>
    </Box> 
        {/* <button onClick={logout}>logout</button>  */}
    </div>
  )
}
