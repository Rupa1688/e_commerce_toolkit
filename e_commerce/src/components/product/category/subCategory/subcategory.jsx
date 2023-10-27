import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategory } from '../../../../slice/categorySlice'
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
// import React from 'react';
// import React, * as react from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Spinner } from "react-bootstrap";
// import './subcatecogoty.css';
import styles from "./subcatecogory.module.css";

import { Alert, Stack } from '@mui/material'
export const Subcategory = () => {
const category = useSelector((state) => { return state?.category?.categoryProduct?.category})
const categoryAddMessage = useSelector((state) => { return state?.category?.categoryProduct?.message})
const isLoading = useSelector((state) => {return state.category.isLoading})
const error = useSelector((state) =>{return state.category.error})

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

    const logout=()=>{
        navigate("/user/login")
    }
    const initialValues={
        name: '', 
        image: '',
        parent_id: '',
    }    
      
    const handleSubmit=(values)=>{
        console.log("vv",values);  
        const formData = new FormData()
       for (let value in values) {
          console.log("formData",values[value]);
          formData.append(value, values[value]);
        }
   
           dispatch(addCategory(formData))
    }
  var validationSchema= Yup.object({
        name: Yup.string().required('Required'),       
        image: Yup.string().required('Required'),
        parent_id: Yup.string().required('Required'),
      })
  return (
   
 <>
  { categoryAddMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{categoryAddMessage}</Alert>
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
          <span className={styles.category_name}>category name:</span>
           <Field type="text" name="name" className={styles.name}/>
           <div className={styles.errorMessage}>
           <ErrorMessage name="name"  className={styles.name} image component="div" />
           </div>
           <span  className={styles.category_image}>image:</span>
           <Field type="file" name="image" className={styles.image} value={values.image ? undefined : ""}
            // defaultValue={typeof(formObject && formObject?.name) !== undefined ? formObject?.name : undefined}
            // defaultValue= {typeof(file) !== '' ? file : undefined} 
            // onChange={ e => handleFile(e)}  
          onChange={(event) => setFieldValue("image",event.currentTarget.files[0])} />
           
           <div className={styles.errorMessage}>
           <ErrorMessage name="image"  className={styles.image} component="div" />
           </div>
                  <>
          <span className="category_span">category:</span>
           <Field as="select" name="parent_id" className="category_select">
              <option value="">select category</option>
         
                 {category && category !== undefined && category.length > 0 && category.map((cat,k)=>{         
                        return(                            
                            <option value={cat._id} key={cat._id}>{cat.name}</option>                                      
                        )
                    })
                    }   
                
             </Field>
             <div className={styles.errorMessage}>
                <ErrorMessage name="parent_id"  className={styles.parent_id} component="div" />
                </div>
             </>  
           <button type="submit" className={styles.subCategoryAdd}>
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
