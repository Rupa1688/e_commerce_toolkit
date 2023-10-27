import React, { useEffect } from 'react'

import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
// import React from 'react';
// import React, * as react from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
// import './index.css';
import styles from "./promocode.module.css";
// import { addPromocode, clearState } from '../../../../slice/discountSlice';
import { ToastContainer, toast } from 'react-toastify';
import { addPromocode, clearState } from '../../../../slice/discountSlice';
const AddPromoCode=()=>{
  // const [file, setFile] = useState("");
  const promocodeAddMessage = useSelector((state) => { return state?.services?.addPromocode?.message})
// const isLoading = useSelector((state) => {return state.category.isLoading})
// const error = useSelector((state) =>{return state.category.error})

//   const [FileldData, setField] = useState({});
//     const navigate=useNavigate()   
const dispatch=useDispatch()   
useEffect(() => {
  if(promocodeAddMessage){
    toast.success(promocodeAddMessage)
    setTimeout(() => {
      dispatch(clearState())
    }, 1000);
  }     
  
}, [dispatch,promocodeAddMessage])

    
    const initialValues={
        title: '', 
        promocode: '',        
        discount: '',  
        expiryDate: new Date(),                  
    }    
    const handleSubmit=(values)=>{
      console.log("values",values)
      const formData = new FormData()
       for (let value in values) {      
          formData.append(value, values[value]);
        }
        dispatch(addPromocode(formData))
    }
  var validationSchema= Yup.object({
        title: Yup.string().required('Required'),       
        promocode: Yup.string().required('Required'),
        discount: Yup.string().required('Required'),
        expiryDate: Yup.string().required('Required'),
      })
      

  
    return(
    <>
    
    
    {/* { promocodeAddMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{promocodeAddMessage}</Alert>
        </Stack>
      )} */}
    <Formik
       initialValues={initialValues}    
      validationSchema={validationSchema}  
       onSubmit={handleSubmit}
     >
       {({ values, setFieldValue }) => (
        <div>
        <Card className={styles.categoryCard} >
         <Form encType="multipart/form-data">
          <span className={styles.title_name}>title:</span>
           <Field type="text" name="title" className={styles.title}/>
           <div className={styles.errorMessage_title_msg}>
           <ErrorMessage name="title" className={styles.title_msg}component="div" />
           </div>
           <span className={styles.promocode_name}>promocode:</span>
           <Field type="text" name="promocode" className={styles.promocode}/>
           <div className={styles.errorMessage_promocode_msg}>
           <ErrorMessage name="promocode" className={styles.promocode_msg} component="div" />
           </div>
           <span className={styles.discount_name}>discount:</span>
           <Field type="number" name="discount" className={styles.discount}/>
           <div className={styles.errorMessage_discount_msg}>
           <ErrorMessage name="discount" className={styles.discount_msg} component="div" />
           </div>
           <span className={styles.expiry_date_name}>expiry date:</span>   
           <div className="row ml-4 mr-4">
            <div className="form-group col-3 mb-2">                 
           <DatePicker 
                      selected={values.expiryDate}
                      // dateFormat="MMMM d, yyyy"
                      dateFormat="d-MM-yyyy"
                      className={styles.expiry_date}
                      name="expiryDate"
                      onChange={date => setFieldValue('expiryDate', date)}                      
                    />         
                    </div>     
                    </div>               
           <div className={styles.errorMessage}>
           <ErrorMessage name="expiry_date" className={styles.expiry_date_msg} component="div" />
           </div>                  
           <button type="submit" className={styles.promocodeAdd}>
             Submit
           </button>
         </Form>
         </Card>
         </div>
       )}
     </Formik>
     <ToastContainer />       
    </>

       
    )
    }
    export default AddPromoCode
