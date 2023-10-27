import React, { useEffect } from "react"; 

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, refund } from "../../slice/cartSlice";
import './success.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Success() { 
  const dispatch=useDispatch()
  const tranjectionDetail = useSelector((state) => { return state?.cart?.buyProductDetail?.trajectionDetail})
  const refundData = useSelector((state) => { return state?.cart?.refundData})

  console.log("refundData",refundData);
  useEffect(()=>{
    localStorage.removeItem("cart")    
    dispatch(getProductDetail())
  },[dispatch])
  // if(refundData.message ){
  //   return(  
  //     <div>
  //     {toast(refundData.message)}
  //     <ToastContainer />       
  //     </div>
  //   )
  // }
const date=tranjectionDetail?new Date(tranjectionDetail.createdAt):""
const billingDate=date.toLocaleString();
  const shippingDatail = (
    <React.Fragment>
      <CardContent>
       
     {tranjectionDetail && tranjectionDetail !==undefined &&(
        <Typography variant="body2">         
          name:{tranjectionDetail.shipping.name}<br /><br />
          email:{tranjectionDetail.shipping.email}<br /><br />
          phoneno:{tranjectionDetail.shipping.phone}<br /><br />         
          city:{tranjectionDetail.shipping.address.city} <br /> <br />       
          state:{tranjectionDetail.shipping.address.state} <br /> <br /> 
          country:{tranjectionDetail.shipping.address.country} <br /> <br /> 
          address1:{tranjectionDetail.shipping.address.line1} <br /> <br /> 
          address2: {tranjectionDetail.shipping.address.line2 !==null ? tranjectionDetail.shipping.address.line2:""}<br /><br /> 
          postal_code:{tranjectionDetail.shipping.address.postal_code} <br /> <br /> 

            
        </Typography>
     )}
      
      
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </React.Fragment>
  );
     

//   const card = tranjectionDetail && tranjectionDetail !==undefined && tranjectionDetail.products.length > 0 && tranjectionDetail.products.map((product,k)=>{  
//     return( 
//     <React.Fragment>
//       <CardContent>      
//        <Typography variant="body2">
//            name:{product.name} <br /><br />
//            color:{product.color} <br /><br />
//            desc:{product.desc} <br /><br />
//            price:{product.price} <br /><br />
//            quantity:{product.quantity} <br /><br />
//         </Typography>
//       </CardContent>    
//     </React.Fragment>
//   )
// })
  return ( 
    <> 
    
    {refundData.message &&( <div>
       {toast(refundData.message)}
       <ToastContainer />       
       </div>
       )}
       {refundData.message }
      <h2 className="h2">Thanks for your order!</h2> 
      <h4 className="h4">Your payment is successful.</h4>
      <p className="p" > 
        We appreciate your business! If you have any questions, please email us 
        at 
        <a href="mailto:rupa@gmail.com">orders@example.com</a>. 
      </p> <br/>
      {tranjectionDetail && tranjectionDetail !==undefined &&(
      <Box sx={{ minWidth: 275 }} className="TranjectionBox">
       {tranjectionDetail.products.length > 0 && tranjectionDetail.products.map((product,k)=>{  
return(
  
  <Card variant="outlined" className="TranjectionCard">
  <React.Fragment>
      <CardContent>      
       <Typography variant="body2">        
          <img src={`../../variant/${product.image}`} alt="" height={"150px"} width={"150px"} />  
          <div className="Tranjection">    
            name:{product.name} <br /><br />
            color:{product.color} <br /><br />
            desc:{product.desc} <br /><br />
            price:{product.price} <br /><br />
            quantity:{product.quantity} <br /><br />
          </div> 
        </Typography>
      </CardContent>    
    </React.Fragment>
    </Card>
    
)  
        })  }
       <Card variant="outlined" className="ShippingDetail">Shipping Datail:{shippingDatail}</Card><br></br>
     <div className=" bilingDetail">
      Biling Detail
      <div className="bilingDetail_data">
     {tranjectionDetail.tranjection_id}<br /><br />
      Amount Subtotal: {tranjectionDetail.amountSubTotal}<br /><br />
      Amount Total: {tranjectionDetail.amountTotal}<br /><br />      
      Date:{billingDate}<br /><br />
      payment status: {tranjectionDetail.payment_status}<br /><br />      
      </div>     
     </div>
     <div>
      <button onClick={()=>{dispatch(refund())}}>Refund</button>
     </div>
    </Box>
      )}
    </> 
  
  ); 
} 
 
export default Success; 