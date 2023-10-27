import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getCategory } from "../../../../slice/categorySlice"
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GetAllCategory=()=>{

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const category = useSelector((state) => { return state?.category?.categoryProduct?.category})
useEffect(()=>{
    dispatch(getCategory())
},[dispatch])

    
    
    return(
      
        <>      
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {category && category !== undefined && category.length > 0 && category.map((cat,k)=>{  
        return(             
            <Grid item xs={2} sm={4} md={4} key={k}>
                <Item><img src={`../images/${cat.image}`} alt=""  height={"200px"} width={"250px"} /></Item>
                <Item>{cat.name}</Item>
                <Item><a href={`/product/product/${cat._id}`}>show more products</a></Item>
            </Grid>)
      })}
      </Grid>
    </Box>
      
        </>
    )
    }
    export default GetAllCategory