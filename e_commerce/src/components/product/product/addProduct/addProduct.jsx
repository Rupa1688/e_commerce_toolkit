import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getCategory } from '../../../../slice/categorySlice'
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
// import React from 'react';
// import React, * as react from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Spinner } from "react-bootstrap";
import './index.css';
import { Alert, Stack } from '@mui/material'
import { addProduct } from '../../../../slice/productSlice'
export const AddProduct = () => {
const category = useSelector((state) => { return state?.category?.categoryProduct?.category})
const productMessage = useSelector((state) => { return state?.product?.product?.message})
const isLoading = useSelector((state) => {return state.product.isLoading})
const error = useSelector((state) =>{return state.category.error})
console.log("productMessage",productMessage);
const dispatch=useDispatch()
const navigate=useNavigate() 
useEffect(()=>{
    dispatch(getCategory())
},[dispatch])


    if(isLoading  && isLoading!== undefined && isLoading===true){
        return(
           <Spinner animation="border" className='spinner_parent' role="status" style={{ width: "4rem", height: "4rem" }} variant="secondary">
             <span className="visually-hidden">Loading...</span>
         </Spinner>
        )
       }

  
    const initialValues={
        name: '', 
        product_image: '',
        category_id:'',
        description: '',
        price:''
    }
    
    let formObject
    const handleSubmit=(values)=>{
        console.log("vv",values);  
        const formData = new FormData()
       for (let value in values) {
          console.log("formData",values[value]);
          formData.append(value, values[value]);
        }
   
           dispatch(addProduct(formData))
    }
    // console.log("fb",formObject)
  var validationSchema= Yup.object({
        name: Yup.string().required('Required'),       
        product_image: Yup.string().required('Required'),
        category_id: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        price: Yup.string().required('Required'),
      })
if(productMessage) {
  setTimeout(() => {
  window.location.reload()
  }, "2000");
}
    
      

  return (
   
 <>
  { productMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{productMessage}</Alert>
        </Stack>
      )}
  <Formik
       initialValues={initialValues}    
      validationSchema={validationSchema}  
       onSubmit={handleSubmit}
     >
       {({ values, setFieldValue }) => (
        <div>
        <Card className="categoryCard" >
         <Form encType="multipart/form-data">
          <span className="category_name">Product Name:</span>
          <Field type="text" name="name" className="name"/>
          <div className="errorMessage">
            <ErrorMessage name="name"  className="product_name" image component="div" />
          </div>
          <span  className="category_image">Image:</span>
          <Field type="file" name="product_image" className="image1" value={""}
            // defaultValue={typeof(formObject && formObject?.name) !== undefined ? formObject?.name : undefined}
            // defaultValue= {typeof(file) !== '' ? file : undefined} 
            // onChange={ e => handleFile(e)}  
          onChange={(event) => setFieldValue("product_image",event.currentTarget.files[0])} />
           
           <div className="errorMessage">
             <ErrorMessage name="product_image"  className="product_image1" component="div" />
           </div>
         <>
          <span className="category_span">Category:</span>
           <Field as="select" name="category_id" className="category_select">
              <option value="">select category</option>
         
                 {category && category !== undefined && category.length > 0 && category.map((cat,k)=>{         
                        return(                            
                            <option value={cat._id} key={cat._id}>{cat.name}</option>                                      
                        )
                    })
                    }   
                
             </Field>
             <div className="errorMessage">
                <ErrorMessage name="category_id"  className="product_category_id" component="div" />
             </div>            
          </>  
          <span className="category_desc">Description:</span>
           <Field type="text" name="description" className="description"/>
           <div className="errorMessage">
           <ErrorMessage name="description"  className="product_description_err"  component="div" />
           </div>
           <span className="category_price">Price:</span>
           <Field type="number" name="price" className="price"/>
           <div className="errorMessage">
           <ErrorMessage name="price"  className="product_price_msg"  component="div" />
           </div>
           <button type="submit" className="productAdd1">
             Submit
           </button>
             
         </Form>
         </Card>
         </div>
       )}
     </Formik>
     {/* <div className='logout-control'>
     <button onClick={logout} className="logout">logout</button>
     </div> */}
    </>

  )
}
