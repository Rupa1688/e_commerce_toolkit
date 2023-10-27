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
import { getVaraint, varaintId } from '../../../../slice/variantSlice';
import './variant.css';
import { useState } from 'react';
import { getAttributeData } from '../../../../slice/attributeSlice';
import { addToCart } from '../../../../slice/cartSlice';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const GetVariant = ({setcartData}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {id} = useParams();
  const [VarientKey,setVarientKey]=useState(null)
  const [productSize,setProductSize]=useState(null)
  
  const products = useSelector((state) => { return state?.variant?.allVariant?.variantProduct})
  const variant = useSelector((state) => { return state?.variant?.variant?.variantProduct})
  const attributes = useSelector((state) => {return state?.attribute?.attributeProduct?.attribute})

  
  console.log("pr",products);
  console.log("attribute",attributes);
  
  useEffect(()=>{        
    dispatch(getVaraint(id))
    dispatch(getAttributeData(id))
  
    
    },[dispatch,id])
    
    const logout=()=>{
        navigate("/user/login")
    }
    
// const addCart=(productData,size)=>{
//   const data= {...productData, productSize:size }
//   // console.log("productData",productData,size);

// // const data={
// //   productData,
// //   size:size
// // }
// console.log("dataaaaaaaaaaa",data);
// }

  return (
    <>  
{(()=>{
  if(variant && variant !== undefined && variant?.length > 0){
  return(
    <div  className="getVariantById">
    {variant[0].variant_image !== undefined && variant[0].variant_image?.length > 0 && variant[0].variant_image?.map((img,k)=>(               
      <div key={k} className="allVariantType">                   
        <button onClick={(e)=> setVarientKey(k)}>
          <img src={`../../variant/${img}`} alt=""  height={"50px"} width={"50px"} />
        </button>
      </div>              
    ))} 
    {VarientKey && VarientKey !== null ?
        <div className="getVariant">             
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>         
              <Grid item xs={2} sm={4} md={4} >
                  <Item>                
                  <img src={`../../variant/${variant[0].variant_image[VarientKey]}`} alt=""  height={"450px"} width={"450px"} />           
                  </Item>                   
              </Grid>
        </Grid>
      </Box> 
      </div>
    :(
      <div className="getVariant">
          <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>         
              <Grid item xs={2} sm={4} md={4} >
                  <Item>                
                    <img src={`../../variant/${variant[0].image}`} alt="" height={"450px"} width={"450px"} />                
                  </Item>                   
              </Grid>
        </Grid>
      </Box> 
      </div> 
    )}                      
    <div className="descriptionVariant">
        name:{variant[0].name}<br /><br />
        description:{variant[0].desc}<br /><br />
        price:{variant[0].price}<br /><br />
        size:<select name="size" onChange={(e)=>setProductSize(e.target.value)} value={productSize ? productSize :""}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <option value="">select size</option>
              {attributes && attributes !== undefined && attributes.length > 0 && attributes.map((attribute,index)=>(
                 <option value={attribute._id}>{attribute.size}</option>
              ))}
              </select><br /><br />
              {/* <button onClick={()=>{dispatch(addToCart(variant[0],{productSize}))}}>ADDTOCART</button>    */}
              <button onClick={()=>{dispatch(addToCart({...variant[0],productSize,setcartData:(data)=>setcartData(data)}))}}>ADDTOCART</button>       
    </div>
  </div>
  )
  }else if(products && products !== undefined && products.length > 0){
  return(    
      <div className="getVariantById" >  
        {products[0].variant_image !== undefined && products[0].variant_image?.length > 0 &&products[0].variant_image?.map((img,k)=>(               
          <div key={k} className="allVariantType">                   
            <button onClick={(e)=> setVarientKey(k)}>
              <img src={`../../variant/${img}`} alt=""  height={"50px"} width={"50px"} />
            </button>
          </div>              
        ))} 
          {VarientKey && VarientKey !== null ?
              <div className="getVariant">             
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>         
                    <Grid item xs={2} sm={4} md={4} >
                        <Item>                
                        <img src={`../../variant/${products[0].variant_image[VarientKey]}`} alt=""  height={"450px"} width={"450px"} />           
                        </Item>                   
                    </Grid>
              </Grid>
            </Box> 
            </div>
          :(
            <div className="getVariant">
                <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>         
                    <Grid item xs={2} sm={4} md={4} >
                        <Item>                
                          <img src={`../../variant/${products[0].image}`} alt="" height={"450px"} width={"450px"} />                
                        </Item>                   
                    </Grid>
              </Grid>
            </Box> 
            </div> 
          )}                      
          <div className="descriptionVariant">
              name:{products[0].name}<br /><br />
              description:{products[0].desc}<br /><br />
              price:{products[0].price}<br /><br />            
              size:<select name="size" onChange={(e)=>setProductSize(e.target.value)} value={productSize ? productSize :""}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <option value="">select size</option>
              {attributes && attributes !== undefined && attributes.length > 0 && attributes.map((attribute,index)=>(
                 <option value={attribute._id}>{attribute.size}</option>
              ))}
              </select><br /><br />
              <button onClick={()=>{dispatch(addToCart({...products[0],productSize,setcartData:(data)=>setcartData(data)}))}}>ADDTOCART</button>
              {/* <button onClick={cartAdded({...products[0],productSize})}>ADDTOCART</button>        */}
            
            
          </div>
      </div>
    )
  }
 })()}     
 <div className="heading_variant">
  <span className='variant_span'>Those variant of products</span>
  </div>   
{products && products !== undefined && products.length > 0 && products.map((product,k)=>{  
  return(      
    <div className="allVariant_container">
      <div className="allVariant">  
      <button onClick={()=>{dispatch(varaintId(product._id))}} className="allVariant_button">
          <img src={`../../variant/${product.image}`} alt=""  height={"50px"} width={"50px"} />
      </button>
      </div> 
      </div>
  )
})}
{/* <button onClick={logout}>logout</button>  */}
</>
 )
}
