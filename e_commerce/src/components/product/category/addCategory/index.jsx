import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
// import React from 'react';
// import React, * as react from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../../slice/categorySlice";
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
// import './index.css';
import styles from "./category.module.css";

const AddCategory=()=>{
  // const [file, setFile] = useState("");
  const categoryAddMessage = useSelector((state) => { return state?.category?.categoryProduct?.message})
const isLoading = useSelector((state) => {return state.category.isLoading})
const error = useSelector((state) =>{return state.category.error})

  const [FileldData, setField] = useState({});
    const navigate=useNavigate()   
    const dispatch=useDispatch()   
    const initialValues={
        name: '', 
        image: '',        
    }
    
    let formObject
    const handleSubmit=(values)=>{
      const formData = new FormData()
       for (let value in values) {
          console.log("formData",values[value]);
          formData.append(value, values[value]);
        }
        //  formObject=formData.get("image");
        // console.log("fb",formObject.name)
           dispatch(addCategory(formData))
    }
    // console.log("fb",formObject)
  var validationSchema= Yup.object({
        name: Yup.string().required('Required'),       
        image: Yup.string().required('Required'),
      })
      
  
    return(
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
        <Card className={styles.categoryCard} >
         <Form encType="multipart/form-data">
          <span className={styles.category_name}>category name:</span>
           <Field type="text" name="name" className={styles.name}/>
           <div className={styles.errorMessage}>
           <ErrorMessage name="name" className={styles.name}component="div" />
           </div>
           <span  className={styles.category_image}>image:</span>
           <Field type="file" name="image" className={styles.image1} value={values.image ? undefined : ""}
            // defaultValue={typeof(formObject && formObject?.name) !== undefined ? formObject?.name : undefined}
            // defaultValue= {typeof(file) !== '' ? file : undefined} 
            // onChange={ e => handleFile(e)}  
          onChange={(event) => setFieldValue("image",event.currentTarget.files[0])} />
           
           <div className={styles.errorMessage}>
           <ErrorMessage name="image" className={styles.image} component="div" />
           </div>
           <button type="submit" className={styles.categoryAdd}>
             Submit
           </button>
         </Form>
         </Card>
         </div>
       )}
     </Formik>
   
    </>

       
    )
    }
    export default AddCategory