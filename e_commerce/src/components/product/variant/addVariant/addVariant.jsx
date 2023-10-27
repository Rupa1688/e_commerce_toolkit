import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Spinner } from "react-bootstrap";
import './index.css';
import { Alert, Stack } from '@mui/material'
import { getAllDataProduct } from '../../../../slice/productSlice'
import { addVariant } from '../../../../slice/variantSlice'
import { useState } from 'react'
export const AddVariant = () => {
const dispatch=useDispatch()
const navigate=useNavigate() 
// const category = useSelector((state) => { return state?.category?.categoryProduct?.category})
// const categoryAddMessage = useSelector((state) => { return state?.category?.categoryProduct?.message})
const productAllData = useSelector((state) => { return state?.product?.getAllProduct?.products})

const createVariant = useSelector((state) => { return state?.variant?.createVariant})
const isLoading = useSelector((state) => {return state.product.isLoading})
const error = useSelector((state) =>{return state.product.error})
 console.log("createVariant",createVariant);

    const logout=()=>{
        navigate("/user/login")

    }
const [fileData,setFileData]=useState([])
useEffect(()=>{
dispatch(getAllDataProduct())
},[dispatch])

    const initialValues={
        name: '', 
        image: '',
        variant_image:null,
        product_id: '',
        description:'',
        price:'',
        color:'',
    }    
    // let arr=[]
      const uploadImage=(event)=>{
        // // setFileData(event.target.files)
        // fileData.push(event.target.files)
        const fileData=event.target.files
        console.log("event1111",fileData);
         
//         for(let i=0;i <= fileData.length;i++){
//           console.log("event",fileData[i]);
// arr.push(fileData[i])
//         }
      }
    const handleSubmit=(values)=>{
        console.log("vv",values);     
        const formData = new FormData()
        for (let value in values) {
            console.log("formData",value);
            if(value === "variant_image"){            
              const fileData=values.variant_image
              for(let i=0;i <= fileData.length;i++){       
                formData.append("variant_image", fileData[i]);            
            }         
          }else{        
            formData.append(value, values[value]);       
          }
      }

           dispatch(addVariant(formData))
    
  }
  var validationSchema= Yup.object({
        name: Yup.string().required('Required'),       
        image: Yup.string().required('Required'),
        variant_image: Yup.array().required('Required'),
        product_id: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        price: Yup.string().required('Required'),
        color: Yup.string().required('Required'),
      })
  return (
   
 <>
  {/* { categoryAddMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{categoryAddMessage}</Alert>
        </Stack>
      )} */}
  <Formik
       initialValues={initialValues}    
      validationSchema={validationSchema}  
       onSubmit={handleSubmit}
     >
       {({ values, setFieldValue }) => (
        <div>
        <Card className="categoryCard" >
         <Form encType="multipart/form-data">
          <span className="variant_name">Variant Name:</span>
          <Field type="text" name="name" className="name"/>
          <div className="errorMessage">
            <ErrorMessage name="name"  className="variant_name_err"  component="div" />
          </div>
          <span  className="category_image">Image:</span>
          <Field type="file" name="image" className="image_v" value={values.image ? undefined : ""}           
           onChange={(event) => setFieldValue("image",event.currentTarget.files[0])} />           
           <div className="errorMessage">
             <ErrorMessage name="image"  className="image_v_err" component="div" />
           </div>
           <span  className="variant_image">variant_image:</span>
          <Field type="file" name="variant_image" className="variant_image_fields" value={values.variant_image ? undefined : ""} multiple   
              
          onChange={(event) => setFieldValue("variant_image", Array.from(event.currentTarget.files))} />
        {/* // onChange={(e)=>uploadImage(e)} />  */}
           <div className="errorMessage">
             <ErrorMessage name="variant_image"  className="variant_image_err" component="div" />
           </div>
         <>
          <span className="category_span">product:</span>
           <Field as="select" name="product_id" className="category_select">
              <option value="">select product</option>
         
                 {productAllData && productAllData !== undefined && productAllData.length > 0 && productAllData.map((cat,k)=>{         
                        return(                            
                            <option value={cat._id} key={cat._id}>{cat.name}</option>                                      
                        )
                    })
                    }   
                
             </Field>
             <div className="errorMessage">
                <ErrorMessage name="product_id"  className="variant_product_id" component="div" />
             </div>            
          </>  
          <span className="category_desc">Description:</span>
           <Field type="text" name="description" className="description"/>
           <div className="errorMessage">
           <ErrorMessage name="description"  className="variant_description_err"  component="div" />
           </div>
           <span className="category_price">Price:</span>
           <Field type="number" name="price" className="price"/>
           <div className="errorMessage">
           <ErrorMessage name="price"  className="variant_price_msg"  component="div" />
           </div>
           <span className="color">Color:</span>
           <Field type="text" name="color" className="variant_color"/>
           <div className="errorMessage">
           <ErrorMessage name="color"  className="variant_color_msg"  component="div" />
           </div>
           <button type="submit" className="variantAdd">
             Submit
           </button>
             
         </Form>
         </Card>
         </div>
       )}
     </Formik>
     <div className='logout-control'>
     <button onClick={logout} className="logout">logout</button>
     </div>
    </>

  )

}
