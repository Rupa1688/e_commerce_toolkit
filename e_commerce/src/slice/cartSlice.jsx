import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

import axios from 'axios'
// export const addToCart = createAsyncThunk(
//     'addToCart',
//     async (attribute) => {   
//         // console.log("attribute",attribute);
//         // const res = await axios.post('http://localhost:4001/product/addAttribute',attribute)
//         // const data = await res.data
//         // console.log("data",data);
    
//         // return data
    
//     }
//   )


 export const makePayment = createAsyncThunk(
      'makePayment',
      async ({cartData,des}) => {   
      console.log("des1",des);
      const user = localStorage?.getItem("data")
      ? JSON.parse(localStorage?.getItem("data"))
      : ""
      const customerData={user,cartData,des}
        const stripe = await loadStripe("pk_test_51N2pSMSEsz94il2uKSb0bh1sNX6EvL2otUrfDdXaqWocdbrLComG22aqGjXeDCpeH1ob0Wq0AXLCGOHnLFdTdEkF00EICybkLp");
        
          const res = await axios.post(`${process.env.REACT_APP_BASE_URL}api/create-checkout-session`,customerData)
          const data = await res.data
          console.log("data",data);
           sessionStorage.setItem("transactionId",JSON.stringify(data))
          const result = stripe.redirectToCheckout({ 
            sessionId: data.id, 
          }); 
       
          if (result.error) { 
            console.log(result.error); 
          } 
   
          // return data
      
      }
    )
    export const refund = createAsyncThunk(
      'refund',
      async () => {   
        console.log("hello")
        const transactionId = sessionStorage?.getItem("transactionId")
        ? JSON.parse(sessionStorage?.getItem("transactionId"))
        : ""
        console.log("transactionId1",transactionId)
       
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}api/refund`,transactionId,{
          headers : { 
            'ngrok-skip-browser-warning':true
          }
        })
        const data = await res.data
        console.log("transactionIddata1",data);
    
        return data
   
      
      }
    )
    
    export const getProductDetail = createAsyncThunk(
      'getProductDetail',
      async () => {   
        const transactionId = sessionStorage?.getItem("transactionId")
        ? JSON.parse(sessionStorage?.getItem("transactionId"))
        : ""
        console.log("transactionId",transactionId)
       
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}api/transactionDetail?transactionId=${transactionId.id}`,{
          headers : { 
            'ngrok-skip-browser-warning':true
          }
        })
        const data = await res.data
        console.log("transactionIddata",data);
    
        return data
      }
      )
    

  export const cartSlice = createSlice({  
    name: 'cart',

    initialState: {
      buyProductDetail:[],      
      refundData:[],
      isLoading: false,
      error: null,
    },
    reducers: {
        addToCart: (state, action) => {    
          // console.log("npm install dotenv --save",`${process.env.REACT_APP_BASE_URL}product/parrent_category`)
          console.warn("action",action.payload)
          const values=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
          let arr=[]
          arr=values
          const itemInCart = arr && arr?.find((item) =>item?._id === action.payload._id);
          console.log("itemInCart",itemInCart);
          if (itemInCart &&itemInCart!==undefined && itemInCart._id) {  
            itemInCart['quantity']=itemInCart['quantity']+1            
            state['cart'] =itemInCart       
          } else {           
            state['cart']={ ...action.payload, quantity: 1 }           
          }
          const cart = arr && arr?.findIndex((item) =>item?._id === state.cart._id);
           console.warn("state",state.cart,cart)
          if (cart > -1) {        
            arr[cart]['quantity']= state.cart.quantity                              
          } else {           
           arr.push(state.cart)
          }
          console.warn("arr111111111",arr)


       localStorage.setItem('cart', JSON.stringify(arr));                    
          action?.payload?.setcartData(arr)
          
          // const itemInCart = state.cart.find((item) =>           
          //   current(item)._id === action.payload._id          
          // );
          // if (itemInCart) {
              
          //   itemInCart.quantity++;
          //   console.log("item",current(itemInCart));
              
          // } else {
           
          //   state.cart.push({ ...action.payload, quantity: 1 });
          //   // console.log("action.payload11",action.payload);
           
          // }
          // localStorage.setItem('cart', JSON.stringify(state.cart));
          // console.log("action.payload",current(state));
        },
        incrementQuantity: (state, action) => {
          console.warn("action",action.payload)
          const values=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];         
            const itemInCart =  values?.findIndex((item) =>item?._id === action.payload._id);         
          if (itemInCart > -1) {        
            values[itemInCart]['quantity'] = values[itemInCart]['quantity']+1;                            
          }
          localStorage.setItem('cart', JSON.stringify(values));                          
          action?.payload?.setcartData(values)
      
        },
        decrementQuantity: (state, action) => {
          
          const values=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
          console.log(values,"ghcnchrkfhdljflkdjfldj")
            const itemInCart =  values?.findIndex((item) => item?._id === action.payload._id);
          console.log("itemInCart",itemInCart);
          if (itemInCart > -1) {    
            if(values[itemInCart]['quantity']===1)   {
              values[itemInCart]['quantity'] = 1
            } else{
              values[itemInCart]['quantity'] = values[itemInCart]['quantity']-1;      
            }
                                
          }
          console.log(values,"ghcnchrkfhdljflkdjfldj111")
     
          localStorage.setItem('cart', JSON.stringify(values));                          
          action?.payload?.setcartData(values)

          // const item = state.cart.find((item) => item.id === action.payload);
          // if (item.quantity === 1) {
          //   item.quantity = 1
          // } else {
          //   item.quantity--;
          // }
          // localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeItem: (state, action) => {
          const values=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
          console.log(values,"ghcnchrkfhdljflkdjfldj")
          const removeItem = values.filter((item) => {
           console.log("itemitemitemitem",item)  
             return  item._id !== action.payload._id
            });
            console.log("itemitemitemitem",removeItem)  
          localStorage.setItem('cart', JSON.stringify(removeItem));                          
          action?.payload?.setcartData(removeItem)

          // const removeItem = state.cart.filter((item) => item.id !== action.payload);
          // state.cart = removeItem;
          // localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
    extraReducers: (builder) => {    
      console.log("builder",builder);
      builder.addCase(getProductDetail.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.buyProductDetail = action.payload
      })
      builder.addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })  


      builder.addCase(refund.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(refund.fulfilled, (state, action) => {
        state.isLoading = false
        state.refundData = action.payload
      })
      builder.addCase(refund.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })  
      
    },
  })

//   export default const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
  console.log("userSlice",cartSlice);
  export default cartSlice.reducer