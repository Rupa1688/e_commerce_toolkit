import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataProduct } from '../../../slice/productSlice';
import styles from "./attribute.module.css";
import { addAttributeData } from '../../../slice/attributeSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    export const Attribute = () => {
        
    const [inputFields, setInputFields] = useState([{
        size:'',
    } ]);
    
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllDataProduct())
        },[dispatch])


        const productAllData = useSelector((state) => { return state?.product?.getAllProduct?.products})
        const addAttributeProduct = useSelector((state) => { return state?.attribute?.addAttributeProduct?.message})
        console.log("addAttributeProduct",addAttributeProduct);
    const addInputField = ()=>{
        setInputFields([...inputFields, {
            size:'',
        } ])
      
    }
    const removeInputFields = (index)=>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
   }
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);     
}
const [product, setProduct] = useState("")
const [validation, validationChange] = useState(false)

const addAttribute=()=>{
    console.log("inputFields11",inputFields);
 
    validationChange(true)
    let arr=[]
    const inputsAttribute=inputFields.map((inputdata, index)=>{
        if(inputdata.size !== ""){
            console.log("tt",inputdata);
         
              arr.push(inputdata.size)
        }
    })
    if(product !== "" && arr.length > 0){
        let data={
            product_id:product,
            size:arr
        } 
        console.log("tt",data);
    dispatch(addAttributeData(data))
    }
   
}
const productChange = (event) => {
    setProduct(event.target.value)
    //  (()=> {alert(`Value: ${product}`)});
    console.log("Value",product);
    } 
    if(addAttributeProduct){
        toast.success(addAttributeProduct, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
   
    
    return(
      
        <>
          {/* <button onClick={showToastMessage}>Notify</button> */}
        <ToastContainer />
        <Card className={styles.attribue_card} >
            
        <div className={styles.container}>
          <div className={styles.row_data}>              
           <span className={styles.category_span}>product:</span>
            <select name="product" value={product ? product :""} className={styles.attribute_select} onChange={productChange}>
              <option value="">select product</option>         
                 {productAllData && productAllData !== undefined && productAllData.length > 0 && productAllData.map((cat,k)=>{         
                        return(                            
                            <option value={cat._id} key={cat._id}>{cat.name}</option>                                      
                        )
                    })
                    }   
                
             </select>
             {product === "" && validation && (
              
            <span className={styles.product_cust}>select the product</span>
          )}
            
             {/* <> */}
                  {
                      inputFields.map((data, index)=>{
                          const {size}= data;
                         console.log("ssd",data);
                          return(
                            <>
                            <div key={index}>
                                <div className={styles.add_textBox}>
                                    <div className={styles.addmargin_textbox}>
                                       <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={size} name="size"   placeholder="size" />
                                    </div>
                                </div>
                            
                                <div className={styles.deleteButton_div}>    
                                  <div className={styles.deleteButton_icon}>
                                    
                                {(inputFields.length!==1)? <button onClick={removeInputFields}> <DeleteIcon /></button>:''}                                                        
                                  </div>
                                </div>
                             
                            </div>       
                            {/* {inputFields[index].size === "" && validation && (
              
                            <span className="text-danger">select the product</span>
                            )}                                      */}
                            </>
                          )
                      })
                  }
             {/* </> */}
                <div className={styles.row}>
                    <div className={styles.col-12}>
                    <button className={styles.add_new} onClick={addInputField}>Add New</button>
                    </div>
                </div>
                  </div>
                </div>
             
          
            <button type='submit' className={styles.add_attribute} onClick={addAttribute}> Add Attribute</button>
        </Card>
        </>
    )
    }

